import { Messages } from "@repo/constants/messages";
import { prisma } from "@repo/db/client";

export async function getStatsLength(userId: string) {
    const statsLength = await prisma.stats.count({ where: { userId } })
    if (!statsLength) throw new Error(Messages.ERROR.STATS_NOT_FOUND)
    return statsLength
}