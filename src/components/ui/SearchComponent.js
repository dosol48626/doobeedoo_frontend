import React, { useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { searchQueryState, searchResultState } from "../../recoil/searchAtom";
import { searchTodos } from "../../services/todoService";
import { accountState } from "../../recoil/accountAtom";
// import { token } from "../../recoil/accountAtom";
import { useRecoilValue } from "recoil";
import { toggleTodo } from "../../services/todoService";
import { selectedTodoState } from "../../recoil/selectedTodoAtom";

const SearchComponent = () => {
    const [query, setQuery] = useRecoilState(searchQueryState);
    const [result, setSearchResult] = useRecoilState(searchResultState);
    // const { token } = useRecoilState(accountState);
    // const { token } = useRecoilState(token);
    // const token = useRecoilValue(accountState);
    const { token} = useRecoilValue(accountState);

    // const setSelectedTodo = useRecoilState(selectedTodoState);
    const [, setSelectedTodo] = useRecoilState(selectedTodoState);
    // const setSelectedTodo = useRecoilState(selectedTodoState);

    const handleTodoClick = (todo) => {
        setSelectedTodo(todo);
    }

    const handleCheckboxClick = async (todo, e) => {
        e.stopPropagation();
        setSearchResult((prevTodos) =>
            prevTodos.map((t) =>
                t.todoId === todo.todoId ? { ...t, complete: !t.complete } : t
            )
        );
        setSearchResult((prevTodos) =>
            prevTodos.map((t) =>
                t.todoId === todo.todoId ? { ...t, complete: !t.complete } : t
            )
        );

        try {
            await toggleTodo(todo.todoId, token);
            setSearchResult((prevTodos) =>
                prevTodos.map((t) =>
                    t.todoId === todo.todoId ? { ...t, complete: !t.complete } : t
                )
            );
        } catch (error) {
            alert("일정을 완료할 수 없습니다.");
        }
    };

    useEffect(() => {
        console.log("토크으으으으은", token);
        const delayDebounceFn = setTimeout(() => {
            if (query.trim !== "") {
                searchTodos(query, token)
                .then((data) => {
                    setSearchResult(data);
            }).catch((error) => {
                console.log("검색실패하지마라");
            });
        } else {
            setSearchResult([]);
        }
    }, 300);

    //이거 딜레이 주는 이유가 디바운싱 효과라고 함
    //이거 없으면 타이핑할때마다 검색하니까 느려짐.
    return () => clearTimeout(delayDebounceFn);
    }, [query, token, setSearchResult]);

    return (
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="검색어를 입력하세요"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <ResultsList>
            {result.length > 0 ? (
              result.map((todo, index) => (
                <ResultItem key={todo.todoId||index} onClick={() => handleTodoClick(todo)}>
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
                </ResultItem>
              ))
            ) : (
              <NoResult>검색 결과가 없습니다.</NoResult>
            )}
          </ResultsList>
        </SearchContainer>
      );
    };




const ItemRow = styled.div`
    display: flex;
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

const Title = styled.div`
    flex: 1;
`;

const DueDate = styled.div`
    color: #999;
`;


const SearchContainer = styled.div`
  margin-top: 20px;
  width: 1000px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
  margin-left: 50px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const ResultsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ResultItem = styled.li`
  padding: 5px 0;
  border-bottom: 1px solid #eee;
`;

const NoResult = styled.div`
  font-style: italic;
  color: #999;
`;

export default SearchComponent;