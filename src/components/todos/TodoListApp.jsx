import TodoListItem from "./TodoListItem";

function TodoListApp({todos, deleteTodo, changeChecked, updateTodo}){

    return(
        <>
            <ul className="list-reset">
                { todos.map((item) => ( <TodoListItem key={item.id} todo={item} deleteTodo={deleteTodo} changeChecked={changeChecked} updateTodo={updateTodo} />)) }
            </ul>
        </>
    ) 
}

export default TodoListApp;