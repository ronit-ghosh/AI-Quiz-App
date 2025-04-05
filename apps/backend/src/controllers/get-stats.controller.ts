import { getAverageStats } from "../services/get-stats-average.service"
import { getStats } from "../services/get-stats.service"
import { getStatsById } from "../services/get-stats-by-id.service"
import { StatusCodes } from "@repo/constants/status-codes"
import { getStatsLength } from "../services/get-stats-length.service"
import type { Request, Response } from "express"
import { Messages } from "@repo/constants/messages"

export const getStatsController = async (req: Request, res: Response) => {
    try {
        const page = parseInt(String(req.query.page) || "1", 10)

        const limit = 5
        const exclude = (page - 1) * limit

        const stats = await getStats(exclude, limit)

        res.status(StatusCodes.OK)
            .json({ stats })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: (error as Error).message })
        console.error(error)
    }
}

export const getStatsLengthController = async (_: Request, res: Response) => {
    try {
        const statsLength = await getStatsLength()
        res.status(StatusCodes.OK)
            .json({ statsLength })
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
            .json({ average })
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