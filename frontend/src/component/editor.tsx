"use client"
import "@/styles/editor.css"
import {Task} from "@/lib/types/Task";
import {useCallback, useEffect, useRef, useState} from "react";
import EditorJS from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod"
import {useRouter} from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { taskSchema } from "@/lib/validation/task";
import TextareaAutosize from "react-textarea-autosize"
import { Icons } from "./ui/icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

interface EditorProps {
    task: Pick<Task, "id" | "title" | "description" | "author">
}
type formData = z.infer<typeof taskSchema>

export function Editor() {
    const ref = useRef<EditorJS>();
    const {register, handleSubmit} = useForm<formData>({
        resolver: zodResolver(taskSchema)
    })
    const router = useRouter();
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const initEditor = useCallback(async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default
        const Header = (await import('@editorjs/header')).default

        if(!ref.current) {
            const editor = new EditorJS({
                holder: 'editor',
                onReady() {
                    ref.current = editor
                },
                placeholder: 'Type something',
                inlineToolbar: true,
                tools: {
                    header: Header
                },

            })
        }
    },[])
    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsMounted(true)
        }
    }, [])
    useEffect(() => {
        if (isMounted) {
            initEditor();
            return () => {
                ref.current?.destroy()
                ref.current = undefined;
            }
        }
    }, [isMounted, initEditor])
    async function onSubmit(data : formData) {
        setIsSaving(true)
        const blocks = await ref.current?.save();
        const response = {
            title: data.title,
            content: blocks,
        }
        setIsSaving(false)
        alert(response)
        
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full gap-10">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-10">
              <Link
                href="/"
                className={cn(buttonVariants({ variant: "ghost" }))}
              >
                <>
                  <Icons.chevronLeft className="mr-2 h-4 w-4" />
                  Back
                </>
              </Link>
            </div>
            <button type="submit" className={cn(buttonVariants())}>
              {isSaving && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Save</span>
            </button>
          </div>
          <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
            <TextareaAutosize
              autoFocus
              id="title"
              defaultValue=''
              placeholder="Post title"
              className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
              {...register("title")}
            />
            <div id="editor" className="min-h-[500px]" />
            <p className="text-sm text-gray-500">
              Use{" "}
              <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
                Tab
              </kbd>{" "}
              to open the command menu.
            </p>
          </div>
        </div>
      </form>
    )
}