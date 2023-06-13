"use client"
import React, {FC, useEffect, useState} from "react";
import {Button, buttonVariants} from "@/component/ui/button";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/component/ui/dialog";
import {useForm} from "react-hook-form";
import Form, {FormControl, FormField, FormItem} from "@/component/react-hook-form/form";
import {Input} from "@/component/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/component/ui/select";
import {ProjectStatuses} from "@/component/data";
import {Icons} from "@/component/ui/icons";
import {useToast} from "@/component/ui/use-toast";
import {cn} from "@/lib/utils";
import {zodResolver} from "@hookform/resolvers/zod";
import {projectSchema} from "@/lib/validation/project";
import * as z from "zod";
import {useRouter} from "next/navigation";
import {useCurrentUser} from "@/hooks/useCurrentUser";

type FormData = z.infer<typeof projectSchema>;

const ProjectButton: FC = () => {
    const [showProjectCreateButton, setShowProjectCreateButton] = useState(false)
    const router = useRouter();
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const form = useForm<FormData>({
        resolver: zodResolver(projectSchema),
    });
    const {user} = useCurrentUser();
    const {toast} = useToast();
    useEffect(() => {
        if (showProjectCreateButton) {
            form.reset()
        }
    }, [showProjectCreateButton])

    async function onSubmit(data: FormData) {
        const {status, description, title} = data
        setIsSaving(true)
        const response = {
            title: title,
            description: description,
            status: status,
            author: user.username
        }
        console.log(JSON.stringify(response))
        setIsSaving(false);
        setShowProjectCreateButton(false)
        router.refresh();
    }

    return (
        <Dialog open={showProjectCreateButton} onOpenChange={setShowProjectCreateButton}>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    <Icons.add className="mr-2 h-4 w-4"/>
                    Создать проект
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Добавление нового проекта</DialogTitle>
                </DialogHeader>
                <Form onSubmit={onSubmit} {...form}>
                    <div className='grid gap-4 py-4'>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <Input placeholder='Название проекта' {...field}/>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <Input placeholder='Описание проекта' {...field}/>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({field}) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className="mb-3">
                                                <SelectValue placeholder="Статус проекта"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {ProjectStatuses.map((status) => (
                                                <SelectItem key={status.value}
                                                            value={status.value}>{status.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                    <DialogFooter>
                        <button type="submit" className={cn(buttonVariants())}>
                            {isSaving && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                            )}
                            <span>Создать проект</span>
                        </button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default ProjectButton;