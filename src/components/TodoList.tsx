import { FC } from "react";
import { useTodosStore } from "../store";
import TodoItem from "./TodoItem";

const TodoList: FC = () => {
  const { todos } = useTodosStore((state) => state);
  console.log(todos);
  return (
    <div>
      {todos.length > 0 &&
        todos.map((item) => (
          <>
            <div className="py-2" key={item.id}>
              <TodoItem key={item.id} item={item} />
            </div>
          </>
        ))}
    </div>
  );
};

export default TodoList;
