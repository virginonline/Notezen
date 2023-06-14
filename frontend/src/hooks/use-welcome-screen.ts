import {useEffect, useState} from "react";
import {welcomeScreen} from "@/lib/web/state/ui/welcome";
import {useCurrentUser} from "@/hooks/useCurrentUser";

export function useWelcomeScreen() {
    const [time,setTime] = useState('');

    const [userWelcome, setUserWelcome] = useState('');

    return [time,userWelcome];
}