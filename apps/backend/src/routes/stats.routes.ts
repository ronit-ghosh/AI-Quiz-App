import { Router } from "express";
import { createStatsController, getAverageStatsController, getStatsController, getStatsByIdController } from "../controllers/stats.controller";

export const router = Router()

router.post("/create", createStatsController)
router.get("/get", getStatsController)
router.get("/get-average", getAverageStatsController)
router.get("/get/:id", getStatsByIdController)