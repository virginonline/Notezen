import * as z from "zod"

export const projectSchema = z.object({
    title: z.string().optional(),
    status:z.string().optional(),
    description : z.string().optional(),
    author: z.string().optional()
})