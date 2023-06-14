"use client";
import "@/styles/editor.css";
import {useCallback, useEffect, useRef, useState} from "react";
import EditorJS, {OutputData} from "@editorjs/editorjs";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {taskSchema} from "@/lib/validation/task";
import TextareaAutosize from "react-textarea-autosize";
import {Icons} from "./ui/icons";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Button, buttonVariants} from "./ui/button";
import {format} from "date-fns"

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/component/ui/select";
import {Priorities, TaskStatuses} from "@/component/data";
import Form, {FormControl, FormField, FormItem} from "@/component/react-hook-form/form";
import {Project, Task} from "@/lib/types/type";
import {Calendar} from "@/component/calendar";
import {ru} from 'date-fns/locale';
import {Popover, PopoverContent, PopoverTrigger} from "@/component/ui/popover";
import {CalendarIcon} from "lucide-react";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {toast} from "@/component/ui/use-toast";
import {addTask} from "@/lib/api/task";


type FormData = z.infer<typeof taskSchema>;

interface EditorProps {
    task?: Task,
    availableProjects?: Project[]
}

export function Editor({task, availableProjects}: EditorProps) {

    const {user} = useCurrentUser();

    const [project] = useState<Project[]>(availableProjects || []);

    const router = useRouter();
    if (!user) {
        router.push('/login')
    }
    const ref = useRef<EditorJS>();

    const form = useForm<FormData>({
        resolver: zodResolver(taskSchema),
    });
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [initData] = useState<OutputData>()
    const [isSaving, setIsSaving] = useState<boolean>(false);

    useEffect(() => {

        form.setValue('author', user.username)

        if (task !== undefined && task !== null) {
            form.setValue('author', task.created_by)
            form.setValue('status', task.status)
            form.setValue('priority', task.priority)
            form.setValue('project', task.project)
            form.setValue('title', task.title)
        }
    }, [form, user.username, task])
    const initEditor = useCallback(async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default;
        const Header = (await import("@editorjs/header")).default;

        if (!ref.current) {
            const editor = new EditorJS({
                holder: "editor",
                onReady() {
                    ref.current = editor;
                },
                placeholder: "Напишите о чем будет задача",
                inlineToolbar: true,
                data: initData,
                tools: {
                    header: Header,
                },
            });
        }
    }, [ref]);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsMounted(true);
        }
    }, []);
    useEffect(() => {
        if (isMounted) {
            initEditor();
            return () => {
                ref.current?.destroy();
                ref.current = undefined;
            };
        }
    }, [isMounted, initEditor]);

    async function onSubmit(data: FormData) {
        setIsSaving(true);
        const blocks = await ref?.current?.save();

        const task: Task = {
            created_by: data.author,
            project: data.project,
            status: data.status,
            priority: data.priority,
            description: JSON.stringify(blocks),
            expiration_date: data.expirationDate,
            title: data.title,
        }

        const response = await addTask(task)
        if (response.ok) {
            toast({
                title: 'Задача добавлена в проект!',
            })
        }
        setIsSaving(false);

    }

    if (!isMounted) {
        return null
    }

    return (
        <Form onSubmit={onSubmit} {...form}>
            <div className="grid w-full gap-10">
                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center space-x-10">
                        <Link
                            href="/dashboard"
                            className={cn(buttonVariants({variant: "ghost"}))}
                        >
                            <>
                                <Icons.chevronLeft className="mr-2 h-4 w-4"/>
                                Назад
                            </>
                        </Link>
                    </div>
                    <button type="submit" className={cn(buttonVariants())}>
                        {isSaving && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                        )}
                        <span>Сохранить</span>
                    </button>
                </div>
                <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
                    <div className='mb-3 '>
                        <FormField
                            control={form.control}
                            name="project"
                            render={({field}) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} value={task?.project}>
                                        <FormControl>
                                            {project.length === 0 ? (
                                                <SelectTrigger className="mb-3" disabled={true}>
                                                    <SelectValue placeholder="Нет доступных проектов"/>
                                                </SelectTrigger>

                                            ) : (
                                                <SelectTrigger className="mb-3">
                                                    <SelectValue placeholder="В какой проект добавить задачу"/>
                                                </SelectTrigger>
                                            )}
                                        </FormControl>
                                        <SelectContent>
                                            {project.map((project) => (
                                                <SelectItem key={project.id}
                                                            value={project.title}>{project.title}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({field}) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} value={task?.status}>
                                        <FormControl>
                                            <SelectTrigger className="mb-3">
                                                <SelectValue placeholder="Статус задачи"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {TaskStatuses.map((status) => (
                                                <SelectItem key={status.value}
                                                            value={status.value}>{status.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({field}) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} value={task?.priority}>
                                        <FormControl>
                                            <SelectTrigger className='mb-3'>
                                                <SelectValue placeholder="Приоритет задачи"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Priorities.map((priority) => (
                                                <SelectItem key={priority.value}
                                                            value={priority.value}>{priority.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={'expirationDate'}
                            render={({field}) => (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "mx-auto w-full",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Выбрать срок выполнения</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="mx-auto p-0" align="start">
                                        <Calendar
                                            locale={ru}
                                            className='w-full'
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                    </div>
                    <br/>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <TextareaAutosize
                                autoFocus
                                id="title"
                                defaultValue=""
                                placeholder="Название задачи"
                                className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
                                {...field}
                            />
                        )}/>
                    <div id="editor" className="min-h-[500px]"/>
                    <p className="text-sm text-gray-500">
                        Используйте{" "}
                        <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
                            Tab
                        </kbd>{" "}
                        для отображения командного меню.
                    </p>
                </div>
            </div>
        </Form>
    );
}
