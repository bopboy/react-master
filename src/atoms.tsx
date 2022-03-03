import { atom } from 'recoil'
interface IToDoState {
    [key: string]: string[]
}
export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "To Do": ["밥먹기", "공부하기"],
        Doing: ["운동하기", "잠자기", "퇴근하기"],
        Done: ["놀기", "출근하기"],
    }
})