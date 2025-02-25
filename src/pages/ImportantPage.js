import React from "react";
import Sidebar from "../components/ui/Sidebar";
import styled from "styled-components";

const ImportantPage = () => {
    return (
        <PageContainer>
            <Sidebar />
            <ContentArea>
             
            </ContentArea>
        </PageContainer>
    );
}

const PageContainer = styled.div`
    display: flex;
`;

const ContentArea = styled.div`
    margin-left:200px;
    padding:20px;
    flex:1;
`;


export default ImportantPage;