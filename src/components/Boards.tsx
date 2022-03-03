import { Droppable } from 'react-beautiful-dnd'
import DraggableCard from './DraggableCard'
import styled from 'styled-components'
import { useRef } from 'react'

const Wrapper = styled.div`
  padding-top: 10px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`
const Title = styled.div`
  text-align : center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size:18px;
`
interface IAreaProps {
    isDraggingFromThis: boolean,
    isDraggingOver: boolean
}
const Area = styled.div<IAreaProps>`
    background-color: ${props => props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "transparent"};
    flex-grow:1;
    transition: background-color 0.2s ease-in-out;
    padding:15px;
`
interface IBoardProps {
    toDos: string[],
    boardId: string
}
function Board({ toDos, boardId }: IBoardProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const onClick = () => {
        inputRef.current?.focus()
        setTimeout(() => {
            inputRef.current?.blur()
        }, 3000)
    }
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <input ref={inputRef} placeholder='grab me' />
            <button onClick={onClick}>Click me</button>
            <Droppable droppableId={boardId}>
                {(provided, snapshot) => (
                    <Area
                        isDraggingOver={snapshot.isDraggingOver}
                        isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {toDos.map((toDo, index) => (
                            <DraggableCard key={toDo} index={index} toDo={toDo} />
                        ))
                        }
                        {provided.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    )
}
export default Board