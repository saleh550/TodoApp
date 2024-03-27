import  { FC } from 'react'
import { LuListTodo } from "react-icons/lu";
const EmptyTasksAlert:FC = () => {
  return (
    <div className='empty-alert todo-item'>
        <LuListTodo className='alert-icon'/>
     <h3> You have nothing to do!</h3>
    </div>
  )
}

export default EmptyTasksAlert
