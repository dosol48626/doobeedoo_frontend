import React from "react";
import styled from "styled-components";
import ran1 from "../../asset/randing/ran1.jpg";


const Landing = () => {
    return (
        <LandingContainer>
            <Card>
                <CardImage src={ran1.jpg} />
                <CardContent>
                    <Title>즐겁게 하루를 계획 해보세요~</Title>
                </CardContent>
            </Card>

        </LandingContainer>
    )
}
export default Landing;

const LandingContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f9f9f9;
`;

const Card = styled.div`
    width: 480px;
    height: 500px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

const CardImage = styled.div`
    width: 500px;
    height: 430px;
    background-image: url(${ran1});
    background-size: cover;
    background-position: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

const CardContent = styled.div`
    padding: 20px;
    display: flex;
    justify-content: center;
    background-color: lightgrey;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: 600;
    color: #333;
    text-align: center;
`;

//다른사람이 만든 디자인을 적용할려고해도 쉽지가 않네..
//오히려 내꺼에 맞게 또 바꿔야하니까 더 어렵네네