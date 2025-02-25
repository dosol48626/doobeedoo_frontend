import React from "react";
import Sidebar from "../components/ui/Sidebar";
import styled from "styled-components";
import TodoDetail from "../components/ui/TodoDetail";
import SearchComponent from "../components/ui/SearchComponent";


const SearchPage = () => {
    return (
        <PageContainer>
            <Sidebar />
            <ContentArea>

                <SearchComponent />

                <RightSection>
                    <TodoDetail />
                </RightSection>
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

const RightSection = styled.div`
    flex:1;
    `;

export default SearchPage;


