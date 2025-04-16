import { GoogleGenerativeAI } from "@google/generative-ai";
import { FileState, GoogleAIFileManager } from "@google/generative-ai/server";
import { pdf } from "pdf-to-img";
import { SystemPrompt } from "../config/system-prompt";
import { prisma } from "@repo/db/client";
import type { Quizes } from "../types/quiz.types";
import { Messages } from "@repo/constants/messages";
import { GEMINI_API_KEY } from "../config/env";
import type { CreateQuizFromMediaTypes } from "@repo/validations/inferred-types";
import { v4 as uuid } from "uuid";
import { jsonrepair } from "jsonrepair";

interface DataTypes extends CreateQuizFromMediaTypes {
    userId: string,
    categoryId?: string
    jobId?: string
}

export const createJob = async (data: DataTypes) => {
    const { categoryName, categoryDesc, userId } = data

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

    const jobId = uuid()
    const job = await prisma.processingStatus.create({
        data: {
            id: jobId,
            categoryId: categoryId.id,
            status: "PENDING",
            userId
        }
    })

    return {
        jobId: job.id,
        categoryId: categoryId.id
    }
}

export const createQuizFromPdfBulk = async (data: DataTypes) => {
    const { categoryName, mediaBuffer, userId, categoryId, jobId } = data
    console.log("Creating quiz...")
    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        let questions: string[] = []

        const images = await pdf(mediaBuffer, { scale: 3 });

        for await (const image of images) {

            const fileManager = new GoogleAIFileManager(GEMINI_API_KEY);

            const uploadResult = await fileManager.uploadFile(
                image,
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
            const repairedJson = jsonrepair(parsedQuesetion!)
 
            if (repairedJson) questions.push(repairedJson)
            console.log("👀👀👀👀👀👀👀👀👀👀👀",actualQuestion)
            console.log("👀👀👀👀👀👀👀👀👀👀👀",parsedQuesetion)
            console.log("👀👀👀👀👀👀👀👀👀👀👀",repairedJson)
        }

        const quizes: Quizes[] = questions.map(q => JSON.parse(q.replace(/,\s*([\]}])/g, '$1')));
        console.log("👀👀👀👀👀👀👀👀👀👀👀",quizes)
        for (const quiz of quizes) {
            quiz.questions.forEach(async (q) => {
                await prisma.questions.create({
                    data: {
                        userId,
                        categoryId: categoryId!,
                        correct: q.correct,
                        question: q.question,
                        explanation: q.explanation,
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

        await prisma.processingStatus.update({
            where: {
                id: jobId
            },
            data: {
                status: "GENERATED"
            }
        })
        console.log("Quiz created")
    } catch (error) {
        console.log("Quiz creation failed!")
        await prisma.processingStatus.update({
            where: {
                id: jobId
            },
            data: {
                status: "FAILED"
            }
        })

        console.error(error)
    }
}

export const checkStatus = async (jobId: string) => {
    const response = await prisma.processingStatus.findFirst({
        where: {
            id: jobId
        }, select: {
            status: true
        }
    })

    if (!response) throw new Error(Messages.ERROR.STATUS_FETCHING_FAILED)

    return response.status
} 