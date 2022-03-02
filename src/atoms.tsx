import { atom, selector } from 'recoil'

export const toDoState = atom({
    key: "toDo",
    default: ["abc", "bcd", "cde", "def", "efg", "fgh"]
})