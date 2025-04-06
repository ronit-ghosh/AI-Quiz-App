import { Messages } from "@repo/constants/messages"
import { prisma } from "@repo/db/client"

export const deleteQuizById = async (id: string, userId: string) => {
    const response = await prisma.categories.deleteMany({
        where: {
            AND: [{ id }, { userId }]
        }
    })

    if (!response) throw new Error(Messages.ERROR.STATS_NOT_FOUND)
}