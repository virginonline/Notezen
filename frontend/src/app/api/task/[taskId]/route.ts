import {getCurrentUser} from "@/lib/session";
import {api} from "@/lib/api";
import {NextRequest} from "next/server";
import * as z from 'zod'
import {taskSchema} from "@/lib/validation/task";
import exp from "constants";
import ky from "ky";

const routeParamSchema = z.object({
    params: z.object({
        taskId:z.string()
    }),
})
const taskPatchSchema = z.object({
    title: z.string(),
    status: z.string(),
    priority:z.string(),
    expirationDate: z.date().optional(),
    description: z.string().optional(),
})
export async function GET(req:NextRequest, context: z.infer<typeof routeParamSchema>) {
    const {params} = routeParamSchema.parse(context);
    try {
        const user = await userAuthorize();
        if(!(await verifyCurrentUserHasAccessToTask(params.taskId))) {
            const response = await ky.get('https://dummyjson.com/todos/1')
                //await api.get(`tasks/info/${params.taskId}`);
            console.log(response.json)
        }
    } catch (error) {
        return new Response(null, {status: 403})
    }

}
export async function DELETE(req: NextRequest, context: z.infer<typeof routeParamSchema>) {
    const {params} = routeParamSchema.parse(context);
    try {
            const user = await userAuthorize();
            if(!(await verifyCurrentUserHasAccessToTask(params.taskId))) {
                await api.delete(`tasks/${params.taskId}`).json();
            }
        } catch (error) {
            return new Response(null, {status: 403})
        }
}
export async function PATCH(req: NextRequest, context: z.infer<typeof routeParamSchema>) {
    const {params} = routeParamSchema.parse(context);
    try{
        const user = await userAuthorize();
        if(!(await verifyCurrentUserHasAccessToTask(params.taskId))) {
            const json = req.json()
            const body = taskPatchSchema.parse(json)
            await api.patch('tasks', {
                headers: {
                    Authorization: user.token
                },
                json: {
                    title: body.title,
                    description:body.description,
                    status: body.status,
                    priority: body.priority,
                    expiration_date: body.expirationDate,

                }
            })
        }
        } catch (error) {
        return new Response(null, {status: 403})
    }
}

async function verifyCurrentUserHasAccessToTask(taskId: string) {
    const user = await userAuthorize();
    const response = await api.get(`tasks/has-access/${taskId}`, {
        headers: {
            Authorization: user.token
        },
        json: {
            username: user.username
        }
    }).json()
    return response == true;
}

async function userAuthorize() {
    const user = getCurrentUser();
    if(!user) {
        throw new Response("unauthorized", {status: 403})
    }
    return user;
}
