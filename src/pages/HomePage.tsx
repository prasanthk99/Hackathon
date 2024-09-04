import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Row,
  Col,
} from "react-bootstrap";

// Card-Images
import Robot from "../assets/icons/Robot.svg";
import NoteBook from "../assets/icons/carbon_notebook-reference.svg";
import Group from "../assets/icons/Vector.svg";
import Identification from "../assets/icons/IdentificationCard.svg";


import Header from "../components/Header";
import Challenges from "../components/Challenges";

interface Hackathon {
  id: string;
  name: string;
  description: string;
  level: string;
  startDate: string;
  endDate: string;
  image: string;
  status: string;
}

const cardData = [
  {
    id: 1,
    image: NoteBook,
    title: "Prove your skills",
    text: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
  },
  {
    id: 2,
    image: Group,
    title: "Learn from community",
    text: "One can look and analyze the solutions submitted by the other Data Scientists in the community and learn from them.",
  },
  {
    id: 3,
    image: Robot,
    title: "Challenge yourself",
    text: "There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder.",
  },
  {
    id: 4,
    image: Identification,
    title: "Earn recognition",
    text: "You will stand out from the crowd if you do well in AI challenges, it not only helps you shine in the community but also earns rewards.",
  },
];

const HomePage: React.FC = () => {
  return (
    <div className="Home-page">
      {/* Header Section */}
      <Header />
      
      {/* Participate Section */}
      <div className="p-5 bg-light container participate-section">
        <h3 className="text-center my-4 text-dark">
          Why Participate in{" "}
          <span className="text-success">AI Challenges?</span>
        </h3>
        <Row xs={1} md={2} className="g-4">
          {cardData.map((card) => (
            <Col key={card.id} md={6} className="mb-4">
              <Card className="p-4">
                <Card.Img variant="top" src={card.image} className="card-img" />
                <Card.Body className="px-0">
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Challenges Section */}
      <Challenges />
    </div>
  );
};

export default HomePage;
