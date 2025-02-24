import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/accountService";
import { accountState } from "../../recoil/accountAtom";

function LoginPage() {
    const Navigate = useNavigate();
    const setAccountState = useSetRecoilState(accountState);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const newAccountState = {
        isLoggedIn: true,
        token: "",
        user: {},
    };
    //이렇게 해서 해결 완료. 이제 새로고침해도 안돌아감.

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await login(username, password);
            setAccountState({
                isLoggedIn: true,
                token: result.access,
                user: result.user,
            });

            setAccountState(newAccountState);
            //이거해줘야 새로고침해도 로그인 유지된다. 아그러면 새로고침하면 다시 false로 바꿔서 날라가버림
            localStorage.setItem("accountState", JSON.stringify(newAccountState));
            Navigate("/");
        } catch (error) {
            console.error("로그인 실패(만약 실패하면 user:result.user가 맞는지 확인ㄱㄱ)", error);
        }
    };
    
    return(
        <div>
            <h2>로그인 페이지 임시</h2>
            <form onSubmit={handleLogin}>
                <label>
                    ID: <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </label>

                <label>
                    PW: <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit">로그인</button>
            </form>
            <p>
                계정 없으면 만들어야징 <span onClick={() => Navigate("/register")}>회원가입</span>
            </p>
        </div>
    );
}

export default LoginPage;
//아...페이지 만드는거 너무 노가다일거같은데;;
//나중에 디자인은 다른 페이지 참고해서 한번에 바꿔야지.