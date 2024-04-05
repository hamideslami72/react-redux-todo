import { useState } from "react";
import Delete from "./Delete";
import Update from "./Update";



function TodoListItem({todo, deleteTodo, changeChecked, updateTodo}){

    const [editMode, setEditMode] = useState(false)

    const updateTodoHandler = (event, todo) => {
        if(event.key ==="Enter"){
            updateTodo(todo, event.target.value)
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
                                onKeyDown={(event) => updateTodoHandler(event , todo)}
                                className="w-full p-2 border rounded outline-none border-grey-600"/>
                        </div>
                        <button type="button" className="absolute right-0 flex items-center  space-x-1">
                            <Delete onClick={() => setEditMode(false)} />
                        </button> 
                    </li>
                :   <li className="relative flex items-center justify-between px-2 py-6 border-b">
                    <div>
                        <input type="checkbox" checked={todo?.state} onChange={() => changeChecked(todo)} className="" />
                        <p  className={`inline-block mt-1 ml-2 text-gray-600 ${todo?.state ? `line-through` : `` }`}>{todo?.title}</p>
                    </div>
                    <button type="button" className="absolute right-0 flex items-center  space-x-1">
                        <Update onClick={() => setEditMode(true)}/>
                        <Delete onClick={() => deleteTodo(todo)} />
                    </button> 
                </li>

            }
        </>
    )
}

export default TodoListItem;