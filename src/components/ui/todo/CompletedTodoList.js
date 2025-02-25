import React from "react";
import styled from "styled-components";
import { completedTodosState } from "../../../recoil/todoSelectors";
import { useRecoilValue, useRecoilState } from "recoil";

import { selectedTodoState } from "../../../recoil/selectedTodoAtom";
import { toggleTodo } from "../../../services/todoService";
import { accountState } from "../../../recoil/accountAtom";

const CompletedTodoList = () => {
    const completedTodos = useRecoilValue(completedTodosState);

    const [, setSelectedTodo] = useRecoilState(selectedTodoState);
    const { token } = useRecoilValue(accountState);
    const handleTodoClick = (todo) => {
        setSelectedTodo(todo);
    }


    const handleCheckboxClick = async (todo) => {
        try {
            await toggleTodo(todo.todoId, token);
            console.log(todo);
        } catch (error) {
            alert("일정을 완료할 수 없습니다.");
        }
    };


    return (
        <Container>
            <List>
                {completedTodos.length > 0 ? (
                    completedTodos.map((todo, index) => (
                        <ListItem key={todo.id || index} onClick={() =>
                            handleTodoClick(todo)
                        }>
                            <ItemRow>
                                <PriorityCheckbox $priority={todo.priority}
                                onClick={() => handleCheckboxClick(todo)} />
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
}
//셀렉터 쓰니까 이렇게 쉬워지네...;; ㅎㅎ 대신 서버에 부담이 가잖슴.

//에러나는데ㅎㅎ.ㅎ.....ㅎ.

//잠만 완료 일정 못가져오는거 같은데??? 완료된게 없나??? 있을텐데
//아...하나도 없었구나;; 하나 바꿔봐야겠네.
//1로 바꿨는데 왜 안뜨지?? 디비에서 바로 바꿔서 그런가???? 서버가 못받아들이나??
//뭐지..다시 서버 열어야하네;;
export default CompletedTodoList;

const ItemRow = styled.div`
    display: flex;
    align-items: center;
`;

const PriorityCheckbox = styled.div`
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: 3px;
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
    }
}
`;

const Title = styled.div`
    flex: 1;
    font-size: 25px;
    margin-left: 10px;
`;

const DueDate = styled.div`
    flex:1;
    cursor: pointer;
    font-size: 20px;
    color: black;
    margin-right: 1000px;
    // border: 1px solid red;
    // background-color: white;
`;
//오른쪽에 파묻혀있어서 랜더링 안된건줄 알았네....

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

