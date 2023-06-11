import {useCallback, useEffect, useRef, useState} from "react";
import {welcomeScreen} from "@/lib/web/state/ui/welcome";
import {getCurrentUser} from "@/lib/session";

export function useWelcomeScreen() {
    const [time,setTime] = useState('');
    const user = getCurrentUser();
    const [userWelcome, setUserWelcome] = useState('');
    useEffect(() => {
        const {greeting, welcome} = welcomeScreen();
        setTime(greeting);
        setUserWelcome(welcome(user!.username));

    }, [])
    return [time,userWelcome];
}