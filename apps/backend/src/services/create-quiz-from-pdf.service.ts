import { GoogleGenerativeAI } from "@google/generative-ai";
import { SystemPrompt } from "../config/system-prompt";
import type { Questions } from "../types/quiz.types";
import { prisma } from "@repo/db/client";
import { Messages } from "@repo/constants/messages"
import type { CreateQuizFromTextTypes } from "@repo/validations/inferred-types"
import { GEMINI_API_KEY } from "../config/env";

export const createQuizFromPdf = async (data: CreateQuizFromTextTypes) => {
    const { text, categoryName, categoryDesc } = data

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(SystemPrompt + "\n\n" + text);

    if (!result.response.candidates) throw new Error(Messages.ERROR.QUIZ_NOT_GENERATED)

    const actualQuestions = result.response.candidates[0]?.content.parts[0]?.text?.replace(/,\s*([\]}])/g, '$1')
    const parsedQuesetions = JSON.parse(actualQuestions?.replace(/^```json\s*|\s*```$/g, '')!)
    const quizes: Questions[] = parsedQuesetions.questions

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

    for (const quiz of quizes) {
        await prisma.questions.create({
            data: {
                categoryId: categoryId.id,
                correct: quiz.correct,
                question: quiz.question,
                options: {
                    create: quiz.options.map((opt) => ({
                        option: opt.option,
                        optionId: opt.optionId
                    }))
                }
            }
        })
    }

    return categoryId.id
}