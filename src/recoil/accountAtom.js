import { atom } from "recoil";

// export const accountState = atom({
//     key: "accountState",
//     default: {
//         isLoggedIn: false,
//         token: null,
//         user: null,
//     },
// });
//이렇게하면 새로고침할때마다 날라가버림

const storedAccount = localStorage.getItem("accountState");
const initialAccountState = storedAccount ? JSON.parse(storedAccount) : {
    isLoggedIn: false,
    token: null,
    user: null,
};

export const accountState = atom({
    key: "accountState",
    default: initialAccountState,
});


//이게 끝이라고?? 이렇게 쓰면 이게 로그인 유무를 확인하는 함수같은건가??
//뭐 어떻게 작동되는거지....로그인 토큰이랑 그런건 이게 어떻게 가져온다는거지..???????????

//set~~Recoil해서 값을 넣어버리네 ㅇㅇㅇ
