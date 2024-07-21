"use client";

import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { deletedCompletedTodo, newTodo } from "../actions";

export const NewTodoServerAction = () => {
  const [description, setDescription] = useState('')

  const onCreateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!description) return

    await newTodo(description)
    setDescription('')
  }

  // const onDeleteCompletedTodos = async () => {
  //   await deleteCompletedTodosUsecase()
  //   router.refresh()
  // }

  return (
    <form className="flex place-content-between py-4" onSubmit={onCreateTodo}>
      <div className="flex">
        <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" className="rounded-lg focus:border-sky-500 outline-none transition-all items-center justify-center px-4" placeholder="¿Qué necesita ser hecho?" />

        <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
          Crear
        </button>
      </div>

      <button
        onClick={() => deletedCompletedTodo()}
        type='button' className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
        <IoTrashOutline />
        Delete completed
      </button>
    </form>
  )
}