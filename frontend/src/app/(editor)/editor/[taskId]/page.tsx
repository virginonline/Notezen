import {getCurrentUser} from "@/lib/session";
import {redirect} from "next/navigation";
import {Editor} from "@/component/editor";

interface EditorPageProps {
    params: { taskId: string }
}
export default async function EditorPage({ params }: EditorPageProps) {
    return(
        <Editor/>
    )

}