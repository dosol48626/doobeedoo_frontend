import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import { getNextTodos } from "../../../services/todoService"; 
import { accountState } from "../../../recoil/accountAtom";
import { getNextTodosState } from "../../../recoil/todoAtom"; 

import { selectedTodoState } from "../../../recoil/selectedTodoAtom";

import { toggleTodo } from "../../../services/todoService";

const NextTodoList = () => {
    const [ nextTodos, setNextTodos ] = useRecoilState(getNextTodosState); 
    const { token } = useRecoilValue(accountState);

    const [, setSelectedTodo] = useRecoilState(selectedTodoState);

    useEffect(() => {
        async function fetchNextTodos() {
            try {
                const todos = await getNextTodos(token); 
                setNextTodos(todos);
            } catch (error) {
                console.error("헤더에 값 안넣었을듯", error);
            }
        }
        fetchNextTodos();
    }, [token, setNextTodos]);

    const handleTodoClick = (todo) => {
        setSelectedTodo(todo);
    };

    const handleCheckboxClick = async (todo) => {
        try {
            await toggleTodo(todo.todoId, token);
            setNextTodos((prevTodos) =>
                prevTodos.map((t) =>
                    t.todoId === todo.todoId ? { ...t, complete: !t.complete } : t
                )
            );
        } catch (error) {
            alert("일정을 완료할 수 없습니다.");
        }
    };

    return (
        <Container>
            <List>
                {nextTodos.length > 0 ? (
                    nextTodos.map((todo, index) => (
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
                    <ListItem>다음 할 일이 없어요!</ListItem>
                )}
            </List>
        </Container>
    );
}
export default NextTodoList;

const Container = styled.div`
  border: 1px solid black;
  background-color: #f0f0f0;
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

//어차피 오늘꺼말고 다음꺼 가지고 오는거 똑같으니까 그냥 복붙해서 다음꺼만 가져옴. ㅇㅇㅇ
//복붙 ㅇㅈ ㅇ ㅇㅈ
//잠만 근데 똑같이 넣었는데 왜 글쓰기 반영이 안되냐???????

//원인 발견. 투두쓰기에서 지금 글쓰기 하면 아톰 최신으로 반영되는게 오늘꺼임.
//다음꺼도 반영되게 해야하는데....
//이래서 겟올 해가지고 하나로 전체 관리하면서 셀렉터로 짤라야하네.
//이거 해라고 과제 준거같은데 어쩌지...지금 엎으면 시간이...