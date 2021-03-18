import React, { useState, useEffect } from "react";
import { Input } from "./Input";
import TodoList from "./TodoList";

const App = () => {
  const [value, setValue] = useState("");
  const todoList = [];
  console.log("reseted");
  const handleSetValue = (value) => {
    console.log(value);
    todoList.push(value);
    console.log("todoList", todoList);
  };
  return (
    <div className="body">
      <div className="container">
        <div className="todos">Todos</div>
        <Input handleSetValue={handleSetValue} value={value} />
        <TodoList todoList={todoList} />

        <div>asda</div>
      </div>
    </div>
  );
};

export default App;
