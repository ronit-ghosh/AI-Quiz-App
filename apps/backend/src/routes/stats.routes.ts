import { Router } from "express";
import { createStatsController } from "../controllers/stats.controller";
import {
    getAverageStatsController,
    getStatsByIdController,
    getStatsController,
    getStatsLengthController
} from "../controllers/get-stats.controller";
import { deleteStatByIdController } from "../controllers/delete-stats.controller";

export const router = Router()

router.post("/create", createStatsController)
router.get("/get", getStatsController)
router.get("/get/length", getStatsLengthController)
router.get("/get/average", getAverageStatsController)
router.get("/get/:id", getStatsByIdController)
router.delete("/delete/:id", deleteStatByIdController)