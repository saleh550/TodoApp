import { FC } from "react";
import { useTodosStore } from "../store";
import TodoItem from "./TodoItem";
import EmptyTasksAlert from "./EmptyTasksAlert";

const TodoList: FC = () => {
  const { todos } = useTodosStore((state) => state);

  return (
    <div>
      {todos.length > 0 ?
        todos.map((item) => (
          <>
            <div className="py-2" key={item.id}>
              <TodoItem key={item.id} item={item} />
            </div>
          </>
        )):(
          <EmptyTasksAlert/>
        )}
    </div>
  );
};

export default TodoList;
