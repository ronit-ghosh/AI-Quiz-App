import { createStatsValidation } from "@repo/validations/types"
import type { Request, Response } from "express"
import { createStats } from "../services/create-stats.service"
import { StatusCodes } from "@repo/constants/status-codes"
import { Messages } from "@repo/constants/messages"
import { getAverageStats } from "../services/get-stats-average.service"
import { getStats } from "../services/get-stats.service"
import { getStatsById } from "../services/get-stats-by-id.service"

export const createStatsController = async (req: Request, res: Response) => {
    try {
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

        const statsId = await createStats(parsedValues.data)

        res.status(StatusCodes.OK)
            .json({ msg: Messages.SUCCESS.STATS_CREATED, statsId })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: (error as Error).message })
        console.error(error)
    }
}

export const getStatsController = async (_: Request, res: Response) => {
    try {
        const stats = await getStats()
        res.status(StatusCodes.OK)
            .json({ stats })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: (error as Error).message })
        console.error(error)
    }
}

export const getAverageStatsController = async (_: Request, res: Response) => {
    try {
        const average = await getAverageStats()
        res.status(StatusCodes.OK)
            .json(average)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: (error as Error).message })
        console.error(error)
    }
}

export const getStatsByIdController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (!id) {
            res.status(StatusCodes.FORBIDDEN)
                .json({ msg: Messages.ERROR.PARAMS_NOT_FOUND })
            return
        }
        const stats = await getStatsById(id)

        res.status(StatusCodes.OK)
            .json(stats)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: (error as Error).message })
        console.error(error)
    }
}