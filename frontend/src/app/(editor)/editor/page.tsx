import {Editor} from "@/component/editor";
import {Project} from "@/lib/types/type";
import {getProjects} from "@/lib/api/project";
import {getCurrentUserFromServer} from "@/lib/session";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

async function availableProjects() {
    const user = await getCurrentUserFromServer();
    return await getProjects(user);
}

export default async function EditorPage() {
    if(!cookies().has('_user')) {
        redirect('/login');
    }
    const projects = await availableProjects();
    return (
        <Editor
        availableProjects={projects}
        />
      )
}