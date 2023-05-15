import {useCallback, useState} from "react";

export default function useTitle() {
    const [title, setTitle] = useState<string>('Notezen')
    const updateTitle = useCallback((text?:string) => {
        setTitle(text ? `${text} - Notezen` : 'Notezen')
    },[])
    return {title, updateTitle}
}