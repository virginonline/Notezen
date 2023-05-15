import * as z from "zod"

export const userSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(8).max(20),
    email: z.string().email().optional()
})