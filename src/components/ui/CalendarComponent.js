import React from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";
import { allTodosState } from "../../recoil/todoAtom";
// import { selectedDateState } from "../../recoil/selectedDateAtom";
// import { selectedTodoAtom } from "../../recoil/selectedTodoAtom";

// import { selectedDateAtom } from "../../recoil/selectedDateAtom";
import { selectedDateState } from "../../recoil/selectedDateAtom";

import { toggleTodo } from "../../services/todoService";
import { accountState } from "../../recoil/accountAtom";
import { selectedTodoState } from "../../recoil/selectedTodoAtom";

const CalendarComponent = () => {
    // const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
    const [ allTodos, setAllTodos ] = useRecoilState(allTodosState);

    // const [allTodos ,setAllTodos] = useRecoilValue(allTodosState);

    const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);

    const [, setSelectedTodo] = useRecoilState(selectedTodoState);

    const { token } = useRecoilValue(accountState);

    const filteredTodos = allTodos.filter((todo) => {
        const todoDate = new Date(todo.dueDate);
        const normalizeDate = (date) =>
            new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
        return normalizeDate(todoDate) === normalizeDate(selectedDate);
    });

    //     const todoMonth = new Date(todo.dueDate).getMonth() + 1;
    //     const selectedMonth = selectedDate.getMonth() + 1;
        
    //     return todoMonth === selectedMonth;
    // });

    const onDateChange = (date) => {
        setSelectedDate(date);
    }

    const handleTodoClick = (todo) => {
        setSelectedTodo(todo);
    }

    // setSearchResult((prevTodos) =>
    //     prevTodos.map((t) =>
    //         t.todoId === todo.todoId ? { ...t, complete: !t.complete } : t
    //     )
    // );

    // const handleCheckboxChange = async (todo, e) => {
    //     e.stopPropagation();
    //     setSelectedTodo({
    //         ...todo,
    //         complete: !todo.complete,
    //     });
    //     try {
    //         await toggleTodo(todo.todoId, token);
    //     } catch (error) {
    //         alert("일정을 완료할 수 없습니다.");
    //     }
    // }

    const handleCheckboxChange = async (todo, e) => {
        e.stopPropagation();
        const updatedTodo = {
            ...todo,
            complete: !todo.complete,
        };
        setAllTodos((prevTodos) =>
            prevTodos.map((t) => (t.todoId === todo.todoId ? updatedTodo : t))
        );
        try {
            await toggleTodo(todo.todoId, token);
        } catch (error) {
            alert("일정을 완료할 수 없습니다.");
        }
    }

    return(
        <Wrapper>    
            
                <CalendarStyled onChange={onDateChange} value={selectedDate} />
                <TodosList>
                    <h3>{selectedDate.toLocaleDateString()}월의 투두!!</h3>
                    {filteredTodos.length > 0 ? (
                        filteredTodos.map((todo) => (
                            <TodoItem key={todo.todoId} onClick={() => handleTodoClick(todo)}>
                                <ItmeRow>
                                    <TodoCheckbox
                                    $priority={todo.priority}
                                    type="checkbox"
                                    checked={todo.complete}
                                    onChange={(e) => handleCheckboxChange(todo, e)}
                                    />
                                    <TodoTitle>{todo.title}</TodoTitle>
                                </ItmeRow>
                            </TodoItem>
                        ))
                    ) : (
                        <div> 해당 월의 투두 없음</div>
                    )}
                </TodosList>
        </Wrapper>
    )

}

export default CalendarComponent;

const Wrapper = styled.div`
    border: 1px solid #ccc;
    margin-left: 50px;
    width: 700px;
    height: 700px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    `;

const CalendarStyled = styled(Calendar)`
    margin: 20px;
    width: 600px;
    height: 300px;
    align-self: center;
    `;

const ItmeRow = styled.div`
    display: flex;
    `;

    const TodoCheckbox = styled.input.attrs({ type: "checkbox" })`
    -webkit-appearance: none; /* 기본 체크박스 스타일 제거 */
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
    /* 체크 되었을 때 내부 체크 표시 설정 */
    &:checked {
      background-color: white; /* 내부 흰색 유지 */
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

//체크박스 재활용

const TodoTitle = styled.span`
    align-self: center;
    `;

const TodosList = styled.div`
    align-self: center;
    flex: 1; 
    `;

const TodoItem = styled.div`
    margin: 10px;
    padding: 7px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 350px;
    &:hover {
        background-color: lightgray;
    }
    `;
    //커서랑 호버랑은 같이 못쓰네. 중복이 안되는구나