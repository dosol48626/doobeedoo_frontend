import React from "react";
import Sidebar from "../components/ui/Sidebar";
import styled from "styled-components";

import Red from "../components/ui/power/red";
import Yellow from "../components/ui/power/yellow";
import Blue from "../components/ui/power/blue";
import Black from "../components/ui/power/black";

// import RedTodosLoader from "../components/ui/power/Red";
// import yellowTodosLoader from "../components/ui/power/Yellow";
// import BlueTodosLoader from "../components/ui/power/Blue";
// import BlackTodosLoader from "../components/ui/power/Black";
//이거로 일단 초기값 가져와서 아톰에 넣음

import RedCard from "../components/ui/powercard/RedCard";
import YellowCard from "../components/ui/powercard/YellowCard";
import BlueCard from "../components/ui/powercard/BlueCard";
import BlackCard from "../components/ui/powercard/BlackCard";
//이거로 각각의 카드를 만들어서 뿌려줌



const ImportantPage = () => {
    return (
        <PageContainer>
            <Sidebar />
            <ContentArea>
                <Red />
                <Yellow />
                <Blue />
                <Black />
                <CardsContainer>
                    <RedCard />
                    <YellowCard />
                    <BlueCard />
                    <BlackCard />
                </CardsContainer>

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

const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 90px;
    margin-left: 50px;
`;


export default ImportantPage;