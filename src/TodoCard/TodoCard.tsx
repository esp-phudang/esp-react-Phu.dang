import React from "react";
const TodoCard = (props) => {
  const {
    onCancelEdit,
    onDelete,
    setEditId,
    handleUpdateEdit,
    onEdit,
    item,
    onCheck,
    setEditContent,
    editId,
    editContent,
    draggable,
    drag
  } = props;
  return (
    <div  onDragStart={drag} draggable={draggable} className="todos-item"  id={item.id} >
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
      {/* <div>{item.time}</div> */}
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
            handleUpdateEdit({ ...item, content: editContent });
            setEditId(null);
          }}
        >
          Save
        </div>
      )}

      {editId === `No ${item.id}` && <div onClick={onCancelEdit}>Cancel</div>}
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
};
export default TodoCard;
