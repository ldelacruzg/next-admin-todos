"use client";

import { startTransition, useOptimistic } from "react";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import { Todo } from "@prisma/client"

import style from './TodoItem.module.css'

interface Props {
  todo: Todo;
  toggleTodo: (id: string, completed: boolean) => void;
}

export const TodoItemOp = ({ todo, toggleTodo }: Props) => {

  const [todoItem, toggleTodoItem] = useOptimistic(
    todo,
    (state, completed: boolean) => ({ ...state, completed })
  )

  const ontoggleTodo = () => {
    try {
      startTransition(() => toggleTodoItem(!todoItem.completed))
      toggleTodo(todoItem.id, !todoItem.completed)
    } catch (error) {
      startTransition(() => toggleTodoItem(!todoItem.completed))
    }
  }

  return (
    <div className={todoItem.completed ? style.todoDone : style.todoPending}>
      <div className="flex items-center gap-4">
        <div
          onClick={ontoggleTodo}
          className={`
            flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 
            ${todoItem.completed ? "bg-blue-100" : "bg-red-100"}`}>
          {
            todoItem.completed
              ? (<IoCheckboxOutline size={30} />)
              : (<IoSquareOutline size={30} />)
          }
        </div>
        <div className="text-center sm:text-left">
          {todoItem.description}
        </div>
      </div>
    </div>
  )
}