import React, { useState } from 'react';
import { UserProvider } from './context/UserContext';
import AppNavBar from './components/AppNavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Workouts from './pages/Workouts';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from "./pages/Logout";
import { Container } from "react-bootstrap";

const App = () => {
    return (
        <UserProvider>
            <Router>
                <AppNavBar />
                <Container>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/workouts" element={<Workouts />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
                </Container>
            </Router>
        </UserProvider>
    );
};

export default App;
