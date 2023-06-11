import * as z from "zod"
import {getCurrentUser} from "@/lib/session";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {api} from "@/lib/api";
import {Request} from "node-fetch";
import {NextRequest} from "next/server";

const taskCreateSchema = z.object({
    title: z.string(),
    status: z.string(),
    priority:z.string(),
    expirationDate: z.date().optional(),
    description: z.string().optional(),
})

export async function GET() {
    try {
        const user = await userAuthorize();
        const response = await api.get(`tasks/user/${user.id}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }).json();
        return new Response(JSON.stringify(response))
    } catch (error) {
        return new Response(null, { status: 500 })
    }
}
export async function POST(req: NextRequest) {
    try {
        const user =  await userAuthorize();
        const json = req.json();
        const body = taskCreateSchema.parse(json);
        const response = await api.post(`tasks`, {
            json: {
                title: body.title,
                description: body.description,
                status: body.status,
                priority: body.priority,
                expiration_date:body.expirationDate,
                created_by: user.username
            }
        }).json()
        return new Response(JSON.stringify(response))
    } catch (error) {
        return new Response(null, { status: 500 })
    }
}

async function userAuthorize() {
    const user = getCurrentUser();
    if(!user) {
       throw new Response("unauthorized", {status: 403})
    }
    return user;
}

