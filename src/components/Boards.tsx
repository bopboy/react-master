import { useForm } from 'react-hook-form'
import { Droppable } from 'react-beautiful-dnd'
import DraggableCard from './DraggableCard'
import styled from 'styled-components'
import { useRef } from 'react'
import { ITodo, toDoState } from '../atoms'
import { useRecoilState } from 'recoil'

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
const Form = styled.form`
    width: 90%;
    margin: 0 auto;
    input {
        width:100%;
    }
`
interface IBoardProps {
    toDos: ITodo[],
    boardId: string
}
interface IForm {
    toDo: string
}
function Board({ toDos, boardId }: IBoardProps) {
    const [toDo, setToDos] = useRecoilState(toDoState)
    const { register, setValue, handleSubmit } = useForm<IForm>()
    const onValid = ({ toDo }: IForm) => {
        const newToDo = { id: Date.now(), text: toDo }
        setToDos(allBoards => {
            return {
                ...allBoards,
                [boardId]: [newToDo, ...allBoards[boardId]],
            }
        })
        setValue("toDo", "")
    }
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input
                    {...register("toDo", { required: true })}
                    type="text" placeholder={`Add task on ${boardId}`}
                />
            </Form>
            <Droppable droppableId={boardId}>
                {(provided, snapshot) => (
                    <Area
                        isDraggingOver={snapshot.isDraggingOver}
                        isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {toDos.map((toDo, index) => (
                            <DraggableCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
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