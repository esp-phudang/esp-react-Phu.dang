import React from "react";

const MenuBar = ({ handleShowChecked, handleShowUnChecked, handleShowAll }) => {
  return (
    <div className="menu-bar">
      <div>1 item left</div>
      <div onClick={handleShowAll}>All</div>
      <div onClick={handleShowUnChecked}>Active</div>
      <div onClick={handleShowChecked}>Completed</div>
      <div>Clear completed</div>
    </div>
  );
};
export default MenuBar;
