import React, { useState, useEffect } from "react";
import { Input } from "./Input";
import SortBar from "./SortBar";
import TabBar from "./TabBar";
import TodoList from "./TodoList";

const App = () => {
  const [todoObject, setTodoObject] = useState({});
  const [currentTab, setCurrentTab] = useState(`${Object.keys(todoObject)[0]}`);
  const [todoList, setTodoList] = useState(todoObject[currentTab] || []);

  const now = new Date();
  // get todoList from localstorage everytime user open page
  useEffect(() => {
    const localData = JSON.parse(window.localStorage.getItem("todoObject"));
    setTodoObject(localData);
    setCurrentTab(Object.keys(localData)[0]);
    console.log("curret Tab", currentTab);
    setTodoList(localData[Object.keys(localData)[0]]);
  }, []);
  console.log("object", todoObject);

  useEffect(() => {
    console.log("current Tab", currentTab);
  });

  const updateListAndSaveToLocal = (list) => {
    setTodoList(list);
    const updatedTodoObject = { ...todoObject };
    updatedTodoObject[currentTab] = list;
    setTodoObject(updatedTodoObject);

    window.localStorage.setItem(
      "todoObject",
      JSON.stringify(updatedTodoObject)
    );
  };

  const handleAddTab = (todoObject) => {
    setTodoObject(todoObject);
    setCurrentTab(Object.keys(todoObject)[Object.keys(todoObject).length - 1]);
    setTodoList(
      todoObject[
        `${Object.keys(todoObject)[Object.keys(todoObject).length - 1]}`
      ]
    );
    console.log(
      "current Tabb",
      Object.keys(todoObject)[Object.keys(todoObject).length - 1]
    );
    window.localStorage.setItem("todoObject", JSON.stringify(todoObject));
  };

  const setTab = (e) => {
    //set current tab was clicked
    setCurrentTab(e.target.getAttribute("value"));
    //get current data of clicked tab
    const currentTabData = { ...todoObject }[e.target.getAttribute("value")];
    //set todoList as current clicked Data
    console.log("currentData", currentTabData);
    setTodoList(currentTabData);
    window.localStorage.setItem("todoObject", JSON.stringify(todoObject));
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
    const updatedTodoObject = { ...todoObject };
    updatedTodoObject[currentTab] = subTodoList;
    setTodoObject(updatedTodoObject);
    window.localStorage.setItem(
      "todoObject",
      JSON.stringify(updatedTodoObject)
    );
  };

  const handleUpdateEdit = (item) => {
    //get index of edited item in array
    const indexEditedItem = todoList.map((item) => item.id).indexOf(item.id);
    //replace item by edited item
    if (indexEditedItem !== -1) {
      todoList[indexEditedItem] = item;
    }
    setTodoList(todoList);
    const updatedTodoObject = { ...todoObject };
    updatedTodoObject[currentTab] = todoList;
    setTodoObject(updatedTodoObject);
    window.localStorage.setItem(
      "todoObject",
      JSON.stringify(updatedTodoObject)
    );
  };

  return (
    <div className="body">
      <div className="todos">
        <div className="todos-title">Todos</div>
        <div
          onClick={() => {
            localStorage.clear();
            setTodoObject({});
            setTodoList([]);
            console.log("clear");
          }}
        >
          Clear Data
        </div>
        <SortBar handleSort={updateListAndSaveToLocal} todoList={todoList} />
        <TabBar
          todoObject={todoObject}
          handleAddTab={handleAddTab}
          setTab={setTab}
        />
        <div className="todos-main-container">
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
    </div>
  );
};

export default App;
