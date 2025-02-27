import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";
import { selectedTodoState } from "../../recoil/selectedTodoAtom";
import { accountState } from "../../recoil/accountAtom";
import { getTodayTodosState } from "../../recoil/todoAtom";
import { getNextTodosState } from "../../recoil/todoAtom";
import { deleteTodo, updateTodo } from "../../services/todoService";

import { searchResultState } from "../../recoil/searchAtom";

import { allTodosState } from "../../recoil/todoAtom";
// import { selectedDateState } from "../../recoil/selectedDateAtom";
// import { setSelectedTodo } from "../../recoil/selectedTodoAtom";

// import {selectedDateAtom} from "../../recoil/selectedDateAtom";
//아 이름을 비슷하게 지어서 이게 쌓일수록 헷갈리네;;;
//아...힘들다
//검색 기능 완료...
//근데 검색어 입력하면 바로 나오게 하는게 맞겠지.
//내가 뭐했는지 차라락 나오면 좋잖슴...나만그런가. 성취감이잖슴..ㅇㅇ

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



const TodoDetail = () => {
  const selectedTodo = useRecoilValue(selectedTodoState);
  const { token } = useRecoilValue(accountState);

  const [, setTodayTodos] = useRecoilState(getTodayTodosState);
  const [, setNextTodos] = useRecoilState(getNextTodosState);

  const [, setSearchResult] = useRecoilState(searchResultState);
  const [, setAllTodos] = useRecoilState(allTodosState);
  // const [, setSelectedDate] = useRecoilState(selectedDateState);

  // const [, setSelectedTodo] = useRecoilState(selectedTodoState);
  // const [formData, setFormData] = useState(firstFormState)

  const [formData, setFormData] = useState({
    todoId: null,
    user_id: null,
    title: "",
    description: "",
    dueDate: "",
    complete: false,
    createDate: "",
    todoImage: "",
    priority: "BLACK",
    routine_id: null,
  });
  
  const firstFormState = {
    todoId: null,
  user_id: null,
  title: "",
  description: "",
  dueDate: "",
  complete: false,
  createDate: "",
  todoImage: "",
  priority: "BLACK",
  routine_id: null,
  };

  //이미지 지옥이다. 왜 계속 이미지 옆에 주소가 남지
  //아톰에서 데이터 가지고 있는거 같은데;;
  //아니면 useState를 초기화?

  useEffect(() => {
    if (selectedTodo) {
      setFormData({
        todoId: selectedTodo.todoId,
        user_id: selectedTodo.user_id,
        title: selectedTodo.title || "",
        description: selectedTodo.description || "",
        dueDate: selectedTodo.dueDate || "",
        complete: selectedTodo.complete || false,
        createDate: selectedTodo.createDate || "",
        todoImage: selectedTodo.todoImage || "",
        priority: selectedTodo.priority || "BLACK",
        routine_id: selectedTodo.routine_id,
      });
    }
  }, [selectedTodo, setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!selectedTodo) return;
    try {
      const updatedTodo = await updateTodo(formData.todoId, formData, token);
      console.log("데이터 수정 확인이거거거거", updatedTodo);

      setTodayTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.todoId === updatedTodo.todoId ? updatedTodo : t
        )
      );
      setNextTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.todoId === updatedTodo.todoId ? updatedTodo : t
        )
      );
      setSearchResult((prevTodos) =>
        prevTodos.map((t) =>
          t.todoId === updatedTodo.todoId ? updatedTodo : t
        )
      );
      setAllTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.todoId === updatedTodo.todoId ? updatedTodo : t
        )
      );
      alert("수정 완료!");
      setFormData(firstFormState);
    } catch (error) {
      alert("바뀐게 없는데?");
    }
  };
  //아 고쳤다. 내가 달력에서 셀렉트데이트 안쓰고 올투두 썼네...
  //와 이거 리팩토링할때 머리 진짜 아프겠네...
  // setSelectedDate


  const handleDelete = async () => {
    if (!selectedTodo) return;
    try {
      await deleteTodo(formData.todoId, token);
      setTodayTodos((prevTodos) =>
        prevTodos.filter((t) => t.todoId !== formData.todoId)
      );
      setNextTodos((prevTodos) =>
        prevTodos.filter((t) => t.todoId !== formData.todoId)
      );
      setSearchResult((prevTodos) =>
        prevTodos.filter((t) => t.todoId !== formData.todoId)
      );
      setAllTodos((prevTodos) =>
        prevTodos.filter((t) => t.todoId !== formData.todoId)
      );
      
      alert("삭제 완료");
    } catch (error) {
      alert("투두 삭제 실패");
    }
  };

  const [ dropdownOpen, setDropdownOpen ] = useState(false);
      const selectedOption = priorityOptions.find((option) => option.value === formData.priority);
      
      const toggleDropdown = () => {
          setDropdownOpen((prev) => !prev);
      }
      const handleSelect = (optionValue) => {
          setFormData((prev) => ({ ...prev, priority: optionValue }));
          setDropdownOpen(false);
      }

  if (!selectedTodo) return <Placeholder>투두를 선택하세요.</Placeholder>;

  return (
    <DetailContainer>
      <h2>할 일 점검 & 튜닝</h2>
      <ButtonGroup>
        <Button onClick={handleUpdate}>수정</Button>
        <Button onClick={handleDelete}>삭제</Button>
      </ButtonGroup>

      
      <PriorityRow>
        <Label>우선순위:</Label>
        <DropdownContainer>
          <DropdownHeader onClick={toggleDropdown}>
            {selectedOption && (
              <>
                <OptionImage src={selectedOption.image} alt={selectedOption.label} />
                <OptionLabel>{selectedOption.label}</OptionLabel>
              </>
            )}
          </DropdownHeader>
          {dropdownOpen && (
            <DropdownList>
              {priorityOptions.map((option) => (
                <DropdownItem
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                >
                  <OptionImage src={option.image} alt={option.label} />
                  <OptionLabel>{option.label}</OptionLabel>
                </DropdownItem>
              ))}
            </DropdownList>
          )}
        </DropdownContainer>
      </PriorityRow>

      <TitleDateRow>
        <FormGroup>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </FormGroup>
      </TitleDateRow>

      

      <DescriptionRow>
        <FormGroup>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="설명을 입력하세요"
          />
        </FormGroup>
      </DescriptionRow>

      <ImageRow>
        <FormGroup>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setFormData((prev) => ({
                  ...prev,
                  todoImage: URL.createObjectURL(file),
                  todoImageFile: file,
                  //이게 없어서 이미지가 미리보기는 나오는데 이미지가 들어가지 않았던거네
                }));
              }
            }}
          />
        </FormGroup>
        {formData.todoImage && (
        <ImagePreview>
          <img src={formData.todoImage} alt="투두 이미지 미리보기" />
        </ImagePreview>
      )}
      </ImageRow>
        
    
      
    </DetailContainer>
  );
};

export default TodoDetail;
//와....고쳤다...

const TitleDateRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const PriorityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const DescriptionRow = styled.div`  
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const ImageRow = styled.div`
  display: flex;
  gap: 20px;
`;

const DropdownContainer = styled.div`
  border: 1px solid black;
  background-color: #f0f0f0;
  
  position: relative;
  width: 40px; 
  margin: 0px; 
  align-items: center;
`;

const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

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
  font-size: 14px;
`;

const DetailContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 500px;
  height: 100vh;
  overflow-y: auto;
  padding: 20px;
  border-left: 1px solid #ccc;
  background-color: #fafafa;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 16px;
`;

const Input = styled.input`
  padding: 5px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  width: 200%;
  height: 250px;
  padding: 5px;
  font-size: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  font-size: 16px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Placeholder = styled.div`
  padding: 20px;
  font-size: 0px;
  text-align: center;
`;

const ImagePreview = styled.div`
  margin-top: 50px;
  margin-left: -330px;
  width: 150px;
  height: 150px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;


//상세보기는....클론코..
//어찌저지 만들었네;;
//정리를 하면 일단 셀렉터아톰으로 글 가져왔고, 그거 상태를 투두아톰넥스트아톰
//을 통해서 즉각 반영되게 관리하고,
//저 낙천적 뭐시기를 써야 그게 된다. ㅇㅇ

//밥먹고 마저 해야지. 이제 이미지만 고치면 되겠다.
//무슨 문제인가 하면 이미지를 추가하면ㅋㅋㅋㅋ 이미지가 투두 전역에 깔려버림
//그리고 이미지를 나오게 해야해. png로 글로 나오면 안되고ㅇㅇ