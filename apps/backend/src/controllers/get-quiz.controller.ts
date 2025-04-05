import type { Request, Response } from "express";
import { getQuizesById } from "../services/get-quizes-by-id.service";
import { StatusCodes } from "@repo/constants/status-codes";
import { Messages } from "@repo/constants/messages";
import { getCategoriesBulk } from "../services/get-category-bulk.service";
import { getQuizzesLength } from "../services/get-quizzes-length.service";

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

export const getQuizzesLengthController = async (_: Request, res: Response) => {
    try {
        const quizLength = await getQuizzesLength()
        res.status(StatusCodes.OK).json({ quizLength })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: (error as Error).message })
        console.error(error)
    }
}

export const getCategoriesBulkController = async (req: Request, res: Response) => {
    const page = parseInt(String(req.query.page) || "1", 10)
    const limit = 6
    const exclude = (page - 1) * limit

    try {
        const categories = await getCategoriesBulk(exclude, limit)

        res.status(StatusCodes.OK)
            .json(categories)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: (error as Error).message })
        console.error(error)
    }
}