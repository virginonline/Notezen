import { Editor } from "@/component/editor";
import {Project} from "@/lib/types/type";

async function availableProjects() {
    //const user = getCurrentUser();
    const project: Project[] = []
    /*await api.get(`projects/author/${user.id}`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }).json()*/
    return project;
}

export default async function EditorPage() {
    const projects = await availableProjects();
    return (
        <Editor
        availableProjects={projects}
        />
      )
}