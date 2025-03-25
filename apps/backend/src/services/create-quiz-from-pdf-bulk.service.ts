import { GoogleGenerativeAI } from "@google/generative-ai";
import { FileState, GoogleAIFileManager } from "@google/generative-ai/server";
import { pdf } from "pdf-to-img";
import { SystemPrompt } from "../config/system-prompt";
import { prisma } from "@repo/db/client";
import type { Quizes } from "../types/quiz.types";
import { Messages } from "@repo/constants/messages";
import { GEMINI_API_KEY } from "../config/env";
import type { CreateQuizFromMediaTypes } from "@repo/validations/inferred-types";

export const createQuizFromPdfBulk = async (data: CreateQuizFromMediaTypes) => {
    const { categoryName, categoryDesc, mediaBuffer } = data

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    let questions: string[] = []

    const images = await pdf(mediaBuffer, { scale: 3 });
    
    for await (const image of images) {

        const fileManager = new GoogleAIFileManager(GEMINI_API_KEY);

        const uploadResult = await fileManager.uploadFile(
            "https://pub-07b216c33cb94d9db3ada1de2e98bf02.r2.dev/Screenshot%202025-03-23%20015059.png",
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

        const actualQuestion = result.response.candidates[0]?.content.parts[0]?.text
        const parsedQuesetion = actualQuestion?.replace(/^```json\s*|\s*```$/g, '');

        if (parsedQuesetion) questions.push(parsedQuesetion)
    }

    let categoryId = await prisma.categories.findUnique({
        where: {
            name: categoryName
        },
        select: {
            id: true
        }
    })

    if (!categoryId) {
        categoryId = await prisma.categories.create({
            data: {
                name: categoryName,
                desc: categoryDesc,
            },
            select: {
                id: true
            }
        })
    }

    const quizes: Quizes[] = questions.map(q => JSON.parse(q.replace(/,\s*([\]}])/g, '$1')));

    for (const quiz of quizes) {
        quiz.questions.forEach(async (q) => {
            await prisma.questions.create({
                data: {
                    categoryId: categoryId.id,
                    correct: q.correct,
                    question: q.question,
                    options: {
                        create: q.options.map((opt: any) => ({
                            optionId: opt.optionId.toUpperCase(),
                            option: opt.option
                        }))
                    }
                }
            })
        });
    }

    if (categoryId) return categoryId.id
}