import { FC, useEffect } from "react";
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
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<FormFeilds>({ resolver: zodResolver(schema) });
  useEffect(() => {
    AOS.init();
  }, []);
  useEffect(() => {
    if (errors.todo) console.log(errors.todo?.message);
    if (isSubmitted) {
      resetTodo();
      reset();
    }
  }, [errors, isSubmitted]);
  const onSubmit: SubmitHandler<FormFeilds> = (data) => {
    // console.log(data);
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
    </>
  );
};

export default App;
