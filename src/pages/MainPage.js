import React from "react";
import Sidebar from "../components/ui/Sidebar";
import styled from "styled-components";
import TodoWrite from "../components/ui/TodoWrite";
import TodoListTabs from "../components/ui/TodoListTabs";
import AllTodosLoader from "../components/ui/todo/AllTodosLoader";
import TodoDetail from "../components/ui/TodoDetail";

function MainPage() {
    return (
        <PageContainer>
            <Sidebar />
            <ContentArea>
                <AllTodosLoader />
                <TodoWrite />
                <TodoListTabs />

                <RightSection>
                    <TodoDetail />
                </RightSection>
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

const RightSection = styled.div`
    flex:1;
    padding: 20px;
    border: 1px solid #ddd;
    `;