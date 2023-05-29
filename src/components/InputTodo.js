import { useState } from "react";
import { useTodosContext } from "context/TodosContext";
import { FaPlusCircle } from "react-icons/fa";
import { useAuthContext } from "context/AuthContext";

const InputTodo = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const { addTodoItem } = useTodosContext();
    const { currentUser } = useAuthContext();

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(title.trim()){
            //console.log("id " + currentUser.id);
            //console.log("user " + currentUser.username);
            addTodoItem(title, currentUser.id);
            setTitle('');
            setMessage('');
        }else{
            setMessage('Please add item');
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit} className="form-container">
            <input type="text" placeholder="Add Todo.." value={title} onChange={handleChange} className="input-text"/>
            <button className="input-submit">
                <FaPlusCircle
                    style={{
                        color: '#5e5e5e',
                        fontSize: '20px',
                        marginTop: '2px',
                    }}
                />
            </button>
        </form>
        <span className="submit-warning">{message}</span>
        </>
    );
};
export default InputTodo;