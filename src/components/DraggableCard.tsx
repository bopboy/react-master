import React from 'react'
import { Draggable } from "react-beautiful-dnd"
import styled from 'styled-components'

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding:10px 10px;
  background-color: ${props => props.theme.cardColor};
`
interface IDraggableCardProps {
    toDo: string,
    index: number
}
function DraggableCard({ toDo, index }: IDraggableCardProps) {
    console.log(toDo, "has been rendered")
    return (
        <Draggable draggableId={toDo} index={index} key={toDo}>
            {(provided) => (
                <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {toDo}
                </Card>
            )}
        </Draggable>
    )
}
export default React.memo(DraggableCard)