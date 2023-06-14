import {Input} from "@/component/ui/input";
import {useState} from "react";
import {Button} from "@/component/ui/button";
import {addComment} from "@/lib/api/comment";
import {useRouter} from "next/navigation";
import {Icons} from "@/component/ui/icons";

interface TaskOperationProps {
    taskId: number
}
export function CommentOperation({taskId} : TaskOperationProps) {
    const router = useRouter();

    const [content, setContent] = useState<string>('')
    return (
        <div className='flex items-center justify-between px-10'>
            <Input
                placeholder={'Введите комментарий'}
                onChange={(event) => setContent(event.target.value)}
            />
            <Button onClick={async () => {
                await addComment(taskId, content)
                router.refresh();
            }}>
                <Icons.send className='mx-auto h-6 w-6'/>
            </Button>
        </div>
    )
}