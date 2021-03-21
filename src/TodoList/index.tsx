import React, { useState } from "react";

export default function TodoList({ todoList, handleDelete, handleUpdateEdit }) {
  const [checkList, setCheckList] = useState([]);
  const [editContent, setEditContent] = useState();
  const [editId, setEditId] = useState();
  //add item id to check List
  const onCheck = (e) => {
    let subCheckList = [];
    //check whether that id is in checklist or not
    //if yes, remove id from checklist
    if (checkList.map((item) => item.id).includes(e.target.id)) {
      setCheckList(checkList.filter((item) => item.id !== e.target.id));
      document.getElementById(`No ${e.target.id}`).classList.remove("checked");
      console.log("checkList", checkList);
    }
    //if no, add id to check list
    else {
      const checkItemContent = document.getElementById(`No ${e.target.id}`)[
        "value"
      ];
      subCheckList = [
        ...checkList,
        { content: checkItemContent, id: e.target.id },
      ];
      setCheckList(subCheckList);
      console.log("checkList", checkList);
    }
  };

  //for each item on checkList, add class Check to change css
  checkList.forEach((item) => {
    document.getElementById(`No ${item.id}`)?.classList.add("checked");
  });

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
  return (
    <>
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
    </>
  );
}
