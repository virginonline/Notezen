import * as z from "zod"

export const projectSchema = z.object({
    title: z.string().min(10).max(125),
    status:z.string(),
    description : z.string().optional()
})