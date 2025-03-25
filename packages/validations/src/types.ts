import { Messages } from "@repo/constants/messages"
import { z } from "zod"

export const createQuizFromTextValidation = z.object({
    text: z.string({ message: Messages.ERROR.INVALID_STRING }),
    categoryName: z.string({ message: Messages.ERROR.INVALID_STRING }),
    categoryDesc: z.string({ message: Messages.ERROR.INVALID_STRING })
})

const mediaBufferSchema: z.ZodType<Buffer> = z.custom<Buffer>((data) => {
    return Buffer.isBuffer(data);
}, {
    message: 'Invalid PDF buffer',
});

export const createQuizFromMediaValidation = z.object({
    categoryName: z.string({ message: Messages.ERROR.INVALID_STRING }),
    categoryDesc: z.string({ message: Messages.ERROR.INVALID_STRING }),
    mediaBuffer: mediaBufferSchema
})
