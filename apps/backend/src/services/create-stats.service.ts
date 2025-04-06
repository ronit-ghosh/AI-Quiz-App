import { Messages } from "@repo/constants/messages";
import { prisma } from "@repo/db/client";
import type { CreateStatsTypes } from "@repo/validations/inferred-types";

interface DataTypes extends CreateStatsTypes {
    userId: string
}

export const createStats = async (data: DataTypes) => {
    const response = await prisma.stats.create({
        data: {
            userId: data.userId,
            answeredQuestions: data.answeredQuestions,
            correctAnswers: data.correctAnswers,
            incorrectAnswers: data.incorrectAnswers,
            score: data.score,
            totalQuestions: data.totalQuestions,
            categoryId: data.categoryId,
            answers: {
                create: data.answers.map((ans) => ({
                    userId: data.userId,
                    categoryId: data.categoryId,
                    optionId: ans.optionId,
                    questionId: ans.questionId,
                }))
            }
        }
    })

    if (!response) throw new Error(Messages.ERROR.STATS_NOT_CREATED)

    return response.id
}