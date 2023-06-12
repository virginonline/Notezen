"use client"

import {Task} from "@/lib/types/type";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import { toast } from "@/component/ui/use-toast"
import {Icons} from "@/component/ui/icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/component/ui/dropdown-menu";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle
} from "@/component/ui/alert-dialog";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/component/ui/dialog";
import {Button} from "@/component/ui/button";
import Label from "@/component/ui/label";
import {Input} from "@/component/ui/input";
import Link from "next/link";


async function deleteTask(taskId: string) {
    const response = false;
    if (!response) {
        toast({
            title: "Something went wrong.",
            description: "Your post was not deleted. Please try again.",
            variant: "destructive",
        })
    }
    return true
}

interface TaskOperationProps {
    task: Pick<Task, "id" | "title">
}

export function TaskOperation({task} : TaskOperationProps) {
    const router = useRouter();
    const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
    const [showDelegateDialog, setShowDelegateDialog] = useState<boolean>(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
                    <Icons.ellipsis className="h-4 w-4" />
                    <span className="sr-only">Открыть</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        <Link href={`/editor/${task.id}`} className="flex w-full">
                            Редактировать
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                        onSelect={() => setShowDeleteAlert(true)}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
