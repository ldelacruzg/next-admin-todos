import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

export async function POST(request: Request) {
  await prisma.todo.deleteMany()
  await prisma.user.deleteMany()

  await prisma.user.create({
    data: {
      email: 'test1@google.com',
      password: await hash('123456', 10),
      roles: ['user', 'admin', 'superuser'],
      todos: {
        createMany: {
          data: [
            { description: 'Learn React', completed: true },
            { description: 'Learn Next.js', completed: false },
            { description: 'Learn Node.js', completed: false },
            { description: 'Learn TypeScript', completed: false },
            { description: 'Learn Prisma', completed: false },
            { description: 'Learn Docker', completed: false },
          ]
        }
      }
    }
  })

  return NextResponse.json({ message: "Seed executed..." });
}