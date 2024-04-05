import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CreateTodoInput from './components/todos/CreateTodoInput'
// import TodoListApp from './components/todos/TodoListApp'
import TodoListItem from "./components/todos/TodoListItem";
import { toast } from 'react-toastify';
import { addTodo } from './store/slices/todoSlice';


function App() {

  const todos = useSelector((state) => state.todos.list)
  const dispatch = useDispatch()
  let id = todos.length

  const addNewTodoHandler = (todoTitle) =>{
    id += 1
    dispatch(addTodo({
        id,
        title : todoTitle,
        status: false
    }))
    toast.success('Success Add Todo')
  }

  return (
    <>
      <div className="bg-gray-100 pt-5">
        <div className="flex items-center justify-center h-screen">
              <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white">
                  <div className="flex items-center mb-6">
                      <h1 className="mr-6 text-4xl font-bold text-purple-600"> Todos</h1>
                  </div>
                  <CreateTodoInput addNewTodoHandler={addNewTodoHandler} />
                  <ul className="list-reset">
                    { todos.map((item) => ( 
                      <TodoListItem 
                        key={item.id} 
                        todo={item}                
                      />
                    )) }
                </ul>
              </div>
          </div>
      </div>
    </>
  )
}

export default App
