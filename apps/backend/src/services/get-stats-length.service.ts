import { Messages } from "@repo/constants/messages";
import { prisma } from "@repo/db/client";

export async function getStatsLength() {
    const statsLength = await prisma.stats.count()
    if (!statsLength) throw new Error(Messages.ERROR.STATS_NOT_FOUND)
    return statsLength
}