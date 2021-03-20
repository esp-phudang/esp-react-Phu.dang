import React, { useState, useEffect } from "react";
import { Input } from "./Input";
import TodoList from "./TodoList";

const App = () => {
  const [todoList, setTodoList] = useState([]);
  console.log("reseted");
  const handleAdd = (value, id) => {
    let subTodoList = [...todoList, { content: value, id: String(id) }];
    setTodoList(subTodoList);
    console.log("list", todoList);
  };
  const handleDelete = (newTodoList) => {
    setTodoList(newTodoList);
  };
  return (
    <div className="body">
      <div className="todos">
        <div className="todos-title">Todos</div>
        <Input handleAdd={handleAdd}  />
        <TodoList todoList={todoList} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default App;
