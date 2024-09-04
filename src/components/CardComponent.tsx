import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Col,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useHackathonContext } from "../context/HackathonContext";
import dateFormat from 'dateformat';

interface Hackathon {
  id: string;
  name: string;
  description: string;
  level: string;
  startDate: string; 
  startTime: string;
  endDate: string; 
  endTime: string;
  image: File | string;
  status: string | undefined;
}

function CardComponent({hackathon,timeLeft}: {hackathon: Hackathon;timeLeft: {[key: string]: { days: number; hours: number; minutes: number } | string;};}) {
  const navigate = useNavigate();

  const {getHackathonStatus} = useHackathonContext();

  // Function to get image URL
  const getImageUrl = (image: File | string) => {
    if (typeof image === "string") {
      return image;
    }
    return URL.createObjectURL(image);
  };

  // Function to determine Bootstrap classes based on status
  const getStatusClasses = (status: string | undefined) => {
    switch (status) {
      case "Active":
        return "bg-success text-white";
      case "Upcoming":
        return "bg-warning text-dark";
      case "Past":
        return "bg-secondary text-white";
      default:
        return "bg-light text-dark";
    }
  };

  const HackathonStatus = getHackathonStatus(hackathon);
  const timeLeftData = timeLeft[hackathon.id];

  const endDateTime = new Date(
    `${hackathon.endDate}T${hackathon.endTime}`
  );

  return (
    <>
      <Col xs={12} sm={6} md={4} key={hackathon.id} className="mb-4 text-center">
        <Card
          onClick={() => navigate(`/hackathon/${hackathon.id}`)}
          style={{ cursor: "pointer",height:"100%" }}
        >
          <Card.Img
            variant="top"
            src={getImageUrl(hackathon.image)}
            alt={hackathon.name + " Image"}
          />
          <Card.Body className="py-4">
            <Card.Text
              className={`my-3 border border-1 rounded ${getStatusClasses(
                HackathonStatus
              )}`}
              style={{ width: "40%", margin: "auto" }}
            >
              {HackathonStatus}
            </Card.Text>
            <Card.Title>{hackathon.name}</Card.Title>
            <Card.Text className="fw-semibold">
              {HackathonStatus == "Upcoming"
                ? "Starts In"
                : HackathonStatus == "Active"
                ? "Ends In"
                : "Ended on"}
            </Card.Text>
            <Card.Text>
              {typeof timeLeftData === "object" && timeLeftData !== null ? (
                <div className="row justify-content-center mx-5">
                  <span className="col fw-semibold">{timeLeftData.days.toString().padStart(2, '0') || 0} <br /> days</span>
                  :
                  <span className="col fw-semibold">{timeLeftData.hours.toString().padStart(2, '0') || 0} <br /> hours{" "}</span>
                  :
                  <span className="col fw-semibold">{timeLeftData.minutes.toString().padStart(2, '0') || 0} <br /> minutes</span>
                </div>
              ) : (
                
                <span className="h5">{dateFormat(endDateTime,"dS mmm, yyyy hh:MM TT")}</span>
              )}
            </Card.Text>
            <Link to={`/hackathon/${hackathon.id}`}>
              <Button variant="success">Participate Now</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

export default CardComponent;
