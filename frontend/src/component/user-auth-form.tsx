"use client";

import { authSchema } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {HTMLAttributes, useState} from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Icons } from "./ui/icons";
import {setCookie} from "cookies-next";
import {User} from "@/lib/types/type";
import {login} from "@/lib/api/auth";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {
  label: string
}

type FormData = z.infer<typeof authSchema>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(authSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function onSubmit(data: FormData) {
    setIsLoading(true)
    const {username,password} = data;
    const user : User = await login(data.username, data.password);
    setCookie('_user', user)
    setIsLoading(false);
    router.push('/dashboard')
  }

  return (
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
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
            {errors?.username && (
              <p className="px-1 text-xs text-red-600">
                {errors.username.message}
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
  );
}
