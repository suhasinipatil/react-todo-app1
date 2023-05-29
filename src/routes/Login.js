import { useEffect, useState } from "react";
import styles from "../components/styles/Login.module.css";
import { useAuthContext } from "context/AuthContext";
import { useTodosContext } from "context/TodosContext";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "components/Header";

const Login = () => {
    const [username, setUsername] = useState('');
    const { login } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.pathname || '/';
    // const { todos } = useTodosContext();
    // console.log(todos);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8889/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username}),
        }).then(res => res.json())
        .then(data => {
            setUsername(data.username);
            if(!username)
                return;
            login(username, data.id);
            setUsername('');
            navigate(from, {replace: true});
        })
        .catch(err => console.log(err));
    }

    return (
        <div>
            <Header>
                <h1>Login</h1>
            </Header>
            <div className={styles.formWrapper}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button>Login</button>
                </form>
            </div>
        </div>
    );
};
export default Login;
