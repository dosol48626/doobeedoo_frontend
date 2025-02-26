import  {register} from "../../services/accountService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
//여기는 리코일 쓸게 없지. 회원가입이니까 ㅇㅇ

import Landing from "../../components/ui/Landing";
import styled from "styled-components";

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
            alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
    }
    //이거 콘솔에만 찍히게 할게 아니고 팝업이든 뭐든 띄어서 알려줘야겠다;;
    return(
        <Container>
            <LandingSection>
                <Landing />
            </LandingSection>
            <RegisterSection>
                <h2>멋진 계획을 세워보세요~</h2>
                <StyledForm onSubmit={handleRegister}>
                    <StyledLabel>
                        <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="아이디를 입력해주세요"
                        />
                    </StyledLabel>

                    <StyledLabel>
                        <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호를 입력해주세요"
                        />
                    </StyledLabel>

                    <StyledLabel>
                        <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="닉네임을 입력해주세요"
                        />
                    </StyledLabel>
                    <StyledButton type="submit">회원가입</StyledButton>
                </StyledForm>
                <p>
                    이미 계정이 있다고?? {""}
                    <LoginLink onClick={() => navigate("/login")}>로그인</LoginLink>
                </p>
            </RegisterSection>
        </Container>
    );
             
}

export default RegisterPage;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f6f8;
`;

const LandingSection = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RegisterSection = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    padding: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

`; 

const StyledForm = styled.form`
    width:80%;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    font-size: 10px;
    color: #333;
    gap: 10px;

    input {
        margin-top: 5px;
        padding: 10px;
        font-size: 1.2rem;
        border: 1px solid #333;
        border-radius: 5px;
        outline: none;
    }
`;

const StyledLabel = styled.label`
    margin: 10px;
    font-size: 20px;
    display: flex;
    gap: 20px;
    flex-direction: column;
    align-items: center;
`;

const StyledButton = styled.button`
    margin-top: 10px;
    font-size: 20px;
    padding: 10px 10px;
    border: none;
    border-radius: 5px;
    background-color: lightblue;
    cursor: pointer;
    width: 30%;
    align-self: center;
`;

const LoginLink = styled.span`
    color: blue;
    font-size: 1.2rem;
    cursor: pointer;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;
