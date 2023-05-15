import { authSchema } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import * as z from "zod"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof authSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const {
        register,
        handleSubmit,
        formState: {errors},

    } = useForm<FormData>({
        resolver: zodResolver(authSchema)
    })
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const searchParams = useSearchParams()

    async function onSubmit(data : FormData) {
        // TODO: sign in
        
    }
}