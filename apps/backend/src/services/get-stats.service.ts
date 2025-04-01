import { Messages } from "@repo/constants/messages"
import { prisma } from "@repo/db/client"

export const getStats = async () => {
    const stats = await prisma.stats.findMany({
        select: {
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
        take: 5,
        
    })

    if (!stats) throw new Error(Messages.ERROR.STATS_NOT_FOUND)

    return stats
}