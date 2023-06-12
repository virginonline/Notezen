"use client"

import {Task} from "@/lib/types/type";
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
import {useRouter} from "next/navigation";


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
            <Dialog open={showDelegateDialog} onOpenChange={setShowDelegateDialog}>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
                    <Icons.ellipsis className="h-4 w-4" />
                    <span className="sr-only">Open</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => {document.body.style.pointerEvents = ""}} >
                        <Link href={`/editor/${task.id}`} className="flex w-full">
                            Редактировать
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="flex cursor-pointer items-center"
                        onSelect={() => {
                            setShowDelegateDialog(true)
                            document.body.style.pointerEvents = ""
                        }}
                    >
                        Делегировать задачу
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                        onSelect={() => {
                            setShowDeleteAlert(true)
                            document.body.style.pointerEvents = ""
                        }}
                    >
                        Удалить задачу
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Делегирование задачи</DialogTitle>
                    </DialogHeader>
                    <Input value="" className="col-span-3" />
                    <DialogFooter>
                        <Button onClick={() => {
                            //todo patch
                        }}>Делегировать задачу</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Вы действительно хотите удалить эту задачу?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Это действие нельзя будет отменить.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Закрыть</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async (event) => {
                                event.preventDefault()
                                setIsDeleteLoading(true)

                                const deleted = true;

                                if (deleted) {
                                    setIsDeleteLoading(false)
                                    setShowDeleteAlert(false)
                                    router.refresh()
                                }
                            }}
                            className="bg-red-600 focus:ring-red-600"
                        >
                            {isDeleteLoading ? (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Icons.trash className="mr-2 h-4 w-4" />
                            )}
                            <span>Удалить</span>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
