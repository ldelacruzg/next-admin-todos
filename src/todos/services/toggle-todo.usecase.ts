import { Todo } from "@prisma/client"

export const toggleTodoUsecase = async (id: string, completed: boolean) => {
  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed })
    })

    const data: Todo = await response.json()

    return data
  } catch (error) {
    console.log({ error })
  }
}