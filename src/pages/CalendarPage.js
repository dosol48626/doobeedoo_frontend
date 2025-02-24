import React from "react";
import Sidebar from "../components/ui/Sidebar";
import styled from "styled-components";

const calendarPage = () => {
    return (
        <PageContainer>
            <Sidebar />
            <ContentArea>
                <h1>달력 페이지</h1>
                <p>달력 페이지입니다.</p>
            </ContentArea>
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