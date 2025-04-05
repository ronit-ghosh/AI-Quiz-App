import express, { type Application } from "express";
import cors from "cors"
import { router as quizRouter } from "./routes/quiz.routes"
import { router as statsRouter } from "./routes/stats.routes"
import { router as clerkRouter } from "./routes/clerk.routes"

export const app: Application = express()

app.use(express.json())
app.use(cors({
    origin: ["https://quiz.ronitghosh.site", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use("/api/quiz", quizRouter)
app.use("/api/stats", statsRouter)
app.use("/api/clerk", clerkRouter)