import { Todo } from "@prisma/client"

export const createTodoUsecase = async (description: string) => {
  try {
    const response = await fetch(`/api/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description })
    })

    const data: Todo = await response.json()

    return data
  } catch (error) {
    console.log({ error })
  }
}