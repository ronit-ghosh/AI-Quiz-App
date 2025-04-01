import type { Request, Response } from "express";
import { deleteStatById } from "../services/delete-stats-by-id.service";
import { StatusCodes } from "@repo/constants/status-codes";

export const deleteStatByIdController = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        await deleteStatById(String(id))
        res.json({ msg: "Stat Deleted" })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: (error as Error).message })
        console.error(error)
    }
}