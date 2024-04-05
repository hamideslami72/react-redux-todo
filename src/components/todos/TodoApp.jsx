import { useEffect, useReducer, useState } from "react";
import TodoListApp from "./TodoListApp";
import CreateTodoInput from "./CreateTodoInput";
import { toast } from 'react-toastify';
import todoReducer from "../../reducers/todoReducer";

function TodoApp({todoSetting}) {

    // const [todoListItem, setTodoListItem] = useState([]) 

    const [todoListItem, todoDispatcher] = useReducer(todoReducer ,[])

    const addNewTodoHandler = async (todoTitle) =>{
        try {
            let res = await fetch('https://65f2e496105614e6549f327c.mockapi.io/todos',{
                method: 'POST',
                headers: {'content-type':'application/json'},
                body: JSON.stringify({
                    title: todoTitle,
                    state: false  
                })
            })

            let todoData = await res.json();
           
            if(res.ok){
                todoDispatcher({
                    type: 'add-todo',
                    id: todoData?.id,
                    title: todoData?.title,
                    state: todoData?.state
                })
                toast.success("Success Updated.")
            }

            toast.error(todoData)

        } catch (error) {
            toast.error(error)
        }
    }

    const deleteTodo = async (todo) => {
        let url = `https://65f2e496105614e6549f327c.mockapi.io/todos/${todo?.id}`
        try {
            let res = await fetch(url, {
                method: 'DELETE',
            })

            if (res.ok) {
                let data = todoListItem.filter( (item) => {
                    return todo.id != item.id 
                })
                todoDispatcher({
                    type: 'delete-todo',
                    data
                })
                toast.success('Success Delete')
            }
            
            let message = await res.json()
            toast.error(message)

        } catch (error) {
            toast.error(error)
        }
        
    }

    const updateTodo = async (todo, newTodoTitle) => {
        let url = `https://65f2e496105614e6549f327c.mockapi.io/todos/${todo?.id}`
        try {
            let res = await fetch(url, {
                method: 'PUT',
                headers: {'content-type':'application/json'},
                body: JSON.stringify({title: newTodoTitle})
            })

            if (res.ok) {
                let data = todoListItem.map((todoItem) => {
                    if(todo.id === todoItem.id){
                        todoItem.title = newTodoTitle
                    }
                    return todoItem
                })
                todoDispatcher({
                    type: 'update-todo',
                    data
                })
                toast.success("Success Updated.")
            }

            let message = await res.json()
            toast.error(message)

        } catch (error) {
            toast.error(error)
        }
    } 

    const onChangeCheckedHandler = async (todo) => {
        let url = `https://65f2e496105614e6549f327c.mockapi.io/todos/${todo?.id}`
        try {
            let res = await fetch(url, {
                method: 'PUT',
                headers: {'content-type':'application/json'},
                body: JSON.stringify({state: !todo.state})
            })

            if (res.ok) {
                let data = todoListItem.map((todoItem) => {
                    if(todo.id === todoItem.id){
                        todoItem.state = !todoItem.state
                    }
                    return todoItem
                })
                todoDispatcher({
                    type: 'toggle-check-todo',
                    data
                })
                toast.info("Success Updated.")
            }

            let message = await res.json()
            toast.error(message)

        } catch (error) {
            console.log(error)
        }

    }

    const getTodoFromApi = async () => {
        const url = new URL('https://65f2e496105614e6549f327c.mockapi.io/todos');
        url.searchParams.append('order', 'desc');
        let res = await fetch(url);
        let data = await res.json();
        todoDispatcher({
            type: 'initial-list',
            data
        })
    }

    useEffect(() => {
        getTodoFromApi();
    }, [])

  return (
    
        <div className="flex items-center justify-center h-screen">
            <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white">
                <div className="flex items-center mb-6">
                    <h1 className="mr-6 text-4xl font-bold text-purple-600"> {todoSetting.title}</h1>
                </div>
                <CreateTodoInput addNewTodoHandler={addNewTodoHandler} />
                <TodoListApp key={todoListItem.id} todos={todoListItem} deleteTodo={deleteTodo} changeChecked={onChangeCheckedHandler} updateTodo={updateTodo} />
                
            </div>
        </div>
  );
}

export default TodoApp;