import {useCallback, useEffect, useRef, useState} from "react";
import {welcomeScreen} from "@/lib/web/state/ui/welcome";
import {getCurrentUser} from "@/lib/session";
import {User} from "@/lib/types/type";

export function useWelcomeScreen() {
    const [time,setTime] = useState('');
    const user : User = getCurrentUser();
    const [userWelcome, setUserWelcome] = useState('');
    useEffect(() => {
        const {greeting, welcome} = welcomeScreen();
        setTime(greeting);
        setUserWelcome(welcome(user.username));

    }, [user.username])
    return [time,userWelcome];
}