import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../config/env";
import { FileState, GoogleAIFileManager } from "@google/generative-ai/server";
import { SystemPrompt } from "../config/system-prompt";
import { Messages } from "@repo/constants/messages";
import type { Questions } from "../types/quiz.types";
import { prisma } from "@repo/db/client";
import fs from "node:fs"
import path from "path"
import type { CreateQuizFromMediaTypes } from "@repo/validations/inferred-types";

interface DataTypes extends CreateQuizFromMediaTypes {
    userId: string
}

export const createQuizFromImage = async (data: DataTypes) => {
    const { categoryName, categoryDesc, mediaBuffer, userId } = data

    const tempFilePath = path.join(__dirname, `temp-${Date.now()}.png`) as string;

    const fileCreated = fs.writeFileSync(tempFilePath, Buffer.from(mediaBuffer));

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const fileManager = new GoogleAIFileManager(GEMINI_API_KEY);

    const uploadResult = await fileManager.uploadFile(
        mediaBuffer,
        {
            mimeType: "image/jpeg",
            displayName: categoryName,
        },
    );

    // Polling getFile to check processing complete
    let file = await fileManager.getFile(uploadResult.file.name);
    while (file.state === FileState.PROCESSING) {
        process.stdout.write(".");
        // Sleep for 10 seconds
        await new Promise((resolve) => setTimeout(resolve, 10_000));
        // Fetch the file from the API again
        file = await fileManager.getFile(uploadResult.file.name);
    }
    if (file.state === FileState.FAILED) {
        throw new Error("Image processing failed.");
    }

    const result = await model.generateContent([
        SystemPrompt,
        {
            fileData: {
                fileUri: uploadResult.file.uri,
                mimeType: uploadResult.file.mimeType,
            },
        },
    ]);

    if (!result.response.candidates) throw new Error(Messages.ERROR.RESPONSE_NOT_GENERATED)

    const actualQuestions = result.response.candidates[0]?.content.parts[0]?.text
     const parsedQuestions = JSON.parse(actualQuestions?.replace(/^```json\s*|\s*```$/g, '').replace(/,\s*([\]}])/g, '$1')!)
    const quizes: Questions[] = parsedQuestions?.questions

    let categoryId = await prisma.categories.findFirst({
        where: {
            AND: [{ userId }, { name: categoryName }]
        },
        select: {
            id: true
        }
    })

    if (!categoryId) {
        categoryId = await prisma.categories.create({
            data: {
                userId,
                name: categoryName,
                desc: categoryDesc,
            },
            select: {
                id: true
            }
        })
    }

    for (const quiz of quizes) {
        await prisma.questions.create({
            data: {
                userId,
                categoryId: categoryId.id,
                correct: quiz.correct,
                question: quiz.question,
                explanation: quiz.explanation,
                options: {
                    create: quiz.options.map((opt) => ({
                        option: opt.option,
                        optionId: opt.optionId
                    }))
                }
            }
        })
    }

    if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
    }

    return categoryId.id
}