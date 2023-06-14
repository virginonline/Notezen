"use client"

import {Project, ProjectStatus} from "@/lib/types/type";
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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/component/ui/select";
import {ProjectStatuses} from "@/component/data";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import TextareaAutosize from "react-textarea-autosize";
import {deleteProject} from "@/lib/api/project";


interface ProjectOperationProps {
    project: Pick<Project, "id" | "title" | "status" | "description" | "owner">
}

export function ProjectOperation({project} : ProjectOperationProps) {
    const {user} = useCurrentUser();
    const router = useRouter();
    const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)
    const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
    const [status, setStatus] = useState<ProjectStatus>({
        label:'',
        value:'',
    });
    useEffect(() => {
        const value = ProjectStatuses.find(pr => pr.value == project.status);
        setStatus(value || {
            label:'',
            value:'',
        });
        console.log(status)
    }, [project.status, status])
    return (
        <>
            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
                        <Icons.ellipsis className="h-4 w-4" />
                        <span className="sr-only">Open</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            className="flex cursor-pointer items-center"
                            onSelect={() => {
                                setShowEditDialog(true)
                                document.body.style.pointerEvents = ""
                            }}
                            disabled={project.owner != user.username}
                        >
                            Редактировать проект
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                            disabled={project.owner != user.username}
                            onSelect={() => {
                                setShowDeleteAlert(true)
                                document.body.style.pointerEvents = ""
                            }}

                        >
                            Удалить проект
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Редактирование проекта</DialogTitle>
                    </DialogHeader>
                    <TextareaAutosize id="description"
                                      defaultValue={project.description || ''}
                                      placeholder='Описание проекта'
                                      className="resize-none appearance-none overflow-hidden rounded-md border border-input bg-transparent px-3 py-2 focus:outline-none"

                    />
                    <Select onValueChange={(event) => {
                        const st = ProjectStatuses.find((ps) => ps.value == event)
                        setStatus(prevState => st || prevState)}} value={status?.value}>
                            <SelectTrigger className="mb-3">
                                <SelectValue placeholder="Статус проекта"/>
                            </SelectTrigger>
                        <SelectContent>
                            {ProjectStatuses.map((status) => (
                                <SelectItem key={status.value}
                                            value={status.value}>{status.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <DialogFooter>
                        <Button onClick={() => {
                            //todo patch
                        }}>Сохранить изменения</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Вы действительно хотите удалить этот проект?
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
                                const response = await deleteProject(project.id)

                                const deleted = true;

                                if (response.ok) {
                                    toast({
                                        title: "Проект удален",
                                        description: "Вы удалили проект",
                                        variant: "destructive",
                                    })
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