import { Router } from "express";
import { clerkController } from "../controllers/clerk.controller";

export const router = Router()

router.post("/", clerkController)