import { FC, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTodoStore, useTodosStore } from "./store";
import TodoList from "./components/TodoList";
import AOS from "aos";
import "aos/dist/aos.css";

const schema = z.object({
  todo: z.string().min(3),
});
type FormFeilds = z.infer<typeof schema>;

const App: FC = () => {
  const { todo, updateTodo, resetTodo } = useTodoStore((state) => state);
  const { addTodo } = useTodosStore((state) => state);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<FormFeilds>({ resolver: zodResolver(schema) });
  useEffect(() => {
    AOS.init();
  }, []);
  useEffect(() => {
    if (errors.todo) {
      if (todo.text == "") {
        toast.error("Todo field can't be empty !");
      } else {
        toast.error(
          errors.todo.message ? errors.todo.message : "Somthing Wrong"
        );
      }
    }
    if (isSubmitSuccessful) {
      toast.success("todo added successfully");
      resetTodo();
      reset();
    }
  }, [errors, isSubmitSuccessful]);
  const onSubmit: SubmitHandler<FormFeilds> = () => {
    addTodo(todo);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    updateTodo(e.target.value);
  };
  return (
    <>
      <div>
        <div className="m-1 mt-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="home-input mx-2"
              {...register("todo")}
              type="text"
              placeholder="Start typing ..."
              onChange={handleInputChange}
            />
            <button
              className="submit-button"
              disabled={isSubmitting}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        <TodoList />
      </div>
      <Toaster position="bottom-center" reverseOrder={true} />
    </>
  );
};

export default App;
