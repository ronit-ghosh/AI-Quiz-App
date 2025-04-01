import { Messages } from "@repo/constants/messages"
import { prisma } from "@repo/db/client"

export const deleteStatById = async (id: string) => {
    const response = await prisma.stats.delete({
        where: {
            id
        }
    })

    if (!response) throw new Error(Messages.ERROR.STATS_NOT_FOUND)
}