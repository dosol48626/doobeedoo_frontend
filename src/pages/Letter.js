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
                    <Title>
                        <h3>아뮤즈와 함께 성장할 열정의 지원자, 김영환입니다</h3>
                    </Title>
                </TitleContainer>
                <ContentContainer>
                    <Content>
                        <h4>먼저, 아뮤즈에서 소중한 기회를 제공해 주신 것에 대해 진심으로 감사드립니다.</h4>
                        <p>이번 기술 과제를 수행하면서 저는 Recoil을 통한 전역 관리 방식을 경험하며,
                             Redux보다 더 직관적이고 유지보수가 용이한 개발 패러다임을 체감할 수 있었습니다.
                             이 과정에서 제 프론트엔드 개발 역량은 물론, 문제 해결 능력도 크게 향상되었습니다.</p>
                        <p>
                        아직 제 역량이 완벽하지 않음을 자각하지만, 
                        제 열정과 끈기를 바탕으로 아뮤즈에서 꾸준히 성장하며 
                        회사의 긍정적인 문화와 발전에 기여할 수 있도록 최선을 다하고싶습니다.
                        </p>
                        <p>
                        다시 한 번, 귀중한 기회를 주신 점에 깊은 감사를 드립니다.
                        </p>
                        <p>감사합니다</p>
                    </Content>
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
  margin-left: 220px; 
  padding: 20px;
  background-color: #f2f2f2;
`;

const LetterContainer = styled.div`
  background: #fff;
  width: 90%;
  max-width: 900px;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
`;

const ContentContainer = styled.div`
  margin-top: 20px;
`;

const Content = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;

  p {
    margin-bottom: 16px;
  }
`;
//아 왜 사이드바가 움찔하지..??