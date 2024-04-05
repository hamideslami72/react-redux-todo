import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CreateTodoInput from './components/todos/CreateTodoInput'
// import TodoListApp from './components/todos/TodoListApp'
import TodoListItem from "./components/todos/TodoListItem";
import { toast } from 'react-toastify';
import { addTodo, fetchData } from './store/slices/todoSlice';


function App() {

  const todos = useSelector((state) => state.todos.list)
  const dispatch = useDispatch()

  const getTodoFromApi = async () => {
    const url = new URL('https://65f2e496105614e6549f327c.mockapi.io/todos');
    url.searchParams.append('order', 'desc');
    let res = await fetch(url);
    let data = await res.json();
    dispatch(fetchData(data))
  }

  useEffect(() => {
      getTodoFromApi();
  }, [])

  const addNewTodoHandler = async (todoTitle) =>{
    try {
      let res = await fetch('https://65f2e496105614e6549f327c.mockapi.io/todos',{
          method: 'POST',
          headers: {'content-type':'application/json'},
          body: JSON.stringify({
              title: todoTitle,
              status: false  
          })
      })
      let todoData = await res.json();
      if(res.ok){
          dispatch(addTodo(todoData))
          toast.success('Success Add Todo')
      }else{
        toast.error(todoData)
      }
    } catch (error) {
        toast.error(error)
    }
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
