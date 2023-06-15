"use client"

import React, {useState} from "react";
import {toast} from "@/component/ui/use-toast"
import {Icons} from "@/component/ui/icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/component/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/component/ui/alert-dialog";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/component/ui/dialog";
import {Button} from "@/component/ui/button";
import {Input} from "@/component/ui/input";
import Link from "next/link";
import {useRouter} from "next/navigation";
import Label from "@/component/ui/label";
import {delegateTask, deleteTask} from "@/lib/api/task";
import {getCurrentUserFromServer} from "@/lib/session";
import {useCurrentUser} from "@/hooks/useCurrentUser";


interface TaskOperationProps {
    taskId: number
    delegateUser?: string
}


export function TaskOperation({delegateUser, taskId}: TaskOperationProps) {
    const {user} = useCurrentUser();
    const router = useRouter();
    const [usr, setUsername] = useState<string>(delegateUser || '')
    const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
    const [showDelegateDialog, setShowDelegateDialog] = useState<boolean>(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)
    const [showChangeStatusDialog,setShowChangeStatusDialog] = useState<boolean>(false)

    async function onSubmit() {
        const response = await delegateTask(taskId, usr);
        if (!response.ok) {
            return toast({
                title: 'Что-то пошло не так',
                description: 'Не удалось передать задачу данному пользователю. Проверьте имя пользователя',
                variant: "destructive"
            })
        } else {
            setShowDelegateDialog(false);
            return toast({
                description: 'Пользователь получил задачу',
            })
        }
    }

    return (
        <>
            <Dialog open={showDelegateDialog} onOpenChange={setShowDelegateDialog}>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
                        <Icons.ellipsis className="h-4 w-4"/>
                        <span className="sr-only">Открыть</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => {
                            document.body.style.pointerEvents = ""
                        }}>
                            <Link href={`task/${taskId}`} className="flex w-full">
                                Открыть задачу
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
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
                            className="flex cursor-pointer items-center"
                            onSelect={() => {
                                setShowDelegateDialog(true)
                                document.body.style.pointerEvents = ""
                            }}
                        >
                            Изменить статус задачи
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
                <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Делегирование задачи</DialogTitle>
                    </DialogHeader>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor="username" className='text-left'>
                            Кому делегировать задачу
                        </Label>
                        <Input
                            id="username"
                            onChange={(event) => setUsername(event.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <DialogFooter>
                        <Button onClick={async () => onSubmit()}>Делегировать задачу</Button>
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

                                const deleted = await deleteTask(taskId);

                                if (deleted.ok) {
                                    toast({
                                        title: "Задача удалена",
                                        description: "Вы удалили задачу",
                                        variant: "destructive",
                                    })
                                } else {
                                    toast({
                                        title: 'Что-то пошло не так',
                                        variant: "destructive",
                                        description: 'Не удалось удалить задачу'
                                    })
                                }
                                setIsDeleteLoading(false)
                                setShowDeleteAlert(false)
                                router.refresh()
                            }}
                            className="bg-red-600 focus:ring-red-600"
                        >
                            {isDeleteLoading ? (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                            ) : (
                                <Icons.trash className="mr-2 h-4 w-4"/>
                            )}
                            <span>Удалить</span>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
