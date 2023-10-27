import { useDroppable } from "@dnd-kit/core";

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    // width: 500,
    // height: 200,
    // margin: 20,
    backgroundColor: isOver ? "rgba(77, 175, 124, 0.1)" : "white",
  };

  return (
    <div ref={setNodeRef} class="droppable-content" style={style}>
      {props.children}
    </div>
  );
}
