import { getServerSession } from "next-auth/next"

import { authOption } from "@/lib/auth"

export async function getCurrentUser() {
    const session = await getServerSession(authOption)
    return session?.user
}