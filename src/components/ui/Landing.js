import React from "react";
import styled from "styled-components";
import ran1 from "../../asset/randing/ran1.jpg";


const Landing = () => {
    return (
        <LandingContainer>
            <Card>
                <CardImage src={ran1.jpg} />
                <CardContent>
                    <Title>끝내주는 투두 웹</Title>
                </CardContent>
            </Card>
        </LandingContainer>
    )
}
export default Landing;

const LandingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Card = styled.div`
    width: 300px;
    height: 400px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
`;

const CardImage = styled.div`
    width: 100%;
    height: 200px;
    background-image: url(${ran1});
    background-size: cover;
    background-position: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

const CardContent = styled.div`
    padding: 20px;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: #333;
`;