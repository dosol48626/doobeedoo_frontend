import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/account/LoginPage";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterPage from "./pages/account/RegisterPage";
import CalendarPage from "./pages/CalendarPage";
import ImportantPage from "./pages/ImportantPage";
import SearchPage from "./pages/SearchPage";
function App() {
  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;
