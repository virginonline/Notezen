import {useEffect, useRef} from "react";
import {welcomeScreen} from "@/lib/web/state/ui/welcome";

export function useWelcomeScreen() {
    const userWelcome = useRef('');
    const time = useRef('');
    useEffect(() => {
        const {greeting, welcome} = welcomeScreen();
        time.current = greeting;
        userWelcome.current = welcome('Ivan')
    }, [time,userWelcome])
    return {time,userWelcome};
}