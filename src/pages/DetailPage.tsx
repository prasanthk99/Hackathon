import React, { useEffect, useState } from "react";
import { Container, Badge, Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useHackathonContext } from "../context/HackathonContext";
import dateFormat from 'dateformat';

import { FaClock } from "react-icons/fa";

import skillLevel from '../assets/icons/carbon_skill-level-basic.svg';

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

const DetailPage: React.FC = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState<Hackathon | undefined>(undefined);
  const { hackathons,deleteHackathon } = useHackathonContext();
  const navigate = useNavigate();

  useEffect(() => {
    let data = hackathons.filter((d) => d.id == id);
    if(data.length==0) return navigate("/errorpage");
    setDetail(data[0]);
    console.log(data);
  }, [id]);
  
  const handleDelete = () => {
    if (id) {
      deleteHackathon(id);
        navigate('/');
    } else {
      console.error("ID is undefined");
    }
  };


  // Function return Date
  function getDate(){
    if (!detail) return <span>Loading...</span>;

    const now = new Date();
    
    const startDateTime = new Date(
      `${detail.startDate}T${detail.startTime}`
    );
    const endDateTime = new Date(
      `${detail.endDate}T${detail.endTime}`
    );

    console.log(startDateTime+" "+endDateTime);

    let badgeText = '';
    let badgeColor = 'secondary';

    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      badgeText = 'Invalid date';
      badgeColor = 'danger';
    } else if (now > endDateTime) {
      badgeText = `Ended on ${dateFormat(endDateTime, "dS mmm, yyyy hh:MM TT")}`;
      badgeColor = 'danger';
    } else if (now < startDateTime) {
      badgeText = `Starts on ${dateFormat(startDateTime, "dS mmmm, yyyy, hh:MM TT")}`;
      badgeColor = 'warning';
    } else {
      badgeText = `Ends on ${dateFormat(endDateTime, "dS mmm, yyyy hh:MM TT")}`;
      badgeColor = 'info';
    }

    return <Badge pill bg={badgeColor} className="my-2 text-dark"><FaClock className="mx-1" />{badgeText} (IST)</Badge>;

  }
  
  const showDate = getDate();


  return (
    <div className="detail-page">
      <Container fluid className="p-0">
        {/* Header Section */}
        <div className="header-section p-5">
          {showDate}
          <h1 className="mt-3">{detail?.name}</h1>
          <Badge bg="light" className="my-2 px-4 py-2 text-dark">
            <img src={skillLevel} alt=""/>
            <span className="mx-2">{detail?.level}</span>
          </Badge>
        </div>

        {/* Header */}
        <div className="row px-5">
          <div className="col text-center">
            <h4 className="fw-bold">Overview</h4>
          </div>
          <div className="col text-end p-2">
            <Button variant="success" className="mx-2" onClick={()=>navigate(`/challengeform/`+detail?.id)}>
              Edit
            </Button>
            <Button variant="danger" className="mx-2" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>

        {/* Overview Section */}
        <Card className=" p-5">
          <Card.Body>
            <Card.Text>{detail?.description}</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default DetailPage;
