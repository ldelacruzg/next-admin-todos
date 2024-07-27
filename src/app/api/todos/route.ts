import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"
import * as yup from 'yup';
import { getUserSessionServer } from "@/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = Number(searchParams.get('limit') ?? '10')
  const page = Number(searchParams.get('page') ?? '1')

  if (isNaN(limit) || isNaN(page)) {
    return NextResponse.json({
      error: 'Bad Request',
      message: 'Invalid limit or page query'
    }, { status: 400 });
  }

  const user = await getUserSessionServer()
  if (!user) {
    return NextResponse.json({
      message: 'Not authorized'
    }, { status: 401 })
  }

  const todos = await prisma.todo.findMany({
    skip: (page - 1) * limit, // de donde comienza
    take: limit, // cuantos
    where: { userId: user.id }
  });

  return NextResponse.json(todos);
}

const CreateTodoValidation = yup.object({
  description: yup.string().min(3).required(),
  completed: yup.boolean().optional().default(false),
})

export async function POST(request: Request) {
  const body = await request.json()

  const user = await getUserSessionServer()
  if (!user) return NextResponse.json({ message: 'Not authorized' }, { status: 401 })

  try {
    const { completed, description } = await CreateTodoValidation.validate(body);
    const todo = await prisma.todo.create({ data: { completed, description, userId: user.id } })
    return NextResponse.json(todo);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: 'Bad Request', messages: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const user = await getUserSessionServer()
  if (!user) return NextResponse.json({ message: 'Not authorized' }, { status: 401 })

  try {
    await prisma.todo.deleteMany({ where: { completed: true, userId: user.id } })
    return NextResponse.json({ message: 'Deleted completed todos' });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: 'Bad Request', messages: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}