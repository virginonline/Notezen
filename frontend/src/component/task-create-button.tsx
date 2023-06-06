"use client"
import {FC, useState} from "react";
import {ButtonProps, buttonVariants} from "@/component/ui/button";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {Icons} from "@/component/ui/icons"
interface TaskCreateButtonProps extends ButtonProps{}

export const TaskCreateButton : FC<TaskCreateButtonProps> = ({
                                                          className,
                                                          variant,
                                                          ...props} : TaskCreateButtonProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function onClick() {
        setIsLoading(true)
        router.refresh();
        router.push(`/editor`)
    }
    return(
        <button
            onClick={onClick}
            className={cn(
                buttonVariants({ variant }),
                {
                    "cursor-not-allowed opacity-60": isLoading,
                },
                className
            )}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Icons.add className="mr-2 h-4 w-4" />
            )}
            Новая задача
        </button>
    )
}

