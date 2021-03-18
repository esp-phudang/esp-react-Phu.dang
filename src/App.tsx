import React, { useState, useEffect } from "react";
import { Input } from "./Input";
import TodoList from "./TodoList";

const App = () => {
  const [todoList, setTodoList] = useState([]);
  console.log("reseted");
  const handleSetValue = (value) => {
    let subTodoList = [...todoList, value];
    setTodoList(subTodoList);
    console.log("list", todoList);
  };
  return (
    <div className="body">
      <div className="todos">
        <div className="todos-title">Todos</div>
        <Input handleSetValue={handleSetValue} />
        <TodoList todoList={todoList} />
      </div>
    </div>
  );
};

export default App;
