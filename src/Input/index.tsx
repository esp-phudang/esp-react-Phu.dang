import React, { useState } from "react";
export const Input = (props) => {
  const { handleAdd } = props;
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="todos-add-new">
      <input
        id="myInput"
        placeholder="What needs to be done?"
        className="add-new"
        onChange={(e) => {
          setInputValue(e.target.value);
          console.log(e.target.value);
        }}
        value={inputValue}
      />
      <div
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
