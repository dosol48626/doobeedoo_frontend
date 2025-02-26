import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/accountService";
import { accountState } from "../../recoil/accountAtom";

import Landing from "../../components/ui/Landing";
import styled from "styled-components";

function LoginPage() {
    const Navigate = useNavigate();
    const setAccountState = useSetRecoilState(accountState);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //이렇게 해서 해결 완료. 이제 새로고침해도 안돌아감.
    //로그인을 하면 로그인 상태가 리코일에 들어가고 토큰이 로컬스트리지에 들어가서
    //상태 관리는 리코일이하고 글 쓰거나 뭐 할때 필요한 토큰 그거는 로컬에서 꺼내다
    //쓰는 느낌인데... 처음부터 그렇게 했는데 왜 안되었던거지
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await login(username, password);

            const newAccountState = {
                isLoggedIn: true,
                token: result.access,
                user: result.user,
            };
            setAccountState(newAccountState);
            localStorage.setItem("accountState", JSON.stringify(newAccountState));
            Navigate("/");
        } catch (error) {
            console.error("로그인 실패(만약 실패하면 user:result.user가 맞는지 확인ㄱㄱ)", error);
            alert("등록된 계정이 아닙니다. 다시 확인해주세요.");
        }
    };
    
    return(
        <Container>
            <LandingSection>
                <Landing />
            </LandingSection>
            <LoginSection>
                <h2>투두 리스트를 처리하러 가볼까!</h2>
                <StyledForm onSubmit={handleLogin}>
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
                    <StyledButton type="submit">로그인</StyledButton>
                    </StyledLabel>
                </StyledForm>
                <p>
                    계정이 없어?? 만들러 가야지~ {" "}
                    <SignupLink onClick={() => Navigate("/register")}>회원가입</SignupLink>
                </p> 
            </LoginSection>     
        </Container>
    );
                  
}

export default LoginPage;

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

const LoginSection = styled.div`
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

const SignupLink = styled.span`
    color: blue;
    font-size: 1.2rem;
    cursor: pointer;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

//아...페이지 만드는거 너무 노가다일거같은데;;
//나중에 디자인은 다른 페이지 참고해서 한번에 바꿔야지.

//아 이거를 처음에 카드형식으로 만들어서 임포트했어야했는데...


//휴...디자인 잡는게 더 귀찮네