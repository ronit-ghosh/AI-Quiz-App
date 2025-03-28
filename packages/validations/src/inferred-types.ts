import { z } from "zod"
import { createQuizFromTextValidation, createQuizFromMediaValidation, createStatsValidation } from "./types"

export type CreateQuizFromTextTypes = z.infer<typeof createQuizFromTextValidation>
export type CreateQuizFromMediaTypes = z.infer<typeof createQuizFromMediaValidation>
export type CreateStatsTypes = z.infer<typeof createStatsValidation>