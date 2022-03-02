import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"
import styled from 'styled-components'
import { toDoState } from "./atoms"
import { useRecoilState } from "recoil"
import DraggableCard from "./components/DraggableCard"

const Board = styled.div`
  padding: 20px 10px;
  padding-top:30px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width:100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const Boards = styled.div`
  display: grid;
  width:100%;
  grid-template-columns: repeat(1, 1fr);
`

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState)
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return
    setToDos(oldToDos => {
      const toDosCopy = [...oldToDos]
      // console.log("Delete item on", source.index)
      // console.log(toDosCopy)
      toDosCopy.splice(source.index, 1)
      // console.log("Deleted item")
      // console.log(toDosCopy)
      // console.log("Put bacj", draggableId, "on ", destination.index)
      toDosCopy.splice(destination?.index, 0, draggableId)
      // console.log(toDosCopy)
      return toDosCopy
    })
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(provided, snapshot) => (
              <Board ref={provided.innerRef} {...provided.droppableProps}>
                {toDos.map((toDo, index) => (
                  <DraggableCard key={toDo} index={index} toDo={toDo} />
                ))
                }
                {provided.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App