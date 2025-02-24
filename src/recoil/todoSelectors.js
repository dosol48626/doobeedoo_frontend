import { selector } from "recoil";
import { allTodosState } from "./todoAtom";

export const completedTodosState = selector({
    key: "completedTodoSelector",
    get: ({ get }) => {
        const allTodos = get(allTodosState);
        return allTodos.filter((todo) => todo.complete === true);
    },
});