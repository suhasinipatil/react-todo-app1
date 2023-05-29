import React from "react";
import Header from "../components/Header.js";
import TodosLogic from "../components/TodosLogic.js";

const Home = () => {
    return (
        //<div className="wrapper">
          <div className="todos">
            <Header>
              <h1>todos</h1>
              <p>Items will persist in the browser local storage</p>
            </Header>
            <TodosLogic/>
          </div>
        //</div>
    );
  };
  export default Home;