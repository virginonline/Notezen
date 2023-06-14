'use client'
import {Comment, Task} from "@/lib/types/type";
import {getComments} from "@/lib/api/comment";
import {useEffect, useState} from "react";
import {CommentItem} from "@/component/comment/comment";
interface CommentsProps {
    task : Task;
}
export function Comments({task} : CommentsProps) {
    const [comments, setComments] = useState<Comment[]>([])
    useEffect(() => {
        (async () => {
            const fetchedComments = await getComments(task.id!)
            setComments(fetchedComments)
        })();
    })
    return(
        <div>
            {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment}/>
            ))}
        </div>
    )
}