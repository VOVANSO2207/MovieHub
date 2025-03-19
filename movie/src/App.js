import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './pages/Header';
import Banner from './pages/Banner';
import Main from './pages/Main';
import Footer from './pages/Footer';
import BackToTopBtn from './components/BackToTopBtn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WatchMovie from './pages/WatchMovie';
import DashBoardLayout from './pages/DashBoardLayout';
import Home from './pages/Home';
import Movielist from './pages/Movielist';
import Movieadd from './pages/Movieadd';
import Category from './pages/Category';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import User from './pages/User';
import Actor from './pages/Actors';

// import RegisterPage from './components/RegisterPage';
// import ProtectedRoute from './components/ProtectedRoute';


function App() {
  const [toggle, setToggle] = useState(true);

  const Toggle = () => {
    setToggle(!toggle);
  };

  const [scroll, setScroll] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header scroll={scroll} onSearch={handleSearch} />
              <Banner />
              <Main searchQuery={searchQuery} />
              <Footer />
              <BackToTopBtn scroll={scroll} />
            </>
          }
        />
       <Route path="/login" element={<LoginPage></LoginPage>} /> 
       <Route path="/register" element={<RegisterPage></RegisterPage>} /> 
        <Route path="/watch/:movieId" element={<WatchMovie />} />
        <Route
          path="/dashboard"
          element={
            <DashBoardLayout toggle={toggle} Toggle={Toggle}>
              <Home Toggle={Toggle} />
            </DashBoardLayout>
          }
        />
        <Route
          path="/movielist"
          element={
            <DashBoardLayout toggle={toggle} Toggle={Toggle}>
              <Movielist />
            </DashBoardLayout>
          }
        />
        <Route
          path="/movieadd"
          element={
            <DashBoardLayout toggle={toggle} Toggle={Toggle}>
              <Movieadd />
            </DashBoardLayout>
          }
        />
        <Route
          path="/category"
          element={
            <DashBoardLayout toggle={toggle} Toggle={Toggle}>
              <Category />
            </DashBoardLayout>
          }
        />
        <Route
          path="/user"
          element={
            <DashBoardLayout toggle={toggle} Toggle={Toggle}>
              <User />
            </DashBoardLayout>
          }
        />
          <Route
          path="/actor"
          element={
            <DashBoardLayout toggle={toggle} Toggle={Toggle}>
              <Actor></Actor>
            </DashBoardLayout>
          }
        />

                {/* <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin" element={<ProtectedRoute component={AdminPage} role="admin" />} />
                <Route path="/user" element={<ProtectedRoute component={UserPage} role="user" />} />
                <Route path="/" element={<LoginPage />} /> */} 
        {/* Thêm các Route khác nếu cần */}
      </Routes>
    </Router>
  );
}

export default App;