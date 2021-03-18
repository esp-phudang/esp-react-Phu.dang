import React from "react";

export default function TodoList({ todoList }) {
  return (
    <>
      {todoList.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </>
  );
}
