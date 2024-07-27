export const dynamic = 'force-dynamic';

import { Metadata } from "next";

import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { getUserSessionServer } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Todos Page",
  description: "Todos page description",
}

export default async function TodosPage() {
  const user = await getUserSessionServer()
  if (!user) redirect('/api/auth/signin')

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: 'asc' }
  })

  return (
    <div>
      <div>Todos Page</div>
      <NewTodo />
      <TodosGrid todos={todos} />
    </div>
  );
}