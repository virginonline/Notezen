"use client";
import "@/styles/editor.css";
import {useCallback, useEffect, useRef, useState} from "react";
import EditorJS from "@editorjs/editorjs";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {taskSchema} from "@/lib/validation/task";
import TextareaAutosize from "react-textarea-autosize";
import {Icons} from "./ui/icons";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "./ui/button";
import {useToast} from "@/component/ui/use-toast";

import {getCurrentUser} from "@/lib/session";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/component/ui/select";
import {Priorities, TaskStatuses} from "@/component/data";
import Form, {FormControl, FormField, FormItem} from "@/component/react-hook-form/form";


type FormData = z.infer<typeof taskSchema>;

export function Editor() {
    const user = getCurrentUser();
    const router = useRouter();
    if (!user) {
        router.push('/login')
    }
    const ref = useRef<EditorJS>();
    const form = useForm<FormData>({
        resolver: zodResolver(taskSchema),
    });
    const {toast} = useToast();
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
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
        console.log(data.title)
        const blocks = await ref?.current?.save();
        const response = {
            title: data.title,
            content: blocks,
            priority: data.priority,
            status: data.status,
            project: data.project,
            author: user!.username
        }
        console.log(JSON.stringify(response))
    }

    if (!isMounted) {
        return null
    }

    return (
        <Form onSubmit={onSubmit} {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                        <Select onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="mb-3">
                                                    <SelectValue placeholder="В какой проект добавить задачу"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="3">1</SelectItem>
                                                <SelectItem value="1">2</SelectItem>
                                                <SelectItem value="2">3</SelectItem>
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
                                        <Select onValueChange={field.onChange}>
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
                                        <Select onValueChange={field.onChange}>
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
            </form>
        </Form>
    );
}
