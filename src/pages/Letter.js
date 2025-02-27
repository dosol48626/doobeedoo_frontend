import React from "react";
import Sidebar from "../components/ui/Sidebar";
import styled from "styled-components";

const Letter = () => {
    return (
        <>
        <Sidebar />
        <PageContainer>
            <LetterContainer>
                <TitleContainer>
                    <Title>제목</Title>
                </TitleContainer>
                <ContentContainer>
                    <Content>내용</Content>
                </ContentContainer>
            </LetterContainer>
        </PageContainer>
        </>
    );
}

export default Letter;

const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 200px;
    margin-top: 50px;
`;

const LetterContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
`;

const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const Title = styled.div`
    font-size: 30px;
    font-weight: bold;
`;

const ContentContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const Content = styled.div`
    font-size: 20px;
`;

