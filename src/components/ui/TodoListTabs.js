import React, {useState} from "react";
import styled from "styled-components";
import TodayTodoList from "./todo/TodayTodoList";
import NextTodoList from "./todo/NextTodoList";
import CompletedTodoList from "./todo/CompletedTodoList";

const TodoListTabs = () => {
    const [activeTab, setActiveTab] = useState("TODAY");

    return (
        <Container>
            <TabButton active={activeTab === "TODAY"} onClick={() => setActiveTab("TODAY")}>
                오늘 할 일
            </TabButton>  
            <TabButton active={activeTab === "NEXT"} onClick={() => setActiveTab("NEXT")}>
                다음 할 일
            </TabButton>
            <TabButton active={activeTab === "COMPLETED"} onClick={() => setActiveTab("COMPLETED")}>
                완료한 일
            </TabButton>
            <ContentArea>    
                {activeTab === "TODAY" && <TodayTodoList />}
                {activeTab === "NEXT" && <NextTodoList />}
                {activeTab === "COMPLETED" && <CompletedTodoList />}
            </ContentArea>
        </Container>
    );
}

export default TodoListTabs;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;
const TabButton = styled.div`
    margin: 10px;
    cursor: pointer;
    color: ${props => props.active ? "blue" : "black"};
`;
const ContentArea = styled.div`
    margin-top: 20px;
`;
