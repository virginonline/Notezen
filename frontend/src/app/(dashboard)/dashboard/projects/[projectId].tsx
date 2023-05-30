import { useRouter } from "next/router";
import fetch from "node-fetch";
import {Project} from "@/lib/types/Project";

export function ProjectPage() {
    const router = useRouter();
    const {projectId} = router.query;

    return(
        <div>

        </div>
    )
}