import { DragDropContext, DropResult } from "react-beautiful-dnd"
import styled from 'styled-components'
import { toDoState } from "./atoms"
import { useRecoilState } from "recoil"
import Board from "./components/Boards"

const Boards = styled.div`
  display: grid;
  width:100%;
  gap:10px;
  grid-template-columns: repeat(3, 1fr);
`
const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState)
  const onDragEnd = (info: DropResult) => {
    console.log(info)
    const { destination, draggableId, source } = info
    if (destination?.droppableId === source.droppableId) {
      setToDos(allBoards => {
        const boardCopy = [...allBoards[source.droppableId]]
        boardCopy.splice(source.index, 1)
        boardCopy.splice(destination?.index, 0, draggableId)
        return {
          ...allBoards, [source.droppableId]: boardCopy
        }
      })
    }

  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map(boardId =>
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />)
          }
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App