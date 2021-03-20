import React, { useState } from "react";

export default function TodoList({ todoList, handleDelete }) {
  const [checkList, setCheckList] = useState([]);
  //add item id to check List
  const onCheck = (e) => {
    let subCheckList = [];
    //check whether that id is in checklist or not
    //if yes, remove id from checklist
    if (checkList.includes(e.target.id)) {
      setCheckList(checkList.filter((item) => item !== e.target.id));
      document.getElementById(`No ${e.target.id}`).classList.remove("checked");
      console.log("todoList", todoList);
    } 
    //if no, add id to check list
    else {
      subCheckList = [...checkList, e.target.id];
      setCheckList(subCheckList);
      console.log("todoList", todoList);
    }
  };
  //for each item on checkList, add class Check to change css
  checkList.forEach((element) => {
    document.getElementById(`No ${element}`).classList.add("checked");
  });
  const onDelete = (deleteItem) => {
    //get the index of deleted item
    const deleteId = todoList
      .map((item) => item.id)
      .indexOf(deleteItem.target.id);
    //get deleted item
    const deletedItem = todoList[deleteId];
    //trigger function with new array not including deleted item
    handleDelete(todoList.filter((item) => item !== deletedItem));
  };
  return (
    <>
      {todoList.map((item) => {
        return (
          <div className="todos-item" key={item.id}>
            <svg
              id={item.id}
              height="34"
              width="34"
              onClick={(e) => {
                onCheck(e);
              }}
            >
              <circle
                cx="17"
                cy="17"
                r="15"
                stroke="black"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <input id={`No ${item.id}`} value={item.content} />
            <div
              id={item.id}
              onClick={(e) => {
                onDelete(e);
              }}
            >
              Delete
            </div>
          </div>
        );
      })}
    </>
  );
}
