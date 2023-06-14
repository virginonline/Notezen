import {Editor} from "@/component/editor";
import {Project} from "@/lib/types/type";
import {getProjects} from "@/lib/api/project";
import {getCurrentUserFromServer} from "@/lib/session";

async function availableProjects() {
    const user = await getCurrentUserFromServer();
    return await getProjects(user);
}

export default async function EditorPage() {
    const projects = await availableProjects();
    return (
        <Editor
        availableProjects={projects}
        />
      )
}