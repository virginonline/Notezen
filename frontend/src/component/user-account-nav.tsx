"use client"

import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/component/ui/dropdown-menu";
import {User} from "@/lib/types/type";
import {UserAvatar} from "@/component/user-avatar";
import Link from "next/link";
import {logout} from "@/lib/api/auth";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {getCurrentUser} from "@/lib/session";
import {parseCookies} from "nookies";
import {useCurrentUser} from "@/hooks/useCurrentUser";


export function UserAccountNav() {
    const route = useRouter();
    const {user} = useCurrentUser();
return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar user={user}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.username}</p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/dashboard">Профиль</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">Настройки</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={(event) => {
                        event.preventDefault()
                        logout().then(r => {
                            route.push(`${window.location.origin}/login`)
                        });
                    }}
                >
                    Выйти
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}