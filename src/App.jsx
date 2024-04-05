import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CreateTodoInput from './components/todos/CreateTodoInput'
// import TodoListApp from './components/todos/TodoListApp'
import TodoListItem from "./components/todos/TodoListItem";
import { toast } from 'react-toastify';
import { addTodo } from './store/slices/todoSlice';


function App() {

  const todos = useSelector((state) => state.todos.value)
  const dispatch = useDispatch()

  const [todoListItem, setTodoListItem] = useState([
    {
      "title": "title 2",
      "status": false,
      "id": "2"
    },
  ])

  let id = 2
  const addNewTodoHandler = async (todoTitle) =>{
    dispatch(addTodo({
        id,
        title : todoTitle,
        status: false
    }))
    id++
      /*try {
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
              setTodoListItem([
                ...todoListItem,
                todoData
              ])
              toast.success("Success Updated.")
          }

          toast.error(todoData)

      } catch (error) {
          toast.error(error)
      }
      */
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
              setTodoListItem({
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
              setTodoListItem({
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
              setTodoListItem({
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
      setTodoListItem([
        ...todoListItem,
        data
      ])
  }

  useEffect(() => {
      // getTodoFromApi();
  }, [])

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
                        deleteTodo={deleteTodo} 
                        changeChecked={onChangeCheckedHandler} 
                        updateTodo={updateTodo} 
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
