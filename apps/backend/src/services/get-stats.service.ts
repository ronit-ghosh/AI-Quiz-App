import { Messages } from "@repo/constants/messages"
import { prisma } from "@repo/db/client"

export const getStats = async () => {
    const stats = await prisma.stats.findMany({})

    if (!stats) throw new Error(Messages.ERROR.STATS_NOT_FOUND)

    return stats
}