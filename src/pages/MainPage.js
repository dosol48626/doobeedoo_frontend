import React from "react";
import Sidebar from "../components/ui/Sidebar";
import styled from "styled-components";
import TodoWrite from "../components/ui/TodoWrite";
import TodoListTabs from "../components/ui/TodoListTabs";

function MainPage() {
    return (
        <PageContainer>
            <Sidebar />
            <ContentArea>
                <TodoWrite />
                <TodoListTabs />
            </ContentArea>
        </PageContainer>
    );
}

export default MainPage;

const PageContainer = styled.div`
    display: flex;
    `;

const ContentArea = styled.div`
    margin-left:200px;
    padding: 50px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    `;