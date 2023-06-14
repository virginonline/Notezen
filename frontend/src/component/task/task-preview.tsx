import {TaskPreview} from "@/lib/types/type";
import Link from "next/link";

interface TaskPreviewProps {
    task : TaskPreview;
}

export function TaskPreviewItem({task} : TaskPreviewProps) {
    const dateStr = new Date(task.expiration_date!);

    return (
        <div className="flex items-center justify-between p-4">
            <div className="grid gap-1">
                <Link
                    href={`/dashboard/task/${task.id}`}
                    className="font-semibold hover:underline"
                >
                    {task.title}
                </Link>
                <div>
                    <p className="text-sm text-muted-foreground">
                        Срок выполнения - {dateStr.toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
        )
}