import React from "react";
import styled from "styled-components";
import { completedTodosState } from "../../../recoil/todoSelectors";
import { useRecoilValue, useRecoilState } from "recoil";

import { selectedTodoState } from "../../../recoil/selectedTodoAtom";
import { toggleTodo } from "../../../services/todoService";
import { accountState } from "../../../recoil/accountAtom";

import { allTodosState } from "../../../recoil/todoAtom";

const CompletedTodoList = () => {
    const completedTodos = useRecoilValue(completedTodosState);

    // useEffect(() => {
    //     console.log("완료된 일정 목록:", completedTodos);
    //     //왜 완료된거 안걸러지지??
    // }, [completedTodos]);
    //아 알겠다. 메인페이지에서 전체 글 가져오는 랜더 했잖슴!!!!!!!!!
    //여기 완료페이지 따로 두는걸로 했으니까 이 완료에서도 투두 올겟 랜더 해줘야 상태를 가지고 있지.
    //그러면 메인에서는 이제 올겟 필요없겠네.

    // const [, setSelectedTodo] = useRecoilState(selectedTodoState);

    //셀렉터는 읽기 전용이구나..... 직접 업데이트가 안되는거라네??
    //그럼...진짜 읽기 전용일때만 셀렉터쓰는거고 이렇게 변화하는건 그냥 올겟으로 다 들고와서
    //필터로 걸러야하는건가...//
    //셀렉터는 그러면 회원 정보라던가, 뭐...그런 읽기만 하는거에만 쓰여야하는건가

    const [ , setSelectedTodo ] = useRecoilState(selectedTodoState);

    const { token } = useRecoilValue(accountState);

    const [ , setAllTodos ] = useRecoilState(allTodosState);

    const handleTodoClick = (todo) => {
        setSelectedTodo(todo);
    }


    const handleCheckboxClick = async (todo, e) => {
        e.stopPropagation();
            setAllTodos((prevTodos) =>
                prevTodos.map((t) =>
                    t.todoId === todo.todoId ? { ...t, complete: !t.complete } : t
                )
            );

            //고쳤다.
        // setAllTodos(prev) =>
        //     prev.map((t) =>
        //         t.todoId === todo.todoId ? { ...t, complete: !t.complete } : t

        // );
        // const previosTodos = [...allTodos];
        // setAllTodos(
        //     allTodos.map((t) =>
        //         t.todoId === todo.todoId ? { ...t, complete: !t.complete } : t
        //     )
        // );
        //오 고쳤다.
        // setSearchResult((prevTodos) =>
        //     prevTodos.map((t) =>
        //         t.todoId === todo.todoId ? { ...t, complete: !t.complete } : t
        //     )
        // );

        try {
            await toggleTodo(todo.todoId, token);
            console.log(todo);
        } catch (error) {
            alert("일정을 완료할 수 없습니다.");
        }
    };


    return (
        <Container>
            <h1>내가 부지런히 살았다는 흔적</h1>
          <List>
            {completedTodos.length > 0 ? (
              completedTodos.map((todo, index) => (
                <ListItem key={todo.todoId || index} onClick={() => handleTodoClick(todo)}>
                  <ItemRow>
                    <Checkbox
                      $priority={todo.priority}
                      type="checkbox"
                      checked={todo.complete}
                      onChange={(e) => handleCheckboxClick(todo, e)}
                    />
                    <Title>{todo.title}</Title>
                    <DueDate>{todo.dueDate}</DueDate>
                  </ItemRow>
                </ListItem>
              ))
            ) : (
              <ListItem>완료한 일이 없어요!</ListItem>
            )}
          </List>
        </Container>
      );
    };
//셀렉터 쓰니까 이렇게 쉬워지네...;; ㅎㅎ 대신 서버에 부담이 가잖슴.

//에러나는데ㅎㅎ.ㅎ.....ㅎ.

//잠만 완료 일정 못가져오는거 같은데??? 완료된게 없나??? 있을텐데
//아...하나도 없었구나;; 하나 바꿔봐야겠네.
//1로 바꿨는데 왜 안뜨지?? 디비에서 바로 바꿔서 그런가???? 서버가 못받아들이나??
//뭐지..다시 서버 열어야하네;;
export default CompletedTodoList;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 300px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;      
  gap: 20px;            
  justify-content: center;
`;

const ListItem = styled.li`
  width: 250px;        
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background-color: #fff;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-3px);
  }
`;

const ItemRow = styled.div`
  display: flex;
  align-items: center;
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
    background-color: white; 
    position: relative;
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

const Title = styled.div`
  flex: 1;
  font-size: 20px;
`;

const DueDate = styled.div`
  color: #999;
  font-size: 16px;
`;