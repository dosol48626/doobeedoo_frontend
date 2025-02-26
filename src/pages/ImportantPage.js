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
                <TitleContainer>
                    <Title>MUST-DO</Title>
                </TitleContainer>
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

const TitleContainer = styled.div`
    // border : 1px solid black;
    width: 200px;
    height: 50px;
    margin-left: 50px;

    
`;

const Title = styled.div`
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 50px;
`;


const PageContainer = styled.div`
    display: flex;
    
`;

const ContentArea = styled.div`
    border: 1px solid #ccc;
    margin-left:200px;
    padding:20px;
    flex:1;
`;

const CardsContainer = styled.div`
    // border: 1px solid #ccc;
    width: 1300px;
    height : 600px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 100px;
    margin-top: 20px;
    margin-left: 50px;
`;


export default ImportantPage;