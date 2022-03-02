import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

function App() {
  const onDragEnd = () => { };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="one">
          {(provided, snapshot) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              <Draggable draggableId="first" index={0}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <span {...provided.dragHandleProps}>😀</span>
                    One
                  </li>
                )}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App