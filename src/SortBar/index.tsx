import React, { useState } from "react";
import { TodoItem } from "../App";
export interface Props {
  handleSort: (list: TodoItem[]) => void;
  todoList: Array<TodoItem>;
}

const SortBar =  ({ handleSort, todoList }: Props) => {
  const [alphabet, setAlphabet] = useState(true);
  const [time, setTime] = useState(true);

  const sortByAlphabet = () => {
    setAlphabet(!alphabet);

    const sortedArray = [...todoList].sort((a, b) => {
      const contentA = a.content?.toUpperCase() || "";
      const contentB = b.content?.toUpperCase() || "";
      if (alphabet) {
        return contentA < contentB ? 1 : -1;
      } else {
        return contentA < contentB ? -1 : 1;
      }
    });
    handleSort(sortedArray);
  };

  const sortByCreatedTime = () => {
    setTime(!time);
    const sortedArray = [...todoList].sort((a, b) => {
      if (a.time > b.time) {
        return time ? 1 : -1;
      } else {
        return time ? -1 : 1;
      }
    });
    handleSort(sortedArray);
  };

  return (
    <div className="sort-bar">
      <div>Status</div>
      <div onClick={sortByAlphabet}>
        {alphabet ? "Sort A to Z" : "Sort Z to A"}
      </div>
      <div onClick={sortByCreatedTime}>
        {time ? "Sort newest" : "Sort oldest"}
      </div>
      <div />
      <div />
    </div>
  );
};

export default SortBar;
