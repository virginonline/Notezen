import * as z from "zod"

export const taskSchema = z.object({
    title: z.string().min(10).max(125),
    status:z.string().optional(),
    author:z.string(),
    content: z.string().optional()
})