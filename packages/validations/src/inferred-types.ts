import { z } from "zod"
import { createQuizFromTextValidation, createQuizFromMediaValidation } from "./types"

export type CreateQuizFromTextTypes = z.infer<typeof createQuizFromTextValidation>
export type CreateQuizFromMediaTypes = z.infer<typeof createQuizFromMediaValidation>
