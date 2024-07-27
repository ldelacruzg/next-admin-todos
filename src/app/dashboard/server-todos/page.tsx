export const dynamic = 'force-dynamic';
// export const revalidate = 0;

import { Metadata } from "next";

import prisma from "@/lib/prisma";
import { NewTodoServerAction, TodosGridServerAction } from "@/todos";
import { getUserSessionServer } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Todos Page",
  description: "Todos page description",
}

export default async function ServerTodosPage() {
  const user = await getUserSessionServer()
  if (!user) redirect('/api/auth/signin')

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: 'asc' }
  })

  return (
    <div>
      <div>Todos Page (Server Actions)</div>
      <NewTodoServerAction />
      <TodosGridServerAction todos={todos} />
    </div>
  );
}