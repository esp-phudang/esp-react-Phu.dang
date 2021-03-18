import React, { useState } from "react";
export const Input = (props) => {
  const { handleSetValue } = props;
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="add-new-container">
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
          handleSetValue(inputValue);
          setInputValue("")
        }}
      >
        Add
      </div>
    </div>
  );
};
