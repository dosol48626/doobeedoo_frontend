import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { getTodayTodos } from "../../../services/todoService";
import { accountState } from "../../../recoil/accountAtom";
import { getTodayTodosState } from "../../../recoil/todoAtom";

import { selectedTodoState } from "../../../recoil/selectedTodoAtom";

import { toggleTodo } from "../../../services/todoService";

const TodayTodoList = () => {
    const [ todayTodos, setTodayTodos ] = useRecoilState(getTodayTodosState);
    const { token } = useRecoilValue(accountState);

    const [,setSelectedTodo] = useRecoilState(selectedTodoState);


    useEffect(() => {
        async function fetchTodayTodos() {
            try {
                const todos = await getTodayTodos(token);
                setTodayTodos(todos);
            } catch (error) {
                console.error("헤더에 값 안넣었을듯", error);
            }
        }
        fetchTodayTodos();
    }
    , [token, setTodayTodos]);

    const handleTodoClick = (todo) => {
        setSelectedTodo(todo);
    };

    const handleCheckboxClick = async (todo) => {
        try {
            await toggleTodo(todo.todoId, token);

            setTodayTodos((prevTodos) =>
                prevTodos.map((t) =>
                    t.todoId === todo.todoId ? { ...t, complete: !t.complete } : t
                )
            );
        } catch (error) {
            alert("일정을 완료할 수 없습니다.");
        }
    }
//으어어어ㅓ어어ㅓㄴㄹㅇ풔ㅑㄴ류ㅗㅓㅏㅇㅁㄴ러ㅏㅓㅏ 해결했다...
    
    return (
        <Container>
            <List>
                {todayTodos.length > 0 ? (
                    todayTodos.map((todo, index) => (
                        <ListItem key={todo.todoId || index} onClick={() => 
                            handleTodoClick(todo)}>
                            <ItemRow>
                                <Checkbox
                                    $priority={todo.priority}
                                    type="checkbox"
                                    checked={todo.complete}
                                    onChange={() => handleCheckboxClick(todo)}
                                />
                                <Title>{todo.title}</Title>
                                <DueDate>{todo.dueDate}</DueDate>
                            </ItemRow>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>오늘 할 일이 없어요!</ListItem>
                )}
            </List>
        </Container>
    );
}
export default TodayTodoList;

const Container = styled.div`
  border: 1px solid black;
  background-color:rgb(240, 240, 240);
    padding: 20px;
    margin-top: 60px;
    width: 120%;
    max-width: 700px;
    margin-left: -170px;
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
`;

const ListItem = styled.li`
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
        background-color: lightgray;
    }
    margin-left: 10px;
`;

const ItemRow = styled.div`
    display: flex;
    align-items: center;
    font-size: 20px;
    padding: 8px;
    border: 1px solid #ccc;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  -webkit-appearance: none; 
  appearance: none;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border: 2px solid ${props => {
    switch (props.$priority) {
      case "BLACK":
        return "black";
      case "YELLOW":
        return "yellow";
      case "BLUE":
        return "blue";
      case "RED":
        return "red";
      default:
        return "gray";
    }
  }};
  border-radius: 3px;
  margin-right: 10px;
  background-color: white; 

  &:checked {
    background-color: white; /* 체크되어도 내부는 흰색 */
    position: relative; /* ::after 위치 지정을 위해 필요 */
    &::after {
      content: "✓";
      color: ${props => {
        // 체크 표시의 색상은 테두리 색상과 동일하게 설정
        switch (props.$priority) {
          case "BLACK":
            return "black";
          case "YELLOW":
            return "yellow";
          case "BLUE":
            return "blue";
          case "RED":
            return "red";
          default:
            return "gray";
        }
      }};
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
    }
  }
`;
//이게 체크박스 커스텀을 하려니까 설정을 다 잡아줘야 작동을 하네.
//그냥 테두리만 바꾸고 싶다고 테두리만 건드리니까 작동을 안했네.

const Title = styled.div`
    margin-left: 30px;
    width: 300px;
`;
//width잡으니까 각이 맞춰지네??

const DueDate = styled.div`
    margin-left: 50px;
`;


//아 오른쪽 줄이는거 뭐더라;;
//이 작업을 넥스트..에만 하면 되겠다 완료는 수정 삭제 못해!! 하지마!!
//아 왜 체크박스가 바로 반영 안되는거지...

//이제 이거랑 똑같이 다음 투두 리스트도 바꿔야지.

//아니네 생각보다 쉽네 그냥 임포트해서 넣으면 끝이네;;