import React, {useEffect} from "react";
import { useRecoilState ,useRecoilValue } from "recoil";
import styled from "styled-components";

import { getNextTodos } from "../../../services/todoService";
import { accountState } from "../../../recoil/accountAtom";
import { getNextTodosState } from "../../../recoil/todoAtom";

const NextTodoList = () => {
    const [nextTodos, setNextTodos] = useRecoilState(getNextTodosState);
    const { token } = useRecoilValue(accountState);

    useEffect(() => {
        async function fetchNextTodos() {
            try{
                const todos = await getNextTodos(token);
                setNextTodos(todos);
            } catch (error) {
                console.error("헤더!!!!!", error);
            }
        }
        fetchNextTodos();
    }
    , [token, setNextTodos]);

    return(
        <Container>
            <List>
                {nextTodos.length > 0 ? (
                    nextTodos.map((todo) => (
                        <ListItem key={todo.id}>
                            <span>{todo.title} {todo.priority} {todo.dueDate}</span>
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
    padding: 20px;
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
`;

const ListItem = styled.li`
    margin-bottom: 10px;
`;  