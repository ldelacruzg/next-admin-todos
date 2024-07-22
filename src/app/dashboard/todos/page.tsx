export const dynamic = 'force-dynamic';

import { Metadata } from "next";

import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata: Metadata = {
  title: "Todos Page",
  description: "Todos page description",
}

export default async function TodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } });

  return (
    <div>
      <div>Todos Page</div>
      <NewTodo />
      <TodosGrid todos={todos} />
    </div>
  );
}