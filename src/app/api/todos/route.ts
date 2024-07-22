import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"
import * as yup from 'yup';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = Number(searchParams.get('take') ?? '10')
  const page = Number(searchParams.get('skip') ?? '1')

  if (isNaN(limit) || isNaN(page)) {
    return NextResponse.json({
      error: 'Bad Request',
      message: 'Invalid limit or page query'
    }, { status: 400 });
  }

  const todos = await prisma.todo.findMany({
    skip: (page - 1) * limit, // de donde comienza
    take: limit, // cuantos
  });

  return NextResponse.json(todos);
}

const CreateTodoValidation = yup.object({
  description: yup.string().min(3).required(),
  completed: yup.boolean().optional().default(false),
})

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const { completed, description } = await CreateTodoValidation.validate(body);
    const todo = await prisma.todo.create({ data: { completed, description } })
    return NextResponse.json(todo);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: 'Bad Request', messages: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await prisma.todo.deleteMany({ where: { completed: true } })
    return NextResponse.json({ message: 'Deleted completed todos' });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: 'Bad Request', messages: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}