import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { scoreState } from "../../recoil/scoreAtom";
import { accountState } from "../../recoil/accountAtom";
import { useRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { getTodoScore } from "../../services/todoService";

const Sidebar = () => {
    const navigate = useNavigate();

    const { token } = useRecoilValue(accountState);
    const [score, setScore] = useRecoilState(scoreState);

    useEffect(() => {
        if (token) {
            const intervalId = setInterval(() => {
                getTodoScore(token)
                    .then((data) => {
                        setScore(data.score);
                    })
                    .catch((error) => {
                        console.error("점수 조회 실패:", error);
                    });
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }
    , [token, setScore]);
//이거는 try 쓰는게 아니라서 원래 했던거처럼 반영하는게 안되네. 이렇게 1초마다 주는게...되긴하는데
//계속 계산하는 중이니까 이런게 쌓으면 성능 낮아질거같은데... 일단 완.
        //     getTodoScore(token)
        //         .then((data) => {
        //             setScore(data.score);
        //         })
        //         .catch((error) => {
        //             console.error("점수 조회 실패:", error);
        //         });
        // }
        // }, [token, setScore]);
  

    return (
        <SidebarContainer>
            <SidebarItem onClick={() => navigate("/")}>홈</SidebarItem>
            <SidebarItem onClick={() => navigate("/calendar")}>달력</SidebarItem>
            <SidebarItem onClick={() => navigate("/important")}>중요도</SidebarItem>
            <SidebarItem onClick={() => navigate("/search")}>검색</SidebarItem>
            <SidebarItem onClick={() => navigate("/complete")}>완료</SidebarItem>

            <ScoreDisplay>점수: {score}</ScoreDisplay>
        </SidebarContainer>
    );
}

const ScoreDisplay = styled.div`
    bottom: 20px;
    `;

const SidebarContainer = styled.div`
    position: fixed;
    width: 200px;
    height:100vh;
    background-color: #f8f9fa;
    padding: 20px;
    flex-direction: column;
    display: flex;
    `;

const SidebarItem = styled.div`
    margin: 10px;
    cursor: pointer;
    `;


export default Sidebar;