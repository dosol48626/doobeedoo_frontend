import { atom } from "recoil";

export const selectedTodoState = atom({
    key: "selectedTodoState",
    default: null,
});

//배열로 넣으면 그냥 빈 공간이 떠버리니까 널로 해두어야겠지?
//이거 상세보기 아톰임