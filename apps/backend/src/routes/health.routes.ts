import { StatusCodes } from "@repo/constants/status-codes";
import { Router } from "express";

export const router = Router()

router.get("/", (_, res) => {
    res.status(StatusCodes.OK)
        .json({ msg: "Everything's fine 👀" })
})