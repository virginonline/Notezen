import * as z from "zod"
import {projectSchema} from "@/lib/validation/project";

const routeContextSchema = z.object({
    params: z.object({
        projectId: z.string(),
    }),
})

export async function DELETE(
    req: Request,
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

async function verifyCurrentUserHasAccessToProject(projectId: string) {
    const session = {
        user : {
            id: 1
        }
    }
    const count = session.user.id;
    return count > 0
}

