import React, { useState, useEffect } from "react";
import { Input } from "./Input";
import SortBar from "./SortBar";
import TodoList from "./TodoList";

const App = () => {
  var current = new Date();
  const [todoList, setTodoList] = useState([]);
  console.log("🚀 ~ file: App.tsx ~ line 9 ~ App ~ todoList", todoList)
  const now = new Date()
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
  const handleUpdateChecked = (updateChecked) => {
    setTodoList(updateChecked);
  };
  const handleSort = (sortedArray)=>{
    setTodoList(sortedArray)
    console.log("App updated: ",sortedArray)

  }
  return (
    <div className="body">
      <div className="todos">
        <div className="todos-title">Todos</div>
        <SortBar handleSort={handleSort} todoList={todoList}/>
        <Input handleAdd={handleAdd} />
        <TodoList
          handleUpdateChecked={handleUpdateChecked}
          todoList={todoList}
          handleUpdateEdit={handleUpdateEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default App;
