import React from "react";
import Sidebar from "../components/ui/Sidebar";
import styled from "styled-components";
import TodoWrite from "../components/ui/TodoWrite";
import TodoListTabs from "../components/ui/TodoListTabs";

function MainPage() {
    return (
        <PageContainer>
            <Sidebar />
            <TodoWrite />
            <TodoListTabs />
        </PageContainer>
    );
}

export default MainPage;

const PageContainer = styled.div`
    display: flex;
    `;