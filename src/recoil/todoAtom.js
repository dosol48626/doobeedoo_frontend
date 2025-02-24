import { atom } from "recoil";

export const allTodosState = atom({
    key: "allTodosState",
    default: [],
});

export const getTodayTodosState = atom({
    key: "getTodayTodosState",
    default: [],
});

export const getNextTodosState = atom({
    key: "getNextTodosState",
    default: [],
});

//나중에 여기다가 중요 순위별 가져오는거랑 써야겠네..
//컴포넌트 만들면서 추가해야겠다. 이거는 한꺼번에 하면 헷갈릴듯