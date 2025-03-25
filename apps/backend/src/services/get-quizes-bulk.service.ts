import { Messages } from "@repo/constants/messages"
import { prisma } from "@repo/db/client"

export const getQuizesBulk = async () => {
    const response = await prisma.categories.findMany({
        select: {
            questions: {
                select: {
                    question: true,
                    options: {
                        select: {
                            optionId: true,
                            option: true
                        }
                    }
                }
            }
        }
    })

    if (!response) throw new Error(Messages.ERROR.QUIZ_NOT_FOUND)
    
    return { questions: response.map(q => q.questions) }
}