"use client"

import {User} from "@/lib/types/type";
import * as z from "zod"
import {userEditSchema} from "@/lib/validation/user";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useState} from "react";
import {toast} from "@/component/ui/use-toast";
import {cn} from "@/lib/utils";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/component/ui/card";
import Label from "@/component/ui/label";
import {Input} from "@/component/ui/input";
import {buttonVariants} from "@/component/ui/button";
import {Icons} from "@/component/ui/icons";
import {editUser} from "@/lib/api/auth";

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
    user: Pick<User, "id" | "username">
}

type FormData = z.infer<typeof userEditSchema>

export function UserEditForm({user, className, ...props}: UserNameFormProps) {
    const router = useRouter();
    const {
        handleSubmit,
        formState: {errors},
        register
    } = useForm<FormData>({
        resolver: zodResolver(userEditSchema),
        defaultValues: {
            username: user?.username || "",
        }
    })
    const [isSaving, setIsSaving] = useState<boolean>(false);

    async function onSubmit(data: FormData) {
        setIsSaving(true);
        const response = await editUser(data.username);
        setIsSaving(false);

        if (!response.ok) {
            return toast({
                title: "Что-то пошло не так",
                description: "Имя пользователя не было обновлено, попробуйте еще раз",
                variant: "destructive"
            })
        }

        toast({
            description: "Имя пользователя было обновлено.",
        })

        router.refresh();
    }

    return (
        <form
            className={cn(className)}
            onSubmit={handleSubmit(onSubmit)}
            {...props}
        >
            <Card>
                <CardHeader>
                    <CardTitle>Имя пользователя</CardTitle>
                </CardHeader>
                <CardDescription>

                </CardDescription>
                <CardContent>
                    <div className='grid gap-1'>
                        <Input
                            id='username'
                            className='w-[400px]'
                            size={32}
                            {...register("username")}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <button
                        type='submit'
                        disabled={isSaving}
                        className={cn(buttonVariants(), className)}>
                        {isSaving && (
                            <Icons.spinner className='mr-2 h-4 w-4 animate-spin'/>
                        )}
                        <span>Сохранить</span>
                    </button>
                </CardFooter>
            </Card>
        </form>
    )
}