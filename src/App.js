import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/account/LoginPage";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterPage from "./pages/account/RegisterPage";
import CalendarPage from "./pages/CalendarPage";
import ImportantPage from "./pages/ImportantPage";
import SearchPage from "./pages/SearchPage";

import CompletePage from "./pages/CompletePage";
//껏다키니까 고쳐지네;;

import ResetWrapper from "./components/ResetWrapper";

import Letter from "./pages/Letter";
//아 이거 버그있네. 경로 잘 잡은거 맞는데 빨간줄 뜨네.
//껏다키면 괜찮이지긴하는데;;

// import CompletePage from "./pages/CompletePage";
//이 왜 임포트가 안되냐;;;;;??????
//아 이거 ... 아 아닌데? 맞는데???
function App() {

  return (
    <Router>
      <ResetWrapper>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ProtectedRoute>
                                  <MainPage />
                                </ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute>
                                          <CalendarPage />
                                        </ProtectedRoute>} />
        <Route path="/important" element={<ProtectedRoute>
                                          <ImportantPage />
                                        </ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute>
                                        <SearchPage />
                                      </ProtectedRoute>} />                       
        <Route path="*" element={<LoginPage />} />

        <Route path="/complete" element={<ProtectedRoute>
                                          <CompletePage />
                                        </ProtectedRoute>} />
        <Route path="/letter" element={<ProtectedRoute>
                                          <Letter />
                                        </ProtectedRoute>} /> 
      </Routes>
      </ResetWrapper>
    </Router>
  );
}

export default App;
//이게 되네....
//커스텀 훅 만들어서 페이지 이동되면 셀렉트 초기화되게 하고 초기화하고 칠드런애들 작동되게 하니까 되네ㅇㅇㅇㅇㅇㅇㅇ
