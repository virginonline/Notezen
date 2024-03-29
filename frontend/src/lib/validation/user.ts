import * as z from "zod"

export const userSchema = z.object({
    username: z.string(),
    password: z.string()
})

export const userEditSchema = z.object({
    username: z.string(),
})