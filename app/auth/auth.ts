import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials({
            credentials: {
                email: { 
                    label: "email", 
                    type: "text",
                    placeholder: "email" 
                },
                password: { 
                    label: "Password", 
                    type: "password",
                    placeholder: "password"
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                const user = await prisma.user.findUnique({where: {email: credentials.email}})

                if (!user) return null

                const decode = await bcrypt.compare(credentials.password, user.password)
                if (!decode) return null

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }
            }
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (!user) return token
            return {
                ...token,
                id: user.id,
            }
        },
        session({ session, token }) {
            return {
                ...session,
                id: token.id,
            }
        }
    }
};
