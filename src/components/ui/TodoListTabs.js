import React, {useState} from "react";
import styled from "styled-components";
import TodayTodoList from "./todo/TodayTodoList";
import NextTodoList from "./todo/NextTodoList";
// import CompletedTodoList from "./todo/CompletedTodoList";

const TodoListTabs = () => {
    const [activeTab, setActiveTab] = useState("TODAY");

    return (
        <div>
        <Container>
            <TabButton $active={activeTab === "TODAY"} onClick={() => setActiveTab("TODAY")}>
                오늘
            </TabButton>  
            <TabButton $active={activeTab === "NEXT"} onClick={() => setActiveTab("NEXT")}>
                다음
            </TabButton>
            {/* <TabButton $active={activeTab === "COMPLETED"} onClick={() => setActiveTab("COMPLETED")}>
                완료한 일
            </TabButton> */}
            {/* <ContenContainer> */}
                <ContentArea>    
                    {activeTab === "TODAY" && <TodayTodoList />}
                    {activeTab === "NEXT" && <NextTodoList />}
                    {/* {activeTab === "COMPLETED" && <CompletedTodoList />} */}
                </ContentArea>
            {/* </ContenContainer> */}
        </Container>
        </div>
    );
}

export default TodoListTabs;

// const ContenContainer = styled.div`
//     margin-top: 23px;
//     margin-left: -200px;
//     flex: 1;
//     display: flex;
//     flex-direction: column;
// `;
//이거하니까 왜 오늘 다음이 작동을 안하지???????????? 왜지???
//컨테이너로 감싸있어서 분리되면 작동을 안하나보네.
const Container = styled.div`
    border: 1px solid #ccc;
    display: flex;
    flex-direction: center;
    margin-top: 20px;

    max-width: 700px;

`;
const TabButton = styled.div`
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    align-self: flex-start;
    margin: 10px;
    cursor: pointer;
    color: ${props => props.$active ? "blue" : "black"};
`;
const ContentArea = styled.div`
    margin-left: 20px;
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
`;
