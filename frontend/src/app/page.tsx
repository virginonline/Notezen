'use client'
import {useState} from "react";
import welcomeScreen from "@/lib/web/state/ui/welcome";
import {Badge} from "@/component/ui/badge";
import {Editor} from "@/component/editor";
export default function Home() {
    const [markdown, setMarkdown] = useState<string>('')
    const {greeting, welcome} = welcomeScreen();
    return (
        <main>
            {/* <Badge
            >
                {greeting}
            </Badge>
            <Badge>Badge</Badge>
            <h1
                className='
        text-black
        '
            >{welcome}</h1> */}
            <Editor/>
        </main>
    )
}
