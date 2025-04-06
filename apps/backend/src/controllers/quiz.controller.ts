import { Messages } from "@repo/constants/messages";
import { StatusCodes } from "@repo/constants/status-codes"
import { createQuizFromMediaValidation, createQuizFromTextValidation } from "@repo/validations/types";
import type { Request, Response } from "express";
import { createQuizFromPdf } from "../services/create-quiz-from-pdf.service";
import { createQuizFromPdfBulk } from "../services/create-quiz-from-pdf-bulk.service";
import { createQuizFromText } from "../services/create-quiz-from-text.service";
import { createQuizFromImage } from "../services/create-quiz-from-image.service";

export const createFromPdfController = async (req: Request, res: Response) => {
    try {
        const userId = req.userId as string
        const { text, categoryName, categoryDesc } = req.body

        const parsedValues = createQuizFromTextValidation.safeParse({ text, categoryName, categoryDesc })
        if (!parsedValues.success) {
            res.status(StatusCodes.BAD_REQUEST)
                .json({ msg: parsedValues.error?.issues[0]!.message })
            return
        }

        const categoryId = await createQuizFromPdf({ text, categoryDesc, categoryName, userId })

        res.status(StatusCodes.CREATED)
            .json({ msg: Messages.SUCCESS.QUIZ_CREATED, categoryId })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: (error as Error).message })
        console.error(error)
    }
}

export const createFromPdfBulkController = async (req: Request, res: Response) => {
    try {
        const userId = req.userId as string
        const { categoryName, categoryDesc } = req.body
        const mediaBuffer = req.file?.buffer

        if (!mediaBuffer) {
            res.status(StatusCodes.BAD_REQUEST).json({ msg: Messages.ERROR.EMPTY_PDF });
            return
        }

        const parsedValues = createQuizFromMediaValidation.safeParse({ categoryName, categoryDesc, mediaBuffer })

        if (!parsedValues.success) {
            res.status(StatusCodes.BAD_REQUEST)
                .json({ msg: parsedValues.error?.issues[0]!.message })
            return
        }

        const categoryId = await createQuizFromPdfBulk({ categoryName, categoryDesc, mediaBuffer, userId })

        res.status(StatusCodes.OK)
            .json({ msg: Messages.SUCCESS.QUIZ_CREATED, categoryId })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: (error as Error).message })
        console.error(error)
    }
}

export const createFromTextController = async (req: Request, res: Response) => {
    try {
        const userId = req.userId as string
        const { text, categoryName, categoryDesc } = req.body

        const parsedValues = createQuizFromTextValidation.safeParse({ text, categoryName, categoryDesc })
        if (!parsedValues.success) {
            res.status(StatusCodes.BAD_REQUEST)
                .json({ msg: parsedValues.error?.issues[0]!.message })
            return
        }

        const categoryId = await createQuizFromText({ text, categoryName, categoryDesc, userId })

        res.status(StatusCodes.CREATED)
            .json({ msg: Messages.SUCCESS.QUIZ_CREATED, categoryId })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: (error as Error).message })
        console.error(error)
    }
}

export const createFromImageController = async (req: Request, res: Response) => {
    try {
        const userId = req.userId as string
        const { categoryName, categoryDesc } = req.body
        const mediaBuffer = req.file?.buffer

        if (!mediaBuffer) {
            res.status(StatusCodes.NOT_FOUND)
                .json({ msg: Messages.ERROR.EMPTY_IMAGE })
            return
        }

        if (!mediaBuffer) {
            res.status(StatusCodes.BAD_REQUEST).json({ msg: Messages.ERROR.EMPTY_PDF });
            return
        }

        const parsedValues = createQuizFromMediaValidation.safeParse({ categoryName, categoryDesc, mediaBuffer })

        if (!parsedValues.success) {
            res.status(StatusCodes.BAD_REQUEST)
                .json({ msg: parsedValues.error?.issues[0]!.message })
            return
        }

        const categoryId = await createQuizFromImage({ categoryName, categoryDesc, mediaBuffer, userId })

        res.status(StatusCodes.OK)
            .json({ msg: Messages.SUCCESS.QUIZ_CREATED, categoryId })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: (error as Error).message })
        console.error(error)
    }
}