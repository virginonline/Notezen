"use client"
import {ButtonProps, buttonVariants} from "@/component/ui/button";
import {FC, useState} from "react";
import {cn} from "@/lib/utils";
import {Icons} from "@/component/ui/icons";

interface EditUserButtonProps extends ButtonProps{}

export const EditUserButton: FC<EditUserButtonProps> = ({
    className,
    variant,
    ...props
} : EditUserButtonProps) => {
    //const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    async function onClick() {
        setIsLoading(true)

    }
    return(
        <button
        className={cn(buttonVariants({variant}),
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
            Редактировать профиль
        </button>
    )
}