import React from "react";
import ReactDOM from "react-dom/client";
import './app.css';
import TodoApp from "./components/TodoApp";
import { BrowserRouter } from "react-router-dom";

const domContainer = document.getElementById("root");
const root = ReactDOM.createRoot(domContainer);
root.render(
    <React.Fragment>
        <React.StrictMode>
            <BrowserRouter>
                <TodoApp />
            </BrowserRouter>
        </React.StrictMode>
    </React.Fragment>
);
