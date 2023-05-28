import styled from "styled-components";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { apiToken } from "./components/axios";
import HomePage from "./pages/HomePage/HomePage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import arrow from "./assets/arrow.svg";

import GlobalStyle from "./style/GlobalStyle";

export default function App() {
  apiToken("GOkxWILyTc8C2bmTdcrg9ozF");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <GlobalStyle />
      <NavContainer>
        {pathname !== "/" && (
          <button data-test="go-home-header-btn" onClick={() => navigate(-1)}>
            <img src={arrow} alt="backArrow" />
          </button>
        )}
        CINEFLEX
      </NavContainer>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sessoes/:idFilme" element={<SessionsPage />} />
        <Route path="/assentos/:idSessao" element={<SeatsPage />} />
        <Route path="/sucesso" element={<SuccessPage />} />
      </Routes>
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
  button {
    width: 0px;
    height: 0px;
    border: none;
    background: none;
    position: absolute;
    top: calc(50%-20px);
    left: 30px;
    img {
      width: 45px;
      height: 40px;
    }
  }
`;