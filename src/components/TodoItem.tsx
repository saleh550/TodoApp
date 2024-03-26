import { FC } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { CiSquareCheck } from "react-icons/ci";
import { AiOutlineReload } from "react-icons/ai";
import { useTodosStore } from "../store";
type Todo = {
  text: string;
  isDone: boolean;
  id: number;
};
interface Props {
  item: Todo;
}

const TodoItem: FC<Props> = ({ item }) => {
    const {deleteTodo}=useTodosStore(state=>state)
    const handleDelete=()=>{
        deleteTodo(item.id)
    }
  return (
    <div className="todo-item">
      <div>
        <p className="text-start mx-2 text-secondary">{item.text}</p>
      </div>
      <div className="d-flex px-1">
        <div className="mr-auto">
          <button className="btn-hide-background btn-todo-item">
            {item.isDone ? (
              <>
                <AiOutlineReload className="icon" /> Mark undone
              </>
            ) : (
              <>
                <CiSquareCheck className="icon" /> Mark Completed
              </>
            )}
          </button>
        </div>
        <div className="">
          <button className="btn-hide-background btn-todo-item">
            <FaRegEdit className="icon" /> Edit
          </button>
          <button onClick={handleDelete} className="btn-hide-background btn-todo-item text-danger">
            <MdDeleteOutline className="icon" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
