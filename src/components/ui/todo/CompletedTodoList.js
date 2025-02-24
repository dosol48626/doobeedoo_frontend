import React from "react";
//와...셀렉터 쓰니까 useEffect 안써도 되네?????????????????????/
import styled from "styled-components";
import { completedTodosState } from "../../../recoil/todoSelectors";
import { useRecoilValue } from "recoil";

const CompletedTodoList = () => {
    const completedTodos = useRecoilValue(completedTodosState);
    //이게 이렇게 쓰면 안된다는데??

    return (
        <Container>
            <List>
                {completedTodos.length > 0 ? (
                    completedTodos.map((todo) => (
                        <ListItem key={todo.id}>
                            <span>{todo.title} {todo.priority} {todo.dueDate}</span>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>완료한 일이 없어요!</ListItem>
                )}
            </List>
        </Container>
    );
}
//셀렉터 쓰니까 이렇게 쉬워지네...;; ㅎㅎ 대신 서버에 부담이 가잖슴.

//에러나는데ㅎㅎ.ㅎ.....ㅎ.
export default CompletedTodoList;

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

