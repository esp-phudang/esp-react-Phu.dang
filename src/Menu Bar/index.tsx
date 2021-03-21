import React from "react";

const MenuBar = ({
  todoList,
  handleShowChecked,
  handleShowUnChecked,
  handleShowAll,
}) => {
  const itemLeft = todoList
    .map((item) => item.status)
    .filter((status) => status === "unchecked").length;
  return (
    <div className="menu-bar">
      <div>{itemLeft} item left</div>
      <div onClick={handleShowAll}>All</div>
      <div onClick={handleShowUnChecked}>Active</div>
      <div onClick={handleShowChecked}>Completed</div>
      <div>Clear completed</div>
    </div>
  );
};
export default MenuBar;
