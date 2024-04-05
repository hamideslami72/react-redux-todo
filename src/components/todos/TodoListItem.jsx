import { useState } from "react";
import Delete from "./Delete";
import Update from "./Update";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo } from "../../store/slices/todoSlice";
import { toast } from "react-toastify";



function TodoListItem({todo, changeChecked, updateTodo}){

    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState(false)
    
    const deleteTodoHandler = (todoId) => {
        dispatch(deleteTodo(todoId))
        toast.success('Success Delete Todo')
    }

    const updateTodoHandler = (event, id) => {
        if(event.key ==="Enter"){
        dispatch(editTodo({
            id, 
            title : event.target.value
        }))
        toast.success('Success Update Todo')
        setEditMode(false)
        }
    } 

    return(
        <>
           {
                editMode
                ?   <li className="relative flex items-center justify-between px-2 py-6 border-b">
                        <div className="w-full mr-5">
                            <input 
                                type="text" 
                                defaultValue={todo.title} 
                                onKeyDown={(event) => updateTodoHandler(event , todo.id)}
                                className="w-full p-2 border rounded outline-none border-grey-600"/>
                        </div>
                        <button type="button" className="absolute right-0 flex items-center  space-x-1">
                            <Delete onClick={() => setEditMode(false)} />
                        </button> 
                    </li>
                :   <li className="relative flex items-center justify-between px-2 py-6 border-b">
                    <div>
                        <input type="checkbox" checked={todo?.status} onChange={() => changeChecked(todo)} className="" />
                        <p  className={`inline-block mt-1 ml-2 text-gray-600 ${todo?.status ? `line-through` : `` }`}>{todo?.title}</p>
                    </div>
                    <button type="button" className="absolute right-0 flex items-center  space-x-1">
                        <Update onClick={() => setEditMode(true)}/>
                        <Delete onClick={() => deleteTodoHandler(todo.id)} />
                    </button> 
                </li>

            }
        </>
    )
}

export default TodoListItem;