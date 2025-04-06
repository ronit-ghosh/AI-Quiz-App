import type { Request, Response } from "express";
import { deleteQuizById } from "../services/delete-quiz-by-id.service";
import { StatusCodes } from "@repo/constants/status-codes";

export const deleteQuizByIdController = async (req: Request, res: Response) => {
    try {
        const userId = req.userId as string
        const id = req.params.id
        await deleteQuizById(String(id), userId)
        res.json({ msg: "Quiz Deleted" })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: (error as Error).message })
        console.error(error)
    }
}