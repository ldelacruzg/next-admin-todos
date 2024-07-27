import { compare, hash } from 'bcrypt'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export const getUserSessionServer = async () => {
  const session = await getServerSession(authOptions)
  return session?.user;
}

export const loginWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return null;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    // crea el usuario
    const newUser = await createUser(email, password);
    return newUser;
  }

  if (!(await compare(password, user.password ?? 'kk6s7fasyb7@'))) return null;
  return user;
}

export const createUser = async (email: string, password: string) => {
  const passwordHash = await hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email, password: passwordHash,
      name: email.split('@')[0]
    }
  })

  return user;
}