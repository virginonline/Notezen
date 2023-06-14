'use client'
import {Task} from "@/lib/types/type";
import {useCallback, useEffect, useRef, useState} from "react";
import EditorJS, {OutputData} from "@editorjs/editorjs";
import TextareaAutosize from "react-textarea-autosize";
import * as React from "react";
import {cn} from "@/lib/utils";


interface TaskPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
    task?: Task,

}


export function TaskPreview({task, className}: TaskPreviewProps) {
    const ref = useRef<EditorJS>();
    const [initData] = useState<OutputData>(JSON.parse(task?.description || ''))
    const [isMounted, setIsMounted] = useState<boolean>(false);

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
                readOnly: true,
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
    return (
        <div className={cn(className)}>
            <TextareaAutosize
                autoFocus
                id="title"
                disabled={true}
                defaultValue={task?.title}
                className="w-full text-center resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            />
            <div id="editor" className="min-h-[500px]"/>
        </div>
    )
}
