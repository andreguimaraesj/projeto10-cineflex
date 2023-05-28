 
import styled from "styled-components";
import HomePage from "./pages/HomePage/HomePage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';

export default function App() {
    return (
        <>
            <NavContainer>CINEFLEX</NavContainer>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route
                        path="/sessoes/:movieId"
                        element={<SessionsPage />}
                    ></Route>
                    <Route
                        path="/assentos/:showtimeId"
                        element={<SeatsPage />}
                    ></Route>
                    <Route path="/sucesso" element={<SuccessPage />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #c3cfd9;
    color: #e8833a;
    font-family: "Roboto", sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #e8833a;
    }
`;