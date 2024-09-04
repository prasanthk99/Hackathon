import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Form,
  InputGroup,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";
import { useHackathonContext } from "../context/HackathonContext";
import CardComponent from "./CardComponent";
import { debounce } from 'lodash';
import { FaSearch } from "react-icons/fa";

interface Hackathon {
  id: string;
  name: string;
  description: string;
  level: string;
  startDate: string; // Format: YYYY-MM-DD
  startTime: string; // Format: HH:MM
  endDate: string; // Format: YYYY-MM-DD
  endTime: string; // Format: HH:MM
  image: File | string;
  status: string | undefined;
}

const Challenges: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("newest");

  const [timeLeft, setTimeLeft] = useState<{ [key: string]: { days: number; hours: number; minutes: number } | string }>({});

  const { hackathons, updateHackathon, getHackathonStatus } = useHackathonContext();

  const handleSearch = debounce((value: string) => {
    setSearch(value);
  }, 300);

  // Filter and sort hackathons
  const filteredHackathons = useMemo(() => {
    return hackathons
      .filter((hackathon) =>
        hackathon.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((hackathon) => !filterLevel || hackathon.level === filterLevel)
      .filter((hackathon) => !filterStatus || hackathon.status === filterStatus);
  }, [hackathons, search, filterLevel, filterStatus]);

  const sortedHackathons = useMemo(() => {
    return [...filteredHackathons].sort((a, b) => {
      const aDate = new Date(`${a.startDate}T${a.startTime}`);
      const bDate = new Date(`${b.startDate}T${b.startTime}`);

      return sortOption === "newest"
        ? bDate.getTime() - aDate.getTime() // Newest first
        : aDate.getTime() - bDate.getTime(); // Oldest first
    });
  }, [filteredHackathons, sortOption]);
  

  // Function calculate remaining time
  const calculateTimeLeft = () => {
    const now = new Date();
    const timeLeftObj: { [key: string]: { days: number; hours: number; minutes: number } | string } = {};

    filteredHackathons.forEach((hackathon) => {
      const startDateTime = new Date(`${hackathon.startDate}T${hackathon.startTime}`);
      const endDateTime = new Date(`${hackathon.endDate}T${hackathon.endTime}`);

      const diffInMs = endDateTime.getTime() - now.getTime();
      const startDiffInMs = startDateTime.getTime() - now.getTime();

      if (diffInMs <= 0) {
        timeLeftObj[hackathon.id] = `${endDateTime.toLocaleString()}`;
      } else {
        timeLeftObj[hackathon.id] = formatDateTime(startDiffInMs > 0 ? startDiffInMs : diffInMs);
      }
    });

    setTimeLeft(timeLeftObj);
  };

  // Function to return the date format
  const formatDateTime = (diffInMs: number) => {
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const days = Math.floor(diffInSeconds / (24 * 3600));
    const hours = Math.floor((diffInSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    return { days, hours, minutes };
  };

  useEffect(()=>hackathons.forEach((d) => updateHackathon(d.id, { ...d, status: getHackathonStatus(d) })),[])

  useEffect(() => {
    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [hackathons, updateHackathon, getHackathonStatus]);

  return (
    <div className="challenges-section p-3">
      <Container>
        <div className="h2 text-center">Explore Challenges</div>
        <InputGroup className="mb-3">
          <InputGroup.Text id="search-icon">
            <FaSearch />
          </InputGroup.Text>
          <FormControl
            placeholder="Search by name"
            aria-label="Search by name"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </InputGroup>
        <Form>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
              >
                <option value="">All Levels</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Past">Past</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </Form.Select>
            </Col>
          </Row>
        </Form>
        {sortedHackathons.length>0?
          <Row className="my-4">
            {sortedHackathons.map((hackathon) => (
              <CardComponent key={hackathon.id} hackathon={hackathon} timeLeft={timeLeft} />
            ))}
          </Row>:
          <h1 className="text-center">No Data Found</h1>
        }
      </Container>
    </div>
  );
};

export default Challenges;
