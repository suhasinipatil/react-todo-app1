import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [currentUser, setCurrentUser] = useState({username: '', id: -1});

    const login = (currentuser, currentuserId) => {
        const newUser = {...user, username: currentuser, id: currentuserId};
        setCurrentUser(newUser);
        setUser(currentuser);
    };

    const logout = () => {
        setUser(null);
        setCurrentUser({username: '', id: -1});
    }

    function getUsername() {
        const temp = localStorage.getItem('username');
        const savedUsername = JSON.parse(temp);
        return savedUsername || '';
    }
    useEffect(() => {
        const temp = JSON.stringify(user);
        localStorage.setItem('username', temp);
    }, [user]);

    return (
        <AuthContext.Provider value={{user, currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuthContext = () => useContext(AuthContext);