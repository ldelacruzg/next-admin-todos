'use client';

import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { createTodoUsecase, deleteCompletedTodosUsecase } from "../services";
import { useRouter } from "next/navigation";

export const NewTodo = () => {
  const router = useRouter()
  const [description, setDescription] = useState('')

  const onCreateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!description) return

    await createTodoUsecase(description)
    setDescription('')
    router.refresh()
  }

  const onDeleteCompletedTodos = async () => {
    await deleteCompletedTodosUsecase()
    router.refresh()
  }

  return (
    <form className="flex place-content-between py-4" onSubmit={onCreateTodo}>
      <div className="flex">
        <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" className="rounded-lg focus:border-sky-500 outline-none transition-all items-center justify-center px-4" placeholder="¿Qué necesita ser hecho?" />

        <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
          Crear
        </button>
      </div>

      <button
        onClick={onDeleteCompletedTodos}
        type='button' className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
        <IoTrashOutline />
        Delete completed
      </button>
    </form>
  )
}