import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { scoreState } from "../../recoil/scoreAtom";
import { accountState } from "../../recoil/accountAtom";
import { useRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { getTodoScore } from "../../services/todoService";

import tree0 from "../../asset/score/tree0.png";
import tree1 from "../../asset/score/tree1.png";
import tree2 from "../../asset/score/tree2.png";
import tree3 from "../../asset/score/tree3.png";
import tree4 from "../../asset/score/tree4.png";

import home from "../../asset/sidebar/home.png";
import calendar from "../../asset/sidebar/calendar.png";
import clear from "../../asset/sidebar/clear.png";
import search from "../../asset/sidebar/search.png";
import priority from "../../asset/sidebar/priority.png";


const Sidebar = () => {
    const navigate = useNavigate();

    const { token } = useRecoilValue(accountState);
    const [score, setScore] = useRecoilState(scoreState);

    const getScoreImage = (score) => {
        if(score <= 3) return tree0;
        else if(score <= 7) return tree1;
        else if(score <= 11) return tree2;
        else if(score <= 15) return tree3;
        else return tree4;
    }

    const scoreImageSrc = getScoreImage(score);


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
              {/* 메뉴 영역 */}
              <MenuContainer>
                <SidebarItem onClick={() => navigate("/")}>
                  <MenuIcon src={home} />
                  홈
                </SidebarItem>
                <SidebarItem onClick={() => navigate("/calendar")}>
                  <MenuIcon src={calendar} />
                  달력
                </SidebarItem>
                <SidebarItem onClick={() => navigate("/important")}>
                  <MenuIcon src={priority} />
                  중요도
                </SidebarItem>
                <SidebarItem onClick={() => navigate("/search")}>
                  <MenuIcon src={search} />
                  검색
                </SidebarItem>
                <SidebarItem onClick={() => navigate("/complete")}>
                  <MenuIcon src={clear} />
                  완료
                </SidebarItem>
              </MenuContainer>
        
              {/* 점수 및 이미지 영역 */}
              <ScoreContainer>
                <ScoreImage src={scoreImageSrc} alt="점수 이미지" />
              </ScoreContainer>
            </SidebarContainer>
          );
        };

const ScoreContainer = styled.div`
    margin-top: 20px;
    `;
const ScoreImage = styled.img`
    width: 170px;
    `;


const MenuIcon = styled.img`
    width: 30px;
    margin-right: 30px;
    `; 

const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    margin-bottom: 10px;
    gap: 20px;
    `;
//아 간격 대체 어떻게 주는거야아아아ㅏ앙
//아 찾았다 gap이였다

const SidebarItem = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 20px;
    margin: 10px;
    cursor: pointer;

    &:hover {
        color: #ff0000;
    }
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


export default Sidebar;