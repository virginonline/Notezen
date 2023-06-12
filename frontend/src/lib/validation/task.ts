import * as z from "zod"

export const taskSchema = z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    project: z.string().optional(),
    priority: z.string().optional(),
    status: z.string().optional(),
    content: z.any().optional(),
    expirationDate: z.date().optional()
})