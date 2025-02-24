import  {register} from "../../services/accountService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
//여기는 리코일 쓸게 없지. 회원가입이니까 ㅇㅇ
//진짜 코파일럿 없이 코딩할까 현장에서 일하는 사람들은...

function RegisterPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const result = await register(username, nickname, password);
            console.log("회원가입 제발 한방에 성공하자", result);
            navigate("/login");
        } catch (error) {
            console.error("회원가입 실패..실패할만한 꺼덕지가...없는데?", error);
        }
    }
    //이거 콘솔에만 찍히게 할게 아니고 팝업이든 뭐든 띄어서 알려줘야겠다;;
    return(
        <div>
            <h2>회원가입 페이지</h2>
            <form onSubmit={handleRegister}>
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
                <label>
                    닉네임: <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    />
                </label>
                <button type="submit">회원가입</button>
            </form>
            <p>
                이미 계정이 있으면 로그인하러 가야지 <span onClick={() => navigate("/login")}>로그인</span>
            </p>
        </div>
    );
}

export default RegisterPage;