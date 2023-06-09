import {Comment} from "@/lib/types/type";
import {Avatar, AvatarFallback} from "@/component/ui/avatar";

interface CommentProps {
    comment: Comment;
}
export function CommentItem({comment} : CommentProps) {
    return(
        <div className="space-y-8 border w-[200px] rounded">
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarFallback>{comment.author.slice(0,2)}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{comment.author}</p>
                    <p className="text-sm text-muted-foreground">
                        {comment.content}
                    </p>
                </div>
            </div>
        </div>
    )
}