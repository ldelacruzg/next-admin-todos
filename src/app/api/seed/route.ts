import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {

  await prisma.todo.deleteMany()
  const todo = await prisma.todo.createMany({
    data: [
      { description: 'Learn React', completed: true },
      { description: 'Learn Next.js', completed: false },
      { description: 'Learn Node.js', completed: false },
      { description: 'Learn TypeScript', completed: false },
      { description: 'Learn GraphQL', completed: false },
      { description: 'Learn Prisma', completed: false },
      { description: 'Learn Jest', completed: false },
      { description: 'Learn Docker', completed: false },
      { description: 'Learn Kubernetes', completed: false },
      { description: 'Learn AWS', completed: false },
      { description: 'Learn Azure', completed: false },
      { description: 'Learn GCP', completed: false },
      { description: 'Learn Python', completed: false },
    ],
  })

  return NextResponse.json({ message: "Seed executed..." });
}