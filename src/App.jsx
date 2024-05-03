import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import PublicPage from './pages/PublicPage';
import LoginPage from './pages/LoginPage'; 
import LogoutPage from './pages/LogoutPage'; 
import ErrorPage from './pages/ErrorPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <MyNavbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/logout" element={isAuthenticated ? <LogoutPage setIsAuthenticated={setIsAuthenticated} /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
