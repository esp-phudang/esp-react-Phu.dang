import React, { useState } from "react";
import { TodoItem } from "src/App";
import MenuBar from "../MenuBar";
import TodoCard from "../TodoCard/TodoCard";

export interface Props {
  todoList: TodoItem[];
  handleDelete: (item: TodoItem[]) => void;
  handleUpdateEdit: (item: TodoItem) => void;
  handleUpdateChecked: (list: TodoItem[]) => void;
  onUpdateNewList: (list: TodoItem[]) => void;
}

export default function TodoList({
  todoList,
  handleDelete,
  handleUpdateEdit,
  handleUpdateChecked,
  onUpdateNewList,
}: Props) {
  const [editContent, setEditContent] = useState<string | undefined>();
  const [editId, setEditId] = useState<string | undefined>();
  const [filterState, setFilterState] = useState(["checked", "unchecked"]);
  //add item id to check List
  const onCheck = (e: any) => {
    const checkedId = e.target.id;
    const checkedIndex = todoList?.map((item) => item.id).indexOf(checkedId);
    // I used subTodoList = todoList but it is shallow copy so todoList's items
    //will change value right after revalue item of subTodoList
    //=> not trigger rerender
    // using deep copy instead with JSON parse, stringify
    const subTodoList = [...todoList];
    if (subTodoList[checkedIndex].status === "unchecked") {
      subTodoList[checkedIndex].status = "checked";
    } else if (subTodoList[checkedIndex].status === "checked") {
      subTodoList[checkedIndex].status = "unchecked";
    }
    handleUpdateChecked(subTodoList);
  };

  const onDelete = (deleteItem: any) => {
    //get the index of deleted item
    const deleteId = todoList
      ?.map((item) => item.id)
      .indexOf(deleteItem.target.id);
    //get deleted item
    const deletedItem = todoList[deleteId];
    //trigger function with new array not including deleted item
    handleDelete(todoList.filter((item) => item !== deletedItem));
  };

  const onEdit = (e: any) => {
    //get value of edit item, error "value" is not property of HTMLElement due to using .value,
    //so I use array destrucering instead
    const editItem: any = document.getElementById(`No ${e.target.id}`)!;
    const editItemContent = editItem["value"];
    //set id of what item is edited
    setEditId(`No ${e.target.id}`);
    //set content of edited item
    setEditContent(editItemContent);
  };

  const onCancelEdit = () => {
    setEditId("");
  };
  const handleShowChecked = () => {
    setFilterState(["checked"]);
  };
  const handleShowUnChecked = () => {
    setFilterState(["unchecked"]);
  };
  const handleShowAll = () => {
    setFilterState(["checked", "unchecked"]);
  };
  const drag = (e: any) => {
    //save id of dragged item
    e.dataTransfer.setData("text", e.target.id);
  };
  const allowDrag = (e: any) => {
    //prevent default of onDragOver method - trigger Link
    e.preventDefault();
  };
  const drop = (e: any) => {
    //prevent default of onDrop method - trigger Link
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData("text");
    const indexDragItem = todoList.map((item) => item.id).indexOf(draggedItem);
    const newList = [...todoList];
    //get id from currentTarget is parent div, cuz event always taked place
    // in children which is target
    newList[e.currentTarget.id] = todoList[indexDragItem];
    newList[indexDragItem] = todoList[e.currentTarget.id];
    onUpdateNewList(newList);
  };
  console.log(todoList?.length === 0, todoList, typeof todoList);

  return (
    <div style={{ width: "100%" }}>
      {todoList?.map((item, index) => {
        return (
          //set filterState is an array, filter todoItem depends on state in filterState
          filterState.includes(item.status) && (
            <div
              key={index}
              id={String(index)}
              onDrop={drop}
              onDragOver={allowDrag}
            >
              <TodoCard
                drag={drag}
                draggable={true}
                item={item}
                editId={editId}
                editContent={editContent}
                onCheck={onCheck}
                onEdit={onEdit}
                onCancelEdit={onCancelEdit}
                onDelete={onDelete}
                setEditId={setEditId}
                setEditContent={setEditContent}
                handleUpdateEdit={handleUpdateEdit}
              />
              <hr className="bottom-line" />
            </div>
          )
        );
      })}
      {todoList?.length === 0 || todoList == undefined && (
        <div className="empty-list">Nothing to do here! B*tch!</div>
      )}
      <MenuBar
        todoList={todoList}
        handleShowChecked={handleShowChecked}
        handleShowUnChecked={handleShowUnChecked}
        handleShowAll={handleShowAll}
      />
    </div>
  );
}
