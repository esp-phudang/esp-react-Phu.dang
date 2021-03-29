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
    drag,
  } = props;

  return (
    <div
      onDragStart={drag}
      draggable={draggable}
      className="todos-item"
      id={item.id}
    >
      <img
        id={item.id}
        height="30px"
        src={
          item.status === "checked"
            ? "../../public/assets/checked-box.png"
            : "../../public/assets/box.png"
        }
        onClick={(e) => {
          onCheck(e);
        }}
      />
      <input
        disabled={editId === `No ${item.id}` ? false : true}
        //set multic className condition
        className={`${item.status === "checked" ? "checked" : null} ${
          editId === `No ${item.id}` ? null : "edited"
        }`}
        id={`No ${item.id}`}
        onChange={(e) => {
          //set temporary edit content
          setEditContent(e.target.value);
        }}
        //if item's id is the same as editId, input will display value of temporary edit content
        value={editId === `No ${item.id}` ? editContent : item.content}
      />
      <div>{String(item.time).slice(,10) + " " + String(item.time).slice(11,19)}</div>
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
