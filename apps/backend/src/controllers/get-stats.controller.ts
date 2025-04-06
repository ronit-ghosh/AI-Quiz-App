import { getAverageStats } from "../services/get-stats-average.service"
import { getStats } from "../services/get-stats.service"
import { getStatsById } from "../services/get-stats-by-id.service"
import { StatusCodes } from "@repo/constants/status-codes"
import { getStatsLength } from "../services/get-stats-length.service"
import type { Request, Response } from "express"
import { Messages } from "@repo/constants/messages"

export const getStatsController = async (req: Request, res: Response) => {
    try {
        const userId = req.userId as string
        const page = parseInt(String(req.query.page) || "1", 10)

        const limit = 5
        const exclude = (page - 1) * limit

        const stats = await getStats(exclude, limit, userId)

        res.status(StatusCodes.OK)
            .json({ stats })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: (error as Error).message })
        console.error(error)
    }
}

export const getStatsLengthController = async (req: Request, res: Response) => {
    try {
        const userId = req.userId as string
        const statsLength = await getStatsLength(userId)
        res.status(StatusCodes.OK)
            .json({ statsLength })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: (error as Error).message })
        console.error(error)
    }
}

export const getAverageStatsController = async (req: Request, res: Response) => {
    try {
        const userId = req.userId as string
        const average = await getAverageStats(userId)
        res.status(StatusCodes.OK)
            .json({ average })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: (error as Error).message })
        console.error(error)
    }
}

export const getStatsByIdController = async (req: Request, res: Response) => {
    try {
        const userId = req.userId as string
        const id = req.params.id
        if (!id) {
            res.status(StatusCodes.FORBIDDEN)
                .json({ msg: Messages.ERROR.PARAMS_NOT_FOUND })
            return
        }
        const stats = await getStatsById(id, userId)

        res.status(StatusCodes.OK)
            .json(stats)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: (error as Error).message })
        console.error(error)
    }
}