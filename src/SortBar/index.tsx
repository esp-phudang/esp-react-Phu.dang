import moment from "moment";
import React, { useState } from "react";

const SortBar = ({ handleSort, todoList }) => {
  const [alphabet, setAlphabet] = useState(true);
  const [time, setTime] = useState(true);
  console.log("🚀 ~ file: index.tsx ~ line 7 ~ SortBar ~ time", time)

  const sortByAlphabet = () => {
    setAlphabet(!alphabet);

    const sortedArray = [...todoList].sort((a, b) => {
      const contentA = a.content.toUpperCase();
      const contentB = b.content.toUpperCase();
      if (alphabet) {
        return contentA < contentB ? 1 : -1;
      } else {
        return contentA < contentB ? -1 : 1;
      }
    });
    console.log("todoList: ", todoList);
    handleSort(sortedArray);
  };

  const sortByCreatedTime = () => {
    setTime(!time);
    const sortedArray = [...todoList].sort((a, b) =>
      time ? a.time - b.time : b.time - a.time
    );
    handleSort(sortedArray);
    console.log("todoList: ", todoList);

  };

  return (
    <div style={{ display: "flex" }}>
      <div onClick={sortByAlphabet}>{alphabet ? "A to B" : "B to A"}</div>
      <div onClick={sortByCreatedTime}>{time ? "latest" : "oldest"}</div>
    </div>
  );
};

export default SortBar;
