"use client"

import {Project} from "@/lib/types/type";
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
import {Input} from "@/component/ui/input";
import {Button} from "@/component/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/component/ui/select";
import {ProjectStatus, ProjectStatuses} from "@/component/data";


async function deletePost(projectId: string) {
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

interface ProjectOperationProps {
    project: Pick<Project, "id" | "title" | "status" | "description">
}

export function ProjectOperation({project} : ProjectOperationProps) {

    const router = useRouter();
    const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)
    const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
    const [status, setStatus] = useState<string>('');
    useEffect(() => {
        const value = ProjectStatuses.find(pr => pr.label == project.status) || '';
        if(typeof value !== "string") {
            setStatus(value.value);
        }
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
                        >
                            Редактировать проект
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
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
                    <Input id="description" defaultValue={project.description || ''} placeholder='Описание проекта' className="col-span-3" />
                    <Select onValueChange={setStatus} value={status}>
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
                                //todo
                                // delete project
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