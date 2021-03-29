import React, { useState } from "react";
import { TodoItem } from "../App";
export interface Props {
  todoList: Array<TodoItem>;
  handleShowChecked: () => void;
  handleShowUnChecked: () => void;
  handleShowAll: () => void;
}
const MenuBar = ({
  todoList,
  handleShowChecked,
  handleShowUnChecked,
  handleShowAll,
}: Props) => {
  const [sortType, setSortType] = useState("");
  const sort = (e: any) => {
    setSortType(e.target.id);
  };
  const itemLeft = todoList
    ? todoList
        .map((item) => item.status)
        .filter((status: string) => status === "unchecked").length
    : "";
  return (
    <div className="menu-bar">
      <div>{itemLeft} item left</div>
      <div
        id="all"
        onClick={(e) => {
          sort(e);
          handleShowAll();
        }}
        className={sortType === "" ? "sorted" : ""}
      >
        All
      </div>
      <div
        id="active"
        onClick={(e) => {
          sort(e);
          handleShowUnChecked();
        }}
        className={sortType === "active" ? "sorted" : ""}
      >
        Active
      </div>
      <div
        id="completed"
        onClick={(e) => {
          sort(e);
          handleShowChecked();
        }}
        className={sortType === "completed" ? "sorted" : ""}
      >
        Completed
      </div>
      <div>Clear completed</div>
    </div>
  );
};
export default MenuBar;
