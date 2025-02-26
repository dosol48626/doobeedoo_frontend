import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { useState } from "react";

import { accountState } from "../../recoil/accountAtom";
import { createTodo } from "../../services/todoService";

import { getTodayTodosState } from "../../recoil/todoAtom";
import { getNextTodosState } from "../../recoil/todoAtom";

import black from "../../asset/power/black.png";
import yellow from "../../asset/power/yellow.png";
import blue from "../../asset/power/blue.png";
import red from "../../asset/power/red.png";

const priorityOptions = [
    { value: "BLACK", label: "", image: black },
    { value: "YELLOW", label: "", image: yellow },
    { value: "BLUE", label: "", image: blue },
    { value: "RED", label: "", image: red },  
];
//아 밸류가 두개니까 헷갈린다. 이 밸류는 이미지 밸류 아랫밸류는 api전달 밸류


const TodoWrite = () => {
    const todayString = new Date().toISOString().split("T")[0];

    const {token} = useRecoilValue(accountState);
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState(todayString);
    const [priority, setPriority] = useState("BLACK");
    //어차피 서버에서 디폴트로 블랙 했으니까 이거 빈공간 넣어도 되겠지....?
    //블랙으로 넣어놔야 저기서도 빈게 아니고 블랙으로 잡혀있구나.
    //어? 근데 아..아닌가.
    //아 날짜 빈 공간이니까 에러나는거 어떻게 잡지...
    //아 전에 만든 투두에서 한거 있잖슴.

    // const setTodayTodos = useRecoilState(getTodayTodosState);

    const [, setTodayTodos] = useRecoilState(getTodayTodosState);
    const [, setNextTodos] = useRecoilState(getNextTodosState);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(token);
        //토큰이 없네??? 왜지????????
        //지금 토큰이 안넘어 오는데 왜 그런거지...
        //로그인 할때 제대로 안담겼나??
    
        //바꾼게 없는데 왜 갑자기 토큰 잘 담아서 주는거지....

        try {
            const newTodo = await createTodo(title, dueDate, priority, token);
            const today = new Date();
            const normalizeDate = (date) =>
                new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
            if (normalizeDate(new Date(newTodo.dueDate)) === normalizeDate(today)) {
                setTodayTodos((prev) => [...prev, newTodo]);
            }else{
                setNextTodos((prev) => [...prev, newTodo]);
            }
            setTitle("");
            setDueDate(todayString);
            setPriority("BLACK");
        }
        catch (error) {
            console.error("투두 생성 실패", error);
            alert("할 일을 입력하셔야죠");
        }
    }

    const [ dropdownOpen, setDropdownOpen ] = useState(false);
    const selectedOption = priorityOptions.find((option) => option.value === priority);
    
    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    }
    const handleSelect = (optionValue) => {
        setPriority(optionValue);
        setDropdownOpen(false);
    }
    
    //아 고쳤다아아아아

    //     try {
    //         const newTodo = await createTodo(title, dueDate, priority, token);
    //         setTodayTodos((prev) => [...prev, newTodo]);
    //         setNextTodos((prev) => [...prev, newTodo]);
    //         setTitle("");
    //         setDueDate(todayString);
    //         setPriority("BLACK");
    //     } catch (error) {
    //         console.error("투두 생성 실패", error);
    //     }
    // }

    return (
        <FormContainer onSubmit={handleSubmit}>
          <DropdownContainer>
            <DropdownHeader onClick={toggleDropdown}>
              <OptionImage src={selectedOption.image} />
              <OptionLabel>{selectedOption.label}</OptionLabel>
            </DropdownHeader>
            {dropdownOpen && (
              <DropdownList>
                {priorityOptions.map((option) => (
                  <DropdownItem
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                  >
                    <OptionImage src={option.image} />
                    <OptionLabel>{option.label}</OptionLabel>
                  </DropdownItem>
                ))}
              </DropdownList>
            )}
          </DropdownContainer>

          <InputContainer>
            <InputField
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="할 일을 입력하세요"
            />
          </InputContainer>

          <InputContainer>
            <InputField
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </InputContainer>

          <SubmitButton type="submit">추가</SubmitButton>
        </FormContainer>
      );
    };

//이거 실행하면서 크기랑 이것저것 잡아야겠네
export default TodoWrite;

const FormContainer = styled.form`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 20px;
  border: 1px solid #333;
  border-radius: 10px;
  background-color: #f0f0f0;
  max-width: 600px;
  gap: 4px;
  margin-left: 20px;
  margin-bottom: 10px;
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 70px; /* 기존 150px보다 좁게 */
  margin: 0px;
  align-items: center;
`;

const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
`;
//아 왜 깃발이 가운대로 안가는거지
const DropdownList = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 10;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const OptionImage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const OptionLabel = styled.span`
  font-size: 0.9rem;
  color: #333;
`;

const InputContainer = styled.div`
  flex: 1;
  margin: 0 10px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 5px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
//더 디테일하게 하려면 날짜도 컨테이너 만들어야하네...

const SubmitButton = styled.button`
  padding: 5px 15px;
  font-size: 1rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
`;


//이거 보고 확인해봐야지.
//css건드리는게 재밌긴한데;;; 시간 꽤 오래 걸리는데??
//일단 네모박스로 기본 틀만 만들고 수요일에 몰아서 다 잡아야지.
//으.. 틀만 잡고 날 잡아서 한방에 디자인 잡아야지..