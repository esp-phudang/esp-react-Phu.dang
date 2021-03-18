import React from "react";

export default function  (props) {
  const { todoList } = props;
  return (
    <>
      {todoList.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </>
  );
}
