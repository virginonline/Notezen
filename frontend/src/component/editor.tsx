"use client";
import "@/styles/editor.css";
import { Task } from "@/lib/types/Task";
import { useCallback, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { taskSchema } from "@/lib/validation/task";
import TextareaAutosize from "react-textarea-autosize";
import { Icons } from "./ui/icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SelectLabel } from "@radix-ui/react-select";

interface EditorProps {
  task: Pick<Task, "id" | "title" | "description" | "author">;
}
type formData = z.infer<typeof taskSchema>;

export function Editor() {
  const ref = useRef<EditorJS>();
  const { register, handleSubmit } = useForm<formData>({
    resolver: zodResolver(taskSchema),
  });
  const router = useRouter();
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
  }, []);
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
  async function onSubmit(data: formData) {
    setIsSaving(true);
    const blocks = await ref.current?.save();
    const response = {
      title: data.title,
      content: blocks,
      project: data.project,
      priority: data.priority,
      status: data.status,
    };
   // saveTask(response)
    setIsSaving(false);
    alert(response);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-10 py-3">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link href="/" className={cn(buttonVariants({ variant: "ghost" }))}>
              <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Назад
              </>
            </Link>
          </div>
          <button type="submit" className={cn(buttonVariants())}>
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Сохранить</span>
          </button>
        </div>
        <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
          <div className="gap-10 py-3">
            <Select>
              <SelectTrigger className="w-[500px]">
                <SelectValue placeholder="Выберите проект" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Ваши проекты</SelectLabel>
                  <SelectItem value="apple">Проект 1</SelectItem>
                  <SelectItem value="banana">2</SelectItem>
                  <SelectItem value="blueberry">3</SelectItem>
                  <SelectItem value="grapes">4</SelectItem>
                  <SelectItem value="pineapple">5</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[500px]">
                <SelectValue placeholder="Выберите приоритет задачи" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Приоритет задачи</SelectLabel>
                  <SelectItem value="1">Высокий</SelectItem>
                  <SelectItem value="2">Средний</SelectItem>
                  <SelectItem value="3">Низкий</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[500px]">
                <SelectValue placeholder="Выберите статус задачи" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Статус задачи</SelectLabel>
                  <SelectItem value="1">Запланирован</SelectItem>
                  <SelectItem value="2">В прогрессе</SelectItem>
                  <SelectItem value="3">Приостановлен</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <br />
          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue=""
            placeholder="Название задачи"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            {...register("title")}
          />
          <div id="editor" className="min-h-[500px]" />
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
  );
}
