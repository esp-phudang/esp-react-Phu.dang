import React, { useState } from "react";
export interface Props {
  handleAdd: (inputValue:string, id:number) => void;
}
export const Input = ({ handleAdd }:Props) => {
  const [inputValue, setInputValue] = useState("");

  
  return (
    <div className="todos-add-new">
      <input
        id="myInput"
        placeholder="What needs to be done?"
        className="add-new"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={(e) => {
          //defined what key is pressed and if keycode is 13, thats Enter
          if (e.keyCode === 13) {
            document.getElementById("addTodoItem")?.click();
          }
        }}
        value={inputValue}
      />
      <div
        id="addTodoItem"
        onClick={() => {
          const randomNumber = Math.floor(Math.random() * 10000);
          handleAdd(inputValue, randomNumber);
          setInputValue("");
        }}
      >
        Add
      </div>
    </div>
  );
};
