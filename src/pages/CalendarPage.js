import React from "react";
import Sidebar from "../components/ui/Sidebar";
import styled from "styled-components";
import CalendarComponent from "../components/ui/CalendarComponent";

import AllTodosLoader from "../components/ui/todo/AllTodosLoader";
import TodoDetail from "../components/ui/TodoDetail";

const calendarPage = () => {
    return (
        <PageContainer>
            <Sidebar />
            <AllTodosLoader />
            <ContentArea>
                <CalendarComponent />
            </ContentArea>
            <TodoDetail />
        </PageContainer>
    );
}

export default calendarPage;

const PageContainer = styled.div`
    display: flex;
    `;

const ContentArea = styled.div`
    margin-left:200px;
    padding: 20px;
    flex: 1;
    `;