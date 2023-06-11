import {getCurrentUser} from "@/lib/session";
import {redirect} from "next/navigation";
import {Editor} from "@/component/editor";

interface EditorPageProps {
    params: { taskId: string }
}
export default async function EditorPage({ params }: EditorPageProps) {
    const user = await getCurrentUser()
    if (!user) {
        redirect("/login")
    }
    return(
        <Editor/>
    )

}