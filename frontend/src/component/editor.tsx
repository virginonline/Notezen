"use client";
import "@/styles/editor.css";
import {Comment, Task} from "@/lib/types/type";
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
import {useToast} from "@/component/ui/use-toast";
import {Priorities, TaskStatuses} from "@/component/data";
import {CommentItem} from "@/component/comment/comment";

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
    const editorData = await ref.current?.save();
    const response = {
      title: data.title,
      content: editorData?.blocks,
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
            <Link href="/dashboard" className={cn(buttonVariants({ variant: "ghost" }))}>
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
        <div className="prose prose-stone mx-auto w-[500px] dark:prose-invert mt-7">
          <div className="">
            <Select>
              <SelectTrigger className="w-[500px] mb-3">
                <SelectValue placeholder="Выберите проект" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Ваши проекты</SelectLabel>
                  <SelectItem value="project1">Проект 1</SelectItem>
                  <SelectItem value="project2">2</SelectItem>
                  <SelectItem value="project3">3</SelectItem>
                  <SelectItem value="project4">4</SelectItem>
                  <SelectItem value="project5">5</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[500px] mb-3">
                <SelectValue placeholder="Выберите приоритет задачи" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Приоритет задачи</SelectLabel>
                  {Priorities.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>{priority.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[500px] mb-3">
                <SelectValue placeholder="Выберите статус задачи" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Статус задачи</SelectLabel>
                  {TaskStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                  ))}
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
