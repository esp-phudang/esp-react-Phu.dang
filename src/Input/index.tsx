import React, { useState, useEffect } from "react";
export const Input = (props) => {
  const { handleAdd } = props;
  const [inputValue, setInputValue] = useState("");
  const input = document.getElementById("myInput");

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
            document.getElementById("myBtn").click();
          }
        }}
        value={inputValue}
      />
      <div
        id="myBtn"
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
