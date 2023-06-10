import {useCallback, useEffect, useRef, useState} from "react";
import {welcomeScreen} from "@/lib/web/state/ui/welcome";

export function useWelcomeScreen() {
    const [time,setTime] = useState('');
    const [userWelcome, setUserWelcome] = useState('');
    useEffect(() => {
        const {greeting, welcome} = welcomeScreen();
        setTime(greeting);
        setUserWelcome(welcome('Ivan'));

    }, [])
    return [time,userWelcome];
}