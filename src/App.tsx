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

  const handleUpdateEdit = (item) => {
    //get index of edited item in array
    const indexEditedItem = todoList.map((item) => item.id).indexOf(item.id);
    //replace item by edited item
    if (indexEditedItem !== -1) {
      todoList[indexEditedItem] = item;
    }
    setTodoList(todoList);
  };
  return (
    <div className="body">
      <div className="todos">
        <div className="todos-title">Todos</div>
        <Input handleAdd={handleAdd} />
        <TodoList
          todoList={todoList}
          handleUpdateEdit={handleUpdateEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default App;
