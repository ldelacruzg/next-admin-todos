import { NextResponse } from "next/server"
import * as yup from 'yup'

import prisma from "@/lib/prisma"
import { getUserSessionServer } from "@/auth"

interface RouteSegments {
  params: {
    id: string
  }
}

export async function GET(_: Request, segments: RouteSegments) {
  const { id } = segments.params
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

  if (!isUuid.test(id)) {
    return NextResponse.json({
      error: 'Bad Request',
      message: 'Invalid id'
    }, { status: 400 })
  }

  const user = await getUserSessionServer()
  if (!user) {
    return NextResponse.json({
      message: 'Not authorized'
    }, { status: 401 })
  }

  const todo = await prisma.todo.findUnique({
    where: { id, userId: user.id }
  })

  if (!todo) {
    return NextResponse.json({
      error: 'Not Found',
      message: `Todo with id ${id} not found`
    }, { status: 404 })
  }

  return NextResponse.json(todo)
}

const UpdateTodoValidation = yup.object({
  description: yup.string().min(3).optional(),
  completed: yup.boolean().optional(),
})

export async function PUT(request: Request, segments: RouteSegments) {
  const { id } = segments.params
  const body = await request.json();

  try {
    //? Valid id
    const idValid = await yup.string().uuid().isValid(id)
    if (!idValid) {
      return NextResponse.json({
        error: 'Bad Request',
        message: 'Invalid id'
      }, { status: 400 })
    }

    //? Valid body
    const bodyValid = await UpdateTodoValidation.validate(body)

    //? Valid User Session
    const user = await getUserSessionServer()
    if (!user) {
      return NextResponse.json(
        { message: 'Not authorized' },
        { status: 401 }
      )
    }

    //? Find todo
    const todo = await prisma.todo.findUnique({
      where: { id, userId: user.id }
    })

    if (!todo) {
      return NextResponse.json({
        error: 'Not Found',
        message: `Todo with id ${id} not found`
      }, { status: 404 })
    }

    //? Update todo
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: bodyValid
    })

    return NextResponse.json(updatedTodo)
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: 'Bad Request', messages: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}