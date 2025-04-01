import { Messages } from "@repo/constants/messages"
import { prisma } from "@repo/db/client"

export const getStatsById = async (id: string) => {
    const stats = await prisma.stats.findFirst({
        where: {
            id
        },
        select: {
            answeredQuestions: true,
            correctAnswers: true,
            incorrectAnswers: true,
            score: true,
            totalQuestions: true,
            createdAt: true,
            category: {
                select: {
                    name: true,
                    questions: {
                        select: {
                            id: true,
                            question: true,
                            options: {
                                select: {
                                    optionId: true,
                                    option: true
                                }
                            },
                            correct: true,
                            explanation: true
                        }
                    }
                }
            },
            answers: {
                select: {
                    optionId: true,
                    questionId: true
                }
            }
        }
    })

    if (!stats) throw new Error(Messages.ERROR.STATS_NOT_FOUND)

    return { stats }
}