import React, { useState, useEffect } from "react";
import { Input } from "./Input";
import SortBar from "./SortBar";
import TodoList from "./TodoList";

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const now = new Date();
//get todoList from localstorage everytime user open page
  useEffect(() => {
    setTodoList(JSON.parse(window.localStorage.getItem("todoList")));
  }, []);

  const updateListAndSaveToLocal = (list) => {
    setTodoList(list);
    window.localStorage.setItem("todoList", JSON.stringify(list));
  };

  const handleAdd = (value, id) => {
    let subTodoList = [
      ...todoList,
      {
        content: value,
        id: String(id),
        status: "unchecked",
        time: now,
      },
    ];
    setTodoList(subTodoList);
    window.localStorage.setItem("todoList", JSON.stringify(subTodoList));
  };

  const handleUpdateEdit = (item) => {
    //get index of edited item in array
    const indexEditedItem = todoList.map((item) => item.id).indexOf(item.id);
    //replace item by edited item
    if (indexEditedItem !== -1) {
      todoList[indexEditedItem] = item;
    }
    setTodoList(todoList);
    window.localStorage.setItem("todoList", JSON.stringify(todoList));
  };

  return (
    <div className="body">
      <div className="todos">
        <div className="todos-title">Todos</div>
        <SortBar handleSort={updateListAndSaveToLocal} todoList={todoList} />
        <Input handleAdd={handleAdd} />
        <TodoList
          onUpdateNewList={updateListAndSaveToLocal}
          handleUpdateChecked={updateListAndSaveToLocal}
          todoList={todoList}
          handleUpdateEdit={handleUpdateEdit}
          handleDelete={updateListAndSaveToLocal}
        />
      </div>
    </div>
  );
};

export default App;
