import { Messages } from "@repo/constants/messages";
import { prisma } from "@repo/db/client"

export const getAverageStats = async (userId: string) => {
    const response = await prisma.stats.findMany({
        where: {
            userId
        },
        select: {
            score: true
        }
    })

    if (!response) throw new Error(Messages.ERROR.STATS_NOT_FOUND)

    let avg = 0;
    for (let i = 0; i < response.length; i++) {
        avg += Number(response[i]?.score)
    }

    const average = (avg / response.length).toFixed(2)

    return average
}