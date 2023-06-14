import {Input} from "@/component/ui/input";
import {useState} from "react";
import {Button} from "@/component/ui/button";
import {addComment} from "@/lib/api/comment";
import {useRouter} from "next/navigation";
import {Icons} from "@/component/ui/icons";
import * as React from "react";

interface TaskOperationProps {
    taskId: number
}
export function CommentOperation({taskId} : TaskOperationProps) {
    const router = useRouter();

    const [content, setContent] = useState<string>('')
    return (
        <div className='flex items-center justify-between row-start-3 row-end-4'>
            <Input
                placeholder={'Введите комментарий'}
                onChange={(event) => setContent(event.target.value)}
            />
            <Button className={'right-2 inline-flex items-center'} onClick={async () => {
                await addComment(taskId, content)
                router.refresh();
            }}>
                <Icons.send className='mx-auto h-6 w-6'/>
            </Button>
        </div>
    )
}