import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <SidebarContainer>
            <SidebarItem onClick={() => navigate("/")}>홈</SidebarItem>
            <SidebarItem onClick={() => navigate("/calendar")}>달력</SidebarItem>
            <SidebarItem onClick={() => navigate("/important")}>중요도</SidebarItem>
            <SidebarItem onClick={() => navigate("/search")}>검색</SidebarItem>
            <SidebarItem onClick={() => navigate("/complete")}>완료</SidebarItem>
        </SidebarContainer>
    );
}

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