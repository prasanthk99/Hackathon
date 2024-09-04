import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

import Rocket from "../assets/icons/PicsArt_04-14-04.42 1.svg";
import { Link } from "react-router-dom";

// Importing Images
import Group1 from "../assets/icons/Group 1000002515.svg";
import Group2 from "../assets/icons/Group 1000002516.svg";
import Group3 from "../assets/icons/Group 1000002518.svg";

function Header() {
  return (
    <div className="header-section">
      <Container className="py-5">
        <Row>
          <Col md={6} className="px-4">
            <h1 className="my-4 ps-3 border-5 border-start border-warning fw-bold">
              Accelerate Innovation with Global AI Challenges
            </h1>
            <p className="my-4 fw-medium">
              AI Challenges at DPhi simulate real-world problems. It is a great
              place to put your AI/Data Science skills to test on diverse
              datasets...
            </p>
            <Link to={"challengeform"}>
              <Button variant="light" className="my-4 fw-semibold">
                Create Challenge
              </Button>
            </Link>
          </Col>
          <Col md={6} className="text-center">
            <img src={Rocket} alt="rocketImg" />
          </Col>
        </Row>
        
      </Container>
      <div className="p-5 text-center border-top border-bottom border-light">
        <Row>
          <Col>
            <img src={Group1} alt="" className="mb-2"/>
            <span>
              <h4>100k+</h4>
              <p>AI model submissions</p>
            </span>
          </Col>
          <Col>
            <img src={Group2} alt="" className="mb-2"/>
            <span>
              <h4>50k+</h4>
              <p>Data Scientists</p>
            </span>
          </Col>
          <Col>
            <img src={Group3} alt="" className="mb-2"/>
            <span>
              <h4>100+</h4>
              <p>AI Challenges hosted</p>
            </span>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Header;
