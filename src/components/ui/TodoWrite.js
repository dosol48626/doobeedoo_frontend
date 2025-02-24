import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useState } from "react";

import { accountState } from "../../recoil/accountAtom";
import { createTodo } from "../../services/todoService";



const TodoWrite = () => {
    const {token} = useRecoilValue(accountState);
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("BLACK");
    //어차피 서버에서 디폴트로 블랙 했으니까 이거 빈공간 넣어도 되겠지....?
    //블랙으로 넣어놔야 저기서도 빈게 아니고 블랙으로 잡혀있구나.
    //어? 근데 아..아닌가.

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(token);
        //토큰이 없네??? 왜지????????
        //지금 토큰이 안넘어 오는데 왜 그런거지...
        //로그인 할때 제대로 안담겼나??
    
        //바꾼게 없는데 왜 갑자기 토큰 잘 담아서 주는거지....
        try {
            await createTodo(title, dueDate, priority, token);
            setTitle("");
            setDueDate("");
            setPriority("BLACK");
        } catch (error) {
            console.error("투두 생성 실패", error);
        }
    }

    return(
        <FormContainer onSubmit={handleSubmit}>
            <label>
                <Select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="BLACK">일반</option>
                    <option value="YELLOW">일반반</option>
                    <option value="BLUE">중요</option>
                    <option value="RED">매우 중요</option>
                </Select>
            </label>
            <label>
                <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="할 일을 입력하세요"
                />
            </label>
            <label>
                <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </label>
            <button type="submit">추가</button>
        </FormContainer>
    );
}
//이거 실행하면서 크기랑 이것저것 잡아야겠네
export default TodoWrite;

const FormContainer = styled.form`
    display: flex;
    margin: 50px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: #f0f0f0;
    margin-left: 300px;
`;

const Input = styled.input`
    margin: 10px;
    padding: 5px;
`;

const Select = styled.select`
    margin: 10px;
    padding: 5px;
`;


//이거 보고 확인해봐야지.
//css건드리는게 재밌긴한데;;; 시간 꽤 오래 걸리는데??
//일단 네모박스로 기본 틀만 만들고 수요일에 몰아서 다 잡아야지.