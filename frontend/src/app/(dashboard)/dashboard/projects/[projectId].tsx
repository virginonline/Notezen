import { useRouter } from "next/router";

export function ProjectPage() {
    const router = useRouter();
    const {projectId} = router.query;

    return(
        <div>

        </div>
    )
}