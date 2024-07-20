"use client";

import { Todo } from "@prisma/client"
import { Todoitem } from "./Todoitem"
import { toggleTodoUsecase } from "../services"
import { useRouter } from "next/navigation";

interface Props {
  todos: Todo[]
}

export const TodosGrid = ({ todos = [] }: Props) => {
  const router = useRouter()

  const onToggleTodo = async (id: string, completed: boolean) => {
    await toggleTodoUsecase(id, completed)
    router.refresh()
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {
        todos.map((todo) => (
          <Todoitem key={todo.id} todo={todo} toggleTodo={onToggleTodo} />
        ))
      }
    </div>
  )
}