import React from "react";
import { useRecoilState } from "recoil";
import { toggleTodo} from "../../../services/todoService"
import { accountState } from "../../../recoil/accountAtom";
import { useRecoilValue } from "recoil";
import { blueTodosState } from "../../../recoil/priorityAtom";
import styled from "styled-components";

const BlueCard = () => {
    const [blueTodos, setBlueTodos] = useRecoilState(blueTodosState);
    const { token } = useRecoilValue(accountState);

    const handleCheckboxClick = async (todo, e) => {
        e.stopPropagation();

        setBlueTodos((prev) => 
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
      <h3>긴급 (Blue)</h3>
      {blueTodos.map((todo) => (
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

export default BlueCard;

const CardContainer = styled.div`
  width: 300px;
  border: 1px solid blue;
  padding: 10px;
  margin: 10px;
`;
const TodoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;