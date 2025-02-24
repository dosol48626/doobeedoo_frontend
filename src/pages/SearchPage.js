import React from "react";
import Sidebar from "../components/ui/Sidebar";
import styled from "styled-components";

const SearchPage = () => {
    return (
        <PageContainer>
            <Sidebar />
            <ContentArea>
                <h1>검색 페이지</h1>
                <p>검색 페이지입니다.</p>
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

export default SearchPage;
