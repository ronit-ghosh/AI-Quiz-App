import { Messages } from "@repo/constants/messages"
import { prisma } from "@repo/db/client"

export const getCategoriesBulk = async () => {
    const response = await prisma.categories.findMany({
        select: {
            id: true,
            name: true,
            desc: true,
            createdAt: true,
            questions: {
                select: {
                    _count: true
                }
            }
        }
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