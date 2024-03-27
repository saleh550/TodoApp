
import { create } from "zustand";
type Todo={
    text:string,
    isDone:boolean,
    id:number
}
type todoStore = {
  todo: Todo
  updateTodo: (data: string) => void;
  resetTodo:()=>void;
};
type todosStore={
    todos:Todo[]
    addTodo:(data:Todo)=>void,
    deleteTodo:(id:number)=>void
    updateTodo:(id:number,updatedData: Partial<Todo>)=>void
}
export const useTodoStore = create<todoStore>((set) => ({
  todo:{text:"",isDone:false,id:Date.now()},
  updateTodo: (data) => {
    set((state)=>({...state,todo:{text:data,isDone:false,id:Date.now()}}))// its will be changed when update todo by user
  },
  resetTodo:()=>{
    set({todo:{text:"",isDone:false,id:Date.now()}})
  }
}));

export const useTodosStore = create<todosStore>((set) => ({
    todos:[],
    addTodo:(data:Todo)=>{
        set((state) => ({
            todos: [...state.todos, data],
          }));
    },
    deleteTodo:(id)=>{
      try {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      } catch (error) {
        throw new Error("Deleted Failed")
      }

    },
    updateTodo:(id:number, updatedData: Partial<Todo>)=>{
      set((state) => ({
        todos: state.todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, ...updatedData };
          }
          return todo;
        }),
      }));
 
    }
    
  }));
