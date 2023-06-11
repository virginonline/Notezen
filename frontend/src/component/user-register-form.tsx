"use client";

import {HTMLAttributes, useState} from "react";
import * as z from "zod";
import {userRegisterSchema} from "@/lib/validation/auth";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/component/ui/use-toast";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {Label} from "@/component/ui/label";
import {Input} from "@/component/ui/input";
import {buttonVariants} from "@/component/ui/button";
import {Icons} from "@/component/ui/icons";
import {login, registerUser} from "@/lib/api/auth";
import {setCookie} from "cookies-next";

interface UserRegisterFormProps extends HTMLAttributes<HTMLDivElement> {
    label:string
}

type FormData = z.infer<typeof userRegisterSchema>;

export function UserRegisterForm({ className, ...props }: UserRegisterFormProps) {
    const {push} = useRouter();
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormData>({
        resolver: zodResolver(userRegisterSchema)
    })
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function onSubmit(data: FormData) {
        setIsLoading(true)
        const {username,password, repeatPassword} = data;
        await registerUser(username,password);
        toast({
            title: 'Вы успешно зарегестрировались!',
            description: 'Происходит переадресация на главную страницу'
        })
        const user = await login(username, password)
        setCookie('_user', user);
        push('/dashboard')
        setIsLoading(false);

    }
    return(
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="username">
                            Имя пользователя
                        </Label>
                        <Input
                            id="username"
                            placeholder="Имя пользователя"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("username")}
                        />
                        <Input
                            id="passowrd"
                            placeholder="Пароль"
                            autoCapitalize="none"
                            type="password"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("password")}
                        />
                        <Input
                            id="repeatPassword"
                            placeholder="Повторите пароль"
                            autoCapitalize="none"
                            type="password"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("repeatPassword")}
                        />
                        {errors?.repeatPassword && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.repeatPassword.message}
                            </p>
                        )}
                    </div>
                    <button className={cn(buttonVariants())} disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {props.label}
                    </button>
                </div>
            </form>
        </div>
    )
}
