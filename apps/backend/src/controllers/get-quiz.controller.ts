import type { Request, Response } from "express";
import { getQuizesBulk } from "../services/get-quizes-bulk.service";
import { getQuizesById } from "../services/get-quizes-by-id.service";
import { StatusCodes } from "@repo/constants/status-codes";
import { Messages } from "@repo/constants/messages";
import { getCategoriesBulk } from "../services/get-category-bulk.service";

export const getQuizesByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        if (typeof id !== 'string' || !id) {
            res.status(StatusCodes.BAD_REQUEST)
                .json({ msg: Messages.ERROR.INVALID_STRING })
            return
        }

        const questions = await getQuizesById(id)

        res.status(StatusCodes.OK).json(questions)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: (error as Error).message })
        console.error(error)
    }
}

export const getQuizesBulkController = async (_: Request, res: Response) => {
    try {
        const questions = await getQuizesBulk()

        res.status(StatusCodes.OK)
            .json(questions)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: (error as Error).message })
        console.error(error)
    }
}

export const getCategoriesBulkController = async (_: Request, res: Response) => {
    try {
        const categories = await getCategoriesBulk()

        res.status(StatusCodes.OK)
            .json(categories)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: (error as Error).message })
        console.error(error)
    }
}