import React from "react";
import Sidebar from "../components/ui/Sidebar";
import styled from "styled-components";

function MainPage() {
    return (
        <PageContainer>
            <Sidebar />
            <ContentArea>
                <h1>메인 페이지</h1>
                <p>메인 페이지입니다.</p>
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
    flex: 1;
    `;