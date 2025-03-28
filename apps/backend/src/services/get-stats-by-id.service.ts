import { Messages } from "@repo/constants/messages"
import { prisma } from "@repo/db/client"

export const getStatsById = async (id: string) => {
    const stats = await prisma.stats.findFirst({
        where: {
            id
        }
    })

    if (!stats || !stats.categoryId) throw new Error(Messages.ERROR.STATS_NOT_FOUND)

    const categoryName = await prisma.categories.findFirst({
        where: {
            id: stats.categoryId
        },
        select: {
            name: true
        }
    })

    if (!categoryName) throw new Error(Messages.ERROR.CATEGORY_NOT_FOUND)

    return { stats, categoryName: categoryName.name }
}