import { Messages } from "@repo/constants/messages";
import { prisma } from "@repo/db/client";
import type { CreateStatsTypes } from "@repo/validations/inferred-types";

export const createStats = async (data: CreateStatsTypes) => {
    const response = await prisma.stats.create({
        data: {
            answeredQuestions: data.answeredQuestions,
            correctAnswers: data.correctAnswers,
            incorrectAnswers: data.incorrectAnswers,
            score: data.score,
            totalQuestions: data.totalQuestions,
            categoryId: data.categoryId
        }
    })

    if (!response) throw new Error(Messages.ERROR.STATS_NOT_CREATED)

    return response.id
}