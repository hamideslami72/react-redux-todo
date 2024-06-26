import { useState } from "react";
import Delete from "./Delete";
import Update from "./Update";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo, changeChecked } from "../../store/slices/todoSlice";
import { toast } from "react-toastify";



function TodoListItem({todo}){

    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState(false)
    
    const deleteTodoHandler = async (todoId) => {
        let url = `https://65f2e496105614e6549f327c.mockapi.io/todos/${todoId}`
        try {
            let res = await fetch(url, {
                method: 'DELETE',
            })
            if (res.ok) {
                dispatch(deleteTodo(todoId))
                toast.success('Success Delete Todo')
            }else{
                let message = await res.json()
                toast.error(message)
            }
        } catch (error) {
            toast.error(error)
        }
    }

    const updateTodoHandler = async (event, id) => {
        if(event.key ==="Enter"){
            let url = `https://65f2e496105614e6549f327c.mockapi.io/todos/${id}`
            try {
                let res = await fetch(url, {
                    method: 'PUT',
                    headers: {'content-type':'application/json'},
                    body: JSON.stringify({title: event.target.value})
                })

                if (res.ok) {
                    dispatch(editTodo({
                        id, 
                        title : event.target.value
                    }))
                    toast.success('Success Update Todo')
                    setEditMode(false)
                }else{
                    let message = await res.json()
                    toast.error(message)
                }
            } catch (error) {
                toast.error(error)
            }
        }
    } 

    const changeCheckedHandler = async ( todo ) => {
        let url = `https://65f2e496105614e6549f327c.mockapi.io/todos/${todo?.id}`
        try {
            let res = await fetch(url, {
                method: 'PUT',
                headers: {'content-type':'application/json'},
                body: JSON.stringify({status: !todo.status})
            })

            if (res.ok) {
                dispatch(changeChecked(todo?.id))
                toast.success('Success Update Todo')
            }else{
                let message = await res.json()
                toast.error(message)
            }
        } catch (error) {
            console.log(error)
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
                        <input type="checkbox" checked={todo?.status} onChange={() => changeCheckedHandler(todo)} className="" />
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