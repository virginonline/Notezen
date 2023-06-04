import * as z from "zod"
//import {projectSchema} from "@/lib/validation/project";
import type { NextApiRequest, NextApiResponse } from 'next'
import {Request} from "node-fetch";


const routeContextSchema = z.object({
    params: z.object({
        projectId: z.string(),
    }),
})

const projectCreateSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    status: z.string(),
})
export async function DELETE(
    req: NextApiRequest,
    context: z.infer<typeof routeContextSchema>
) {
    try {
        const {params} = routeContextSchema.parse(context);
        if(!(await verifyCurrentUserHasAccessToProject(params.projectId))) {

        }
    } catch (e) {
        if (e instanceof z.ZodError) {
            return new Response(JSON.stringify(e.issues), {status: 402})
        }
    }
}
export async function POST(req: Request, context: z.infer<typeof routeContextSchema>) {
    const json = await req.json();
    const body = projectCreateSchema.parse(json);
    const data = await fetch(`api/v1/projects/`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then((res) => res.json()).then((data) => console.log(data))
}
async function verifyCurrentUserHasAccessToProject(projectId: string) {
    const session = {
        user : {
            id: 1
        }
    }
    const count = session.user.id;
    return count > 0
}

