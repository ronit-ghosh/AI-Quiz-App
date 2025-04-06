import { createStatsValidation } from "@repo/validations/types"
import type { Request, Response } from "express"
import { createStats } from "../services/create-stats.service"
import { StatusCodes } from "@repo/constants/status-codes"
import { Messages } from "@repo/constants/messages"

export const createStatsController = async (req: Request, res: Response) => {
    try {
        const userId = req.userId as string
        const {
            totalQuestions,
            answeredQuestions,
            correctAnswers,
            incorrectAnswers,
            score,
            categoryId,
            answers
        } = req.body

        const parsedValues = createStatsValidation.safeParse({
            totalQuestions,
            answeredQuestions,
            correctAnswers,
            incorrectAnswers,
            score,
            categoryId,
            answers
        })

        if (!parsedValues.success) {
            res.status(StatusCodes.BAD_REQUEST)
                .json({ msg: parsedValues.error?.issues[0]!.message })
            return
        }

        const statsId = await createStats({ ...parsedValues.data, userId })

        res.status(StatusCodes.OK)
            .json({ msg: Messages.SUCCESS.STATS_CREATED, statsId })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: (error as Error).message })
        console.error(error)
    }
}