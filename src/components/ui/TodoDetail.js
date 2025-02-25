import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";
import { selectedTodoState } from "../../recoil/selectedTodoAtom";
import { accountState } from "../../recoil/accountAtom";
import { getTodayTodosState } from "../../recoil/todoAtom";
import { getNextTodosState } from "../../recoil/todoAtom";
import { deleteTodo, updateTodo } from "../../services/todoService";

import { searchResultState } from "../../recoil/searchAtom";
//아...힘들다
//검색 기능 완료...
//근데 검색어 입력하면 바로 나오게 하는게 맞겠지.
//내가 뭐했는지 차라락 나오면 좋잖슴...나만그런가. 성취감이잖슴..ㅇㅇ

const TodoDetail = () => {
  const selectedTodo = useRecoilValue(selectedTodoState);
  const { token } = useRecoilValue(accountState);

  const [, setTodayTodos] = useRecoilState(getTodayTodosState);
  const [, setNextTodos] = useRecoilState(getNextTodosState);

  const [, setSearchResult] = useRecoilState(searchResultState);


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
      alert("투두 수정 성공");
      setFormData(firstFormState);
    } catch (error) {
      alert("투두 수정 실패");
    }
  };

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
      alert("투두가 삭제되었습니다.");
    } catch (error) {
      alert("투두 삭제 실패");
    }
  };

  if (!selectedTodo) return <Placeholder>투두를 선택하세요.</Placeholder>;

  return (
    <DetailContainer>
      <h2>투두 상세보기 및 편집</h2>
      <FormGroup>
        <Label>제목:</Label>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>설명:</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>마감일:</Label>
        <Input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>우선순위:</Label>
        <Select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="BLACK">일반</option>
          <option value="YELLOW">노랑</option>
          <option value="BLUE">파랑</option>
          <option value="RED">빨강</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>이미지:</Label>
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
      <ButtonGroup>
        <Button onClick={handleUpdate}>수정</Button>
        <Button onClick={handleDelete}>삭제</Button>
      </ButtonGroup>
    </DetailContainer>
  );
};

export default TodoDetail;

const DetailContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 700px;
  height: 100vh;    
  overflow-y: auto; 
  border-left: 1px solid #ccc;
  background-color: #fafafa;
  padding: 20px;
`;
//나중에 width로 조절하면 된다

const FormGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  width: 100px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  padding: 8px;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
`;

const Select = styled.select`
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  cursor: pointer;
`;

const Placeholder = styled.div`
  padding: 20px;
  font-style: italic;
  color: #666;
`;

const ImagePreview = styled.div`
  margin-top: 10px;
  img {
    max-width: 200px;
    max-height: 200px;
    border: 1px solid #ccc;
    border-radius: 4px;
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