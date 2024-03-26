import React, { FC } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { CiSquareCheck } from "react-icons/ci";
type Todo = {
  text: string;
  isDone: boolean;
  id: number;
};
interface Props {
  item: Todo;
}

const TodoItem: FC<Props> = ({ item }) => {
  return (
    <div className="todo-item">
      <div>
        <p className="text-start mx-2 text-secondary">{item.text}</p>
      </div>
      <div className="d-flex px-1">
        <div className="mr-auto">
        <CiSquareCheck className="icon"/>
          <button  className="btn-hide-background btn-todo-item"> Mark Completed</button>
          
        </div>
        <div className="">
          <button className="btn-hide-background btn-todo-item"><FaRegEdit className="icon"/> Edit</button>
          <button className="btn-hide-background btn-todo-item text-danger"><MdDeleteOutline className="icon"/> Delete</button>
        </div>
      </div>


    </div>
  );
};

export default TodoItem;
