import React, { useState, useEffect } from "react";
import MenuBar from "../Menu Bar";

export default function TodoList({
  todoList,
  handleDelete,
  handleUpdateEdit,
  handleUpdateChecked,
}) {
  const [editContent, setEditContent] = useState();
  const [editId, setEditId] = useState();
  const [filterState, setFilterState] = useState();
  useEffect(() => {
    console.log("todoList", todoList);
  }, [todoList]);
  //add item id to check List
  const onCheck = (e) => {
    const checkedId = e.target.id;
    const checkedIndex = todoList.map((item) => item.id).indexOf(checkedId);
    // I used subTodoList = todoList but it is shallow copy so todoList's items
    //will change value right after revalue item of subTodoList
    //=> not trigger rerender
    // using deep copy instead with JSON parse, stringify
    const subTodoList = JSON.parse(JSON.stringify(todoList));
    if (subTodoList[checkedIndex].status === "unchecked") {
      subTodoList[checkedIndex].status = "checked";
    } else if (subTodoList[checkedIndex].status === "checked") {
      subTodoList[checkedIndex].status = "unchecked";
    }
    handleUpdateChecked(subTodoList);
  };

  const onDelete = (deleteItem) => {
    //get the index of deleted item
    const deleteId = todoList
      .map((item) => item.id)
      .indexOf(deleteItem.target.id);
    //get deleted item
    const deletedItem = todoList[deleteId];
    //trigger function with new array not including deleted item
    handleDelete(todoList.filter((item) => item !== deletedItem));
  };

  const onEdit = (e) => {
    //get value of edit item, error "value" is not property of HTMLElement due to using .value,
    //so I use array destrucering instead
    const editItemContent = document.getElementById(`No ${e.target.id}`)[
      "value"
    ];
    //set id of what item is edited
    setEditId(`No ${e.target.id}`);
    //set content of edited item
    setEditContent(editItemContent);
    console.log("editItemContent", editItemContent);
  };

  const onCancelEdit = () => {
    setEditId(null);
  };
  const handleShowChecked = () => {
    setFilterState("check");
  };
  const handleShowUnChecked = () => {
    setFilterState("uncheck");
  };
  const handleShowAll = () => {
    setFilterState("all");
  };

  return (
    <div style={{ width: "100%" }}>
      {todoList.map((item) => {
        return (
          <div className="todos-item" key={item.id}>
            <svg
              id={item.id}
              height="34"
              width="34"
              onClick={(e) => {
                onCheck(e);
              }}
            >
              <circle
                cx="17"
                cy="17"
                r="15"
                stroke="black"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <input
              className={item.status === "checked" ? "checked" : null}
              id={`No ${item.id}`}
              onChange={(e) => {
                //set temporary edit content
                setEditContent(e.target.value);
              }}
              //if item's id is the same as editId, input will display value of temporary edit content
              value={editId === `No ${item.id}` ? editContent : item.content}
            />
            {!(editId === `No ${item.id}`) && (
              <div
                id={item.id}
                onClick={(e) => {
                  onEdit(e);
                }}
              >
                Edit
              </div>
            )}
            {editId === `No ${item.id}` && (
              <div
                onClick={() => {
                  handleUpdateEdit({ content: editContent, id: item.id });
                  setEditId(null);
                }}
              >
                Save
              </div>
            )}

            {editId === `No ${item.id}` && (
              <div onClick={onCancelEdit}>Cancel</div>
            )}
            <div
              id={item.id}
              onClick={(e) => {
                onDelete(e);
              }}
            >
              Delete
            </div>
          </div>
        );
      })}
      <MenuBar
        handleShowChecked={handleShowChecked}
        handleShowUnChecked={handleShowUnChecked}
        handleShowAll={handleShowAll}
      />
    </div>
  );
}
