import { Messages } from "@repo/constants/messages";
import { prisma } from "@repo/db/client";

export async function getQuizzesLength() {
    const quizLength = await prisma.categories.count()
    if (!quizLength) throw new Error(Messages.ERROR.QUIZ_NOT_FOUND)
    return quizLength
}