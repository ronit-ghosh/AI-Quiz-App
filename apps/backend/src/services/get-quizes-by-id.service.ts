import { Messages } from "@repo/constants/messages"
import { prisma } from "@repo/db/client"

export const getQuizesById = async (id: string) => {
    const response = await prisma.categories.findFirst({
        where: { id },
        select: {
            name: true,
            desc: true,
            _count: true,
            questions: {
                select: {
                    id: true,
                    question: true,
                    correct: true,
                    options: {
                        select: {
                            optionId: true,
                            option: true,
                        }
                    }
                }
            }
        }
    })

    if (!response) throw new Error(Messages.ERROR.QUIZ_NOT_FOUND)

    return response
}