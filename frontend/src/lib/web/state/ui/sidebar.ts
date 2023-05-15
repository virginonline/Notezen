import {useCallback, useState} from "react";
import {state} from "sucrase/dist/types/parser/traverser/base";

export default function useSidebar(initState = true, isMobileOnly = false) {
    const [isFold, setIsFold] = useState<boolean>(initState)
    const toggle = useCallback(async (state?: boolean) => {
        setIsFold((prev) => {
            return typeof state == 'boolean' ? state : !prev;
        });
    },
        [isFold]
    );
    const open = useCallback(() => {
        toggle(true)
            ?.catch((v) => console.error('Error whilst opening sidebar: %O', v));
    }, [toggle]);

    const close = useCallback(() => {
        toggle(false)
            ?.catch((v) => console.error('Error whilst closing sidebar: %O', v));
    }, [toggle]);

    return { isFold, toggle, open, close };

}