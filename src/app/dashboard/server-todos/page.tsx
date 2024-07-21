// export const dynamic = 'force-dynamic';
// export const revalidate = 0;

import { Metadata } from "next";

import prisma from "@/lib/prisma";
import { NewTodoServerAction, TodosGridServerAction } from "@/todos";

export const metadata: Metadata = {
  title: "Todos Page",
  description: "Todos page description",
}

export default async function ServerTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } });

  return (
    <div>
      <div>Todos Page (Server Actions)</div>
      <NewTodoServerAction />
      <TodosGridServerAction todos={todos} />
    </div>
  );
}