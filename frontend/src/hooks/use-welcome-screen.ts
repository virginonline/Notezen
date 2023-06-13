import {useEffect, useState} from "react";
import {welcomeScreen} from "@/lib/web/state/ui/welcome";
import {getCurrentUser} from "@/lib/session";
import {useCurrentUser} from "@/hooks/useCurrentUser";

export function useWelcomeScreen() {
    const [time,setTime] = useState('');
    const {user} = useCurrentUser();

    const [userWelcome, setUserWelcome] = useState('');
    useEffect(() => {
        const {greeting, welcome} = welcomeScreen();
        setTime(greeting);
        setUserWelcome(welcome(user.username));

    }, [user.username])
    return [time,userWelcome];
}