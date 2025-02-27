import React from "react";
import { useRecoilState } from "recoil";
import { toggleTodo} from "../../../services/todoService"
import { accountState } from "../../../recoil/accountAtom";
import { useRecoilValue } from "recoil";
import { yellowTodosState } from "../../../recoil/priorityAtom";
import styled from "styled-components";

const YellowCard = () => {
    const [yellowTodos, setYellowTodos] = useRecoilState(yellowTodosState);
    const { token } = useRecoilValue(accountState);

    const handleCheckboxClick = async (todo, e) => {
        e.stopPropagation();

        setYellowTodos((prev) => 
            prev.map((t) => 
                t.todoId === todo.todoId ? { ...t, complete: !t.complete } : t
            )
        );
        try {
            await toggleTodo(
                todo.todoId,
                token);
        } catch (error) {
            alert("토글 실패");
        }
    }

    return (
        <CardContainer>
      {yellowTodos.map((todo) => (
        <TodoItem key={todo.todoId}>
          <input
            type="checkbox"
            checked={todo.complete}
            onChange={(e) => handleCheckboxClick(todo, e)}
          />
          <span>{todo.title}</span>
          <span>{todo.dueDate}</span>
        </TodoItem>
      ))}
    </CardContainer>
  );
};

export default YellowCard;

const CardContainer = styled.div`
  width: 500px;
  height: 230px;
  padding: 10px;
  border: 3px solid rgb(255, 251, 0);
`;
const TodoItem = styled.div`
  font-size: 23px;
  width: 300px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
//왜 노란색은 같은 크기인데 더 작아보이지;;