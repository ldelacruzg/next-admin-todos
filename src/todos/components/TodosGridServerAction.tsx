import { Todo } from "@prisma/client"
import { toggleTodo } from "../actions";
import { TodoItemOp } from "./TodoItemOp";

interface Props {
  todos: Todo[]
}

export const TodosGridServerAction = ({ todos = [] }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {
        todos.map((todo) => (
          <TodoItemOp key={todo.id} todo={todo} toggleTodo={toggleTodo} />
        ))
      }
    </div>
  )
}