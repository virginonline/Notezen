import { buttonVariants } from "@/component/ui/button";
import { Icons } from "@/component/ui/icons";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import {UserRegisterForm} from "@/component/user-register-form";

export const metadata: Metadata = {
    title: "Регирстрация",
    description: "Регистрация аккаунта",
}

export default async function RegisterPage() {
    return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-4 top-4 md:left-8 md:top-8"
          )}
        >
          <>
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Назад
          </>
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Добро пожаловтаь
            </h1>
            <p className="text-sm text-muted-foreground">
              Введите имя пользователя и пароль для регистрации
            </p>
          </div>
          <UserRegisterForm label={"Регистрация"}/>
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/login"
              className="hover:text-brand underline underline-offset-4"
            >
              Уже есть аккаунт? Авторизация
            </Link>
          </p>
        </div>
      </div>
    )
  }