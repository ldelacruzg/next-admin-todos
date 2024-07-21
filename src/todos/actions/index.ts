"use server";

import prisma from '@/lib/prisma'
import { Todo } from '@prisma/client'
import { revalidatePath } from 'next/cache';

export const toggleTodo = async (id: string, completed: boolean): Promise<Todo> => {
  const todo = await prisma.todo.findUnique({ where: { id } })

  if (!todo) {
    throw `Todo with id ${id} not found`
  }

  const updateTodo = await prisma.todo.update({
    where: { id },
    data: { completed }
  })

  revalidatePath('/dashboard/server-todos')
  return updateTodo;
}

export const newTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({ data: { description } })
    revalidatePath('/dashboard/server-todos')
    return todo
  } catch (error: any) {
    return { error: true, message: error.message }
  }
}

export const deletedCompletedTodo = async () => {
  try {
    await prisma.todo.deleteMany({ where: { completed: true } })
    revalidatePath('/dashboard/server-todos')
    return { error: false, message: 'Completed todos deleted' }
  } catch (error: any) {
    return { error: true, message: error.message }
  }
}