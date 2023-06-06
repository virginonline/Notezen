import NextAuth, {NextAuthOptions, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {api} from "@/lib/api";
export const authOption : NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/login"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              username: {label:"username", type: "text", placeholder: "username"},
                password: {label:"password", type:"password", placeholder: "password"}
            },
            async authorize(credentials)    {
                const user : {id:string, username : string} = await api.post('auth/login', {
                    json: {
                        username: credentials?.username,
                        password: credentials?.password
                    }
                }).json();
                if(user) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async session({token, session}) {
            if (token) {

            }
            return session;
        },
        async jwt({token, user}) {
            const dbuser : {id:string, username:string} = {id: "1", username: "bebras"};
            if(!dbuser) {
                token.id = user.id;
            }
            return {
                id:dbuser.id,
                username:dbuser.username,
            }
        }
    }
}