import { useEffect, useRef, useState } from "react"


export default function CreateTodoInput({addNewTodoHandler}){

    const [newTodoTitle, setNewTodoTitle] = useState('')

    const onInputNewTodoChangeHandler = (event) => {
        setNewTodoTitle(event.target.value)
    }

    const addNewTodo = (event) =>{
        if(event.key ==="Enter" && newTodoTitle != ""){
            addNewTodoHandler(newTodoTitle)
            setNewTodoTitle('')
        }
    }

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    }, [])
    
    return (
        <div className="relative">
            <input type="text" placeholder="What needs to be done today?"
            className="w-full px-2 py-3 border rounded outline-none border-grey-600" 
            onKeyDown={addNewTodo}
            onChange={onInputNewTodoChangeHandler}
            value={newTodoTitle}
            ref={inputRef}
            />
        </div>
    )
}