'use client'
import {Comment, Task} from "@/lib/types/type";
import {getComments} from "@/lib/api/comment";
import {useEffect, useState} from "react";
import {CommentItem} from "@/component/comment/comment";
import {cn} from "@/lib/utils";
import * as React from "react";
import {DashboardHeader} from "@/component/header";
import {CommentOperation} from "@/component/comment/comment-operation";
interface CommentsProps extends React.HTMLAttributes<HTMLDivElement> {
    task : Task;
}
export function Comments({task, className} : CommentsProps) {
    const [comments, setComments] = useState<Comment[]>([])
    useEffect(() => {
        (async () => {
            const fetchedComments = await getComments(task.id!)
            setComments(fetchedComments)
        })();
    })
    return(
        <div className={cn('text-foregrounds',className)}>
            <p className="text-lg text-muted-foreground">Комментарии</p>
            <br/>
            {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment}/>
            ))}
            <CommentOperation taskId={task.id!} />
        </div>
    )
}