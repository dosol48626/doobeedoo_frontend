import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { getTodayTodos } from "../../../services/todoService";
import { accountState } from "../../../recoil/accountAtom";
import { getTodayTodosState } from "../../../recoil/todoAtom";

const TodayTodoList = () => {
    const [ todayTodos, setTodayTodos ] = useRecoilState(getTodayTodosState);
    const { token } = useRecoilValue(accountState);

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

    return (
        <Container>
            <List>
                {todayTodos.length > 0 ? (
                    todayTodos.map((todo) => (
                        <ListItem key={todo.id}>
                            <span>{todo.title} {todo.priority} {todo.dueDate}</span>
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
    padding: 20px;
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
`;

const ListItem = styled.li`
    margin-bottom: 10px;
`;