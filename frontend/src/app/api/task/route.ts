import * as z from "zod"
import {getCurrentUser} from "@/lib/session";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {api} from "@/lib/api";

const taskCreateSchema = z.object({
    title: z.string(),
    status: z.string(),
    priority:z.string(),
    content: z.string().optional(),
})

export async function GET() {
    const user = await getCurrentUser();
    try {
        if(!user) {
            return new Response("Unauthorized", { status: 403 })
        }
        const response = await api.get(`user/${user.id}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
        return new Response(JSON.stringify(response))
    } catch (error) {
        return new Response(null, { status: 500 })
    }
}