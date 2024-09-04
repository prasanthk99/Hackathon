import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import HomePage from "./pages/HomePage";
import ChallengeForm from "./components/ChallengeForm";
import DetailPage from "./pages/DetailPage";
import ErrorPage from "./pages/ErrorPage";

import Logo from "../src/assets/icons/Logo.png"

function App() {
  return (
    <BrowserRouter>
      <Content />
    </BrowserRouter>
  );
}

function Content() {
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">
            <span className="m-2"><img src={Logo} alt="logo" /></span>
            <span className="fw-bold">Hackathon</span>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/challengeform" element={<ChallengeForm />} />
        <Route path="/challengeform/:id" element={<ChallengeForm />} />
        <Route path="/hackathon/:id" element={<DetailPage />} />
        <Route path="/errorpage" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
