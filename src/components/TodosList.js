import TodoItem from "./TodoItem";
import { useTodosContext } from "../context/TodosContext";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

const TodosList = () => {
    const { todos } = useTodosContext();
    const { updateTodoList } = useTodosContext();
    const { currentUser } = useAuthContext();
    
    useEffect(() => {
        updateTodoList(currentUser.id);
    }, [currentUser.id]);

    return(
        <ul>
            {todos && todos.length !== 0 && todos.map((todo) => (
                <TodoItem key={todo.id} itemProp={todo}/>
            ))}
        </ul>
    );
};
export default TodosList;