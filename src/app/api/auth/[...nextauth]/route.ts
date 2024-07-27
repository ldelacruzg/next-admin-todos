import NextAuth, { type AuthOptions } from "next-auth"
import { type Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from '@/lib/prisma'
import { loginWithEmailAndPassword } from "@/auth";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Credencials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Introduce el correo electronico" },
        password: { label: "Password", type: "password", placeholder: "********" }
      },
      async authorize(credentials, req) {
        const user = await loginWithEmailAndPassword(credentials!.email, credentials!.password);
        return user;
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      return true
    },
    async jwt({ token, user }) {
      const userDB = await prisma.user.findUnique({ where: { email: token.email! } })

      if (!userDB?.isActive) throw Error('User unauthorized')

      token.id = userDB?.id ?? 'no-id'
      token.roles = userDB?.roles ?? ['no-roles']
      return token
    },
    async session({ session, user, token }) {
      if (session && session.user) {
        session.user.id = token.id!
        session.user.roles = token.roles
        //session.user.isActive = user.isActive;
      }
      return session
    },
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }