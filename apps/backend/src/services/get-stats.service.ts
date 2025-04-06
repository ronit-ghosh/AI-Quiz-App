import { Messages } from "@repo/constants/messages"
import { prisma } from "@repo/db/client"

export const getStats = async (exclude: number, limit: number, userId: string) => {

    const stats = await prisma.stats.findMany({
        where: {
            userId
        },
        select: {
            _count: true,
            id: true,
            createdAt: true,
            answeredQuestions: true,
            category: {
                select: {
                    name: true
                }
            },
            correctAnswers: true,
            incorrectAnswers: true,
            score: true,
            totalQuestions: true,
        },
        orderBy: {
            createdAt: "desc"
        },
        take: limit,
        skip: exclude
    })

    if (!stats) throw new Error(Messages.ERROR.STATS_NOT_FOUND)

    return stats
}