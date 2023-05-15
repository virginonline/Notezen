import {UserAgentType} from "@/lib/shared/userAgent";
import useSidebar from "@/lib/web/state/ui/sidebar";
import useTitle from "@/lib/web/state/ui/title";
import {createContainer} from "unstated-next";
import useSplit from "@/lib/web/state/ui/split";

const DEFAULT_UA: UserAgentType = {
    isMobile: false,
    isMobileOnly: false,
    isTablet: false,
    isBrowser: true,
};

interface Props {
    ua?: UserAgentType;
    disablePassword?: boolean;
    IS_DEMO?: boolean;
}

function useUI({
                   ua = DEFAULT_UA,
                   disablePassword,
                   IS_DEMO,
               }: Props = {}) {
    return {
        ua,
        sidebar: useSidebar(
            !ua?.isMobileOnly,
            ua.isMobileOnly
        ),
        split: useSplit(),
        title: useTitle(),
        disablePassword,
        IS_DEMO,
    };
}

const UIState = createContainer(useUI);

export default UIState;