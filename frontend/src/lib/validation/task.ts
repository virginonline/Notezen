import * as z from "zod"

export const taskSchema = z.object({
    title: z.string(),
    author: z.string(),
    project: z.string(),
    priority: z.string(),
    status: z.string(),
    content: z.any(),
    expirationDate: z.date().optional()
})