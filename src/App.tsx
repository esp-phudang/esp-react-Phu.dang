import React, { useState, useEffect } from "react";
import { Input } from "./Input";
import SortBar from "./SortBar";
import TabBar from "./TabBar";
import TodoList from "./TodoList";



function App() {
  const [todoObject, setTodoObject] = useState<any>({});
  const [currentTab, setCurrentTab] = useState<string>(
    `${Object.keys(todoObject)[0]}`
  );
  const [todoList, setTodoList] = useState<Array<TodoItem>>(todoObject[currentTab] || []);

  const now = new Date();
  // get todoList from localstorage everytime user open page
  // useEffect(() => {
  //   const localData = JSON.parse(
  //     window.localStorage.getItem("todoObject") || ""
  //   );
  //   setTodoObject(localData);
  //   setCurrentTab(Object.keys(localData)[0]);
  //   console.log("curret Tab", currentTab);
  //   setTodoList(localData[Object.keys(localData)[0]]);
  // }, []);
  console.log("object", todoObject);

  useEffect(() => {
    console.log("current Tab", currentTab);
  });

  const updateListAndSaveToLocal = (list:TodoItem[]) => {
    setTodoList(list);
    const updatedTodoObject: any = { ...todoObject };
    updatedTodoObject[currentTab] = list;
    setTodoObject(updatedTodoObject);

    window.localStorage.setItem(
      "todoObject",
      JSON.stringify(updatedTodoObject)
    );
  };

  const handleAddTab = (todoObject: { [key: string]: TodoItem[]; }) => {
    setTodoObject(todoObject);
    setCurrentTab(Object.keys(todoObject)[Object.keys(todoObject).length - 1]);
    setTodoList(
      todoObject[`${Object.keys(todoObject)[Object.keys(todoObject).length - 1]}`]
    );
    console.log(
      "current Tabb",
      Object.keys(todoObject)[Object.keys(todoObject).length - 1]
    );
    window.localStorage.setItem("todoObject", JSON.stringify(todoObject));
  };

  const setTab = (e: any) => {
    //set current tab was clicked
    setCurrentTab(e.target.getAttribute("value"));
    //get current data of clicked tab
    const currentTabData = { ...todoObject }[e.target.getAttribute("value")];
    //set todoList as current clicked Data
    console.log("currentData", currentTabData);
    setTodoList(currentTabData);
    window.localStorage.setItem("todoObject", JSON.stringify(todoObject));
  };

  const handleAdd = (value: string, id: number) => {
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
    const updatedTodoObject: any = { ...todoObject };
    updatedTodoObject[currentTab] = subTodoList;
    setTodoObject(updatedTodoObject);
    window.localStorage.setItem(
      "todoObject",
      JSON.stringify(updatedTodoObject)
    );
  };

  const handleUpdateEdit = (item: TodoItem) => {
    //get index of edited item in array
    const indexEditedItem = todoList.map((item: TodoItem) => item.id).indexOf(item.id);
    //replace item by edited item
    if (indexEditedItem !== -1) {
      todoList[indexEditedItem] = item;
    }
    setTodoList(todoList);
    const updatedTodoObject: any = { ...todoObject };
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
          } }
        >
          Clear Data
        </div>
        <TabBar
          currentTab={currentTab}
          todoObject={todoObject}
          handleAddTab={handleAddTab}
          setTab={setTab} />
        <div className="todos-main-container">
          <Input handleAdd={handleAdd} />
          <SortBar handleSort={updateListAndSaveToLocal} todoList={todoList} />
          <TodoList
            onUpdateNewList={updateListAndSaveToLocal}
            handleUpdateChecked={updateListAndSaveToLocal}
            todoList={todoList}
            handleUpdateEdit={handleUpdateEdit}
            handleDelete={updateListAndSaveToLocal} />
        </div>
      </div>
    </div>
  );
}

export default App;

export interface TodoItem {
  content: string | undefined;
  id: string;
  status: string;
  time: Date;
};
