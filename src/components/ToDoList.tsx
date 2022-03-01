import React from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { categoryState, toDoSelector } from '../atoms'
import CreateToDo from './CreateToDo'
import ToDo from './ToDo'


function ToDoList() {
    const toDos = useRecoilValue(toDoSelector)
    const [category, setCategory] = useRecoilState(categoryState)
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value)
    }
    console.log(category)
    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <select value={category} onInput={onInput}>
                <option value="TO_DO">To do</option>
                <option value="DOING">Doing</option>
                <option value="DONE">Done</option>
            </select>
            <CreateToDo />
            {toDos?.map(todo => (<ToDo key={todo.id} {...todo} />))}
        </div>
    );
}
export default ToDoList;
