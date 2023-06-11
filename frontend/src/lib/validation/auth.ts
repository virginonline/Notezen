import * as z from "zod"

export const authSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(3).max(20),
})

export const userRegisterSchema = z.object({
    username:z.string(),
    password:z.string(),
    repeatPassword:z.string(),
});
