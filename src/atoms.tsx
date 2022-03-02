import { atom } from 'recoil'
interface IToDoState {
    [key: string]: string[]
}
export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "To Do": ["abc", "bcd"],
        Doing: ["cde", "def", "efg"],
        Done: ["fgh"]
    }
})