import { createContext, useContext, useState } from "react";

const TodosContext = createContext(null);

export const TodosProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    
    const handleChange = (id) => {
        if(todos.length === 0) return;
        //console.log(todos.filter((todo) => todo.id === id)[0].completed);
        fetch('http://localhost:8889/todos/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({completed : !todos.filter((todo) => todo.id === id)[0].completed}),
        }).then(res => res.json())
        .then(updatedTodo => {
            const updatedTodos = todos.map((todo) => {
                if(todo.id === updatedTodo.id){
                    todo.completed = updatedTodo.completed;
                    return todo;
                }
                return todo;
            });
            //console.log(updatedTodos);
            setTodos(updatedTodos);
        });
    }

    const delTodo = (id) => {
        if(todos.length === 0) return;
        fetch('http://localhost:8889/todos/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                },
        })
        .then(() => {
            const updatedTodos = todos.filter((todo) => todo.id !== id);
            setTodos(updatedTodos);
        })
        .catch(err => console.log(err));
    };

    const addTodoItem = (title, userid) => {
        const newTodo = {
            userId: userid,
            title: title,
            completed: false,
        };
        fetch('http://localhost:8889/todos',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(newTodo),
        }).then(res => res.json())
        .then(data => {
            if(data)
                setTodos([...todos, data]);
        })
        .catch(err => console.log(err));
    };

    const updateTodoList = (userid) => {
        if(userid === undefined) return;
        fetch('http://localhost:8889/todos/' + userid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                },
                }).then(res => res.json())
                .then(data => {
                    if(data)
                        setTodos(data);
                });
    };

    const setUpdate = (updatedTitle, id) => {
        if(todos.length === 0) return;
        fetch('http://localhost:8889/todos/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({title : updatedTitle}),
        }).then(res => res.json())
        .then(updatedTodo => {
            const updatedTodos = todos.map((todo) => {
                if(todo.id === updatedTodo.id){
                    todo.title = updatedTodo.title;
                    return todo;
                }
                return todo;
            });
            //console.log(updatedTodos);
            setTodos(updatedTodos);
        })
        .catch(err => console.log(err));
    };

    return (
        <TodosContext.Provider 
            value={{
                todos,
                handleChange,
                delTodo,
                addTodoItem,
                setUpdate,
                updateTodoList,
        }}>
            {children}
        </TodosContext.Provider>
    );
};
export const useTodosContext = () => useContext(TodosContext);