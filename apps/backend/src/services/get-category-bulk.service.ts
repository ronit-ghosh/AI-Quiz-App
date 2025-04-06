import { Messages } from "@repo/constants/messages"
import { prisma } from "@repo/db/client"

export const getCategoriesBulk = async (exclude: number, limit: number, userId: string) => {
    const response = await prisma.categories.findMany({
        where: {
            userId
        },
        select: {
            _count: true,
            id: true,
            name: true,
            desc: true,
            createdAt: true,
            questions: {
                select: {
                    _count: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: limit,
        skip: exclude
    })

    if (!response) throw new Error(Messages.ERROR.CATEGORY_NOT_FOUND)

    return {
        categories: response.map(c => {
            return {
                id: c.id,
                name: c.name,
                desc: c.desc,
                length: c.questions.length,
                created: c.createdAt
            }
        })
    }
}