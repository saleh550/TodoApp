import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { CiSquareCheck } from "react-icons/ci";
import { AiOutlineReload } from "react-icons/ai";
import { useTodosStore } from "../store";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";

const schema = z.object({
  text: z.string().min(3),
});
type FormFeilds = z.infer<typeof schema>;
type Todo = {
  text: string;
  isDone: boolean;
  id: number;
};
interface Props {
  item: Todo;
}

const TodoItem: FC<Props> = ({ item }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormFeilds>({ resolver: zodResolver(schema) });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { deleteTodo, updateTodo } = useTodosStore((state) => state);

  useEffect(() => {
    if (errors.text) {
      toast.error(
        errors.text?.message ? errors.text?.message : "Something Wrong"
      );
    }
    if (isSubmitSuccessful) {
      toast.success("Todo updated successfully");
      setIsEditing(false);
    }
  }, [errors, isSubmitSuccessful]);

  const handleDelete = async () => {
    try {
      deleteTodo(item.id);
      toast.success("Todo deleted successfully");
    } catch (error) {
        toast.error("Todo deleting failed");
    }
  };
  const handleStatus = async () => {
    try {
        updateTodo(item.id, { isDone: !item.isDone });
        toast.success("Todo status updated successfully")
    } catch (error) {
        toast.error("Todo status updating failed")
        
    }
  };
  const onSubmit: SubmitHandler<FormFeilds> = (data) => {
    updateTodo(item.id, data);
  };
  const additionalClasses = item.isDone ? "text-decoration-line-through" : "";
  return (
    <div data-aos="fade-down" className="todo-item">
      {isEditing ? (
        <>
          <div className="edit-form flex">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input {...register("text")} defaultValue={item.text} />
              <button className="text-end mx-2" type="submit">
                Update
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          <div>
            <p
              className={`text-start mx-2 text-secondary ${additionalClasses}`}
            >
              {item.text}
            </p>
          </div>
          <div className="d-flex px-1">
            <div className="mr-auto">
              <button
                onClick={handleStatus}
                className="btn-hide-background btn-todo-item "
              >
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
              <button
                onClick={() => setIsEditing(true)}
                className="btn-hide-background btn-todo-item"
              >
                <FaRegEdit className="icon" /> Edit
              </button>
              <button
                onClick={handleDelete}
                className="btn-hide-background btn-todo-item text-danger"
              >
                <MdDeleteOutline className="icon" /> Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
