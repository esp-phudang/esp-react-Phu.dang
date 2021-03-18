import React, { useState } from "react";

export default function TodoList({ todoList }) {
  const [checkList, setCheckList] = useState([]);

  checkList.forEach((element) => {
    document.getElementById(`item ${element}`).classList.add("checked");
  });
  const onCheck = (e) => {
    let subCheckList = [];
    if (!checkList.includes(e.target.id)) {
      subCheckList = [...checkList, e.target.id];
      setCheckList(subCheckList);
    } else {
      setCheckList(checkList.filter((item) => item !== e.target.id));
      document.getElementById(`item ${e.target.id}`).classList.remove("checked");

    }
  };
  return (
    <>
      {todoList.map((item, index) => {
        return (
          <div className="todos-item" key={index}>
            <svg
              id={index}
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
                stroke-width="2"
                fill="none"
              />
            </svg>
            <div id={`item ${index}`}>{item}</div>
          </div>
        );
      })}
    </>
  );
}
