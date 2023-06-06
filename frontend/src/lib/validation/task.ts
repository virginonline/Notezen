import * as z from "zod"

export const taskSchema = z.object({
    title: z.string().min(10).max(50),
    project: z.string(),
    status:z.string().optional(),
    author:z.string(),
    priority: z.string(),
    content: z.string().min(10)
})