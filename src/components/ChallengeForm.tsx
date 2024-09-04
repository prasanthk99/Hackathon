import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useHackathonContext } from "../context/HackathonContext";
import { useNavigate, useParams } from "react-router-dom";

interface FormData {
  challengeName: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  description: string;
  image: File | string;
  levelType: string;
}

const ChallengeForm = () => {
  const navigate = useNavigate();
  const { addHackathon, updateHackathon, hackathons } = useHackathonContext();
  const { id } = useParams<{ id?: string }>();

  const [formData, setFormData] = useState<FormData>({
    challengeName: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    description: "",
    image: "",
    levelType: "Easy",
  });

  const now = new Date();
  const todayDate = now.toISOString().split('T')[0];
  const todayTime = now.toTimeString().split(' ')[0].substring(0, 5);

  useEffect(() => {
    if (id) {
      const hackathon = hackathons.find(h => h.id === id);
      if (hackathon) {
        setFormData({
          challengeName: hackathon.name,
          startDate: hackathon.startDate,
          startTime: hackathon.startTime || "", // Handle missing time
          endDate: hackathon.endDate,
          endTime: hackathon.endTime || "", // Handle missing time
          description: hackathon.description,
          image: hackathon.image,
          levelType: hackathon.level,
        });
      }
    }
  }, [id, hackathons]);

  // Function to handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({
        ...formData,
        image: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  // Function to validate form
  const validateForm = () => {
    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
    const now = new Date();

    if (startDateTime < now) {
      alert("Start time cannot be in the past.");
      return false;
    }

    if (endDateTime <= startDateTime) {
      alert("End time must be after start time.");
      return false;
    }

    return true;
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    if (validateForm()) {
      // Update data if we are updating or else add the data
      if (id) {
        updateHackathon(id,{
          id,
          name: formData.challengeName,
          startDate: formData.startDate,
          startTime: formData.startTime,
          endDate: formData.endDate,
          endTime: formData.endTime,
          description: formData.description,
          image: formData.image,
          level: formData.levelType,
          status: "Upcoming"
        });
      } else {
        addHackathon({
          id: String(hackathons.length + 1),
          name: formData.challengeName,
          startDate: formData.startDate,
          startTime: formData.startTime,
          endDate: formData.endDate,
          endTime: formData.endTime,
          description: formData.description,
          image: formData.image,
          level: formData.levelType,
          status: "Upcoming"
        });
      }
      navigate('/');
    }
  };

  return (
    <Form className="container my-3" onSubmit={handleSubmit}>
      <h3 className="py-4">{id ? 'Edit Challenge' : 'Create Challenge'}</h3>
      <Form.Group className="mb-3" controlId="formChallengeName">
        <Form.Label>Challenge Name</Form.Label>
        <Form.Control type="text" placeholder="Enter challenge name" name="challengeName" value={formData.challengeName} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formStartDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control type="date" name="startDate" value={formData.startDate} onChange={handleChange} required min={todayDate}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formStartTime">
        <Form.Label>Start Time</Form.Label>
        <Form.Control type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEndDate">
        <Form.Label>End Date</Form.Label>
        <Form.Control type="date" name="endDate" value={formData.endDate} onChange={handleChange} required min={todayDate}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEndTime">
        <Form.Label>End Time</Form.Label>
        <Form.Control type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Enter description" name="description" value={formData.description} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formImage">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" name="image" onChange={handleFileChange} />
        {formData.image && typeof formData.image === "string" && (
          <img
            src={formData.image}
            alt="Selected"
            style={{ marginTop: '10px', maxWidth: '100%', height: 'auto' }}
          />
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formLevelType">
        <Form.Label>Level Type</Form.Label>
        <Form.Control as="select" name="levelType" value={formData.levelType} onChange={handleChange} required>
          <option value={"Easy"}>Easy</option>
          <option value={"Medium"}>Medium</option>
          <option value={"Hard"}>Hard</option>
        </Form.Control>
      </Form.Group>

      <Button variant="success" type="submit">
        {id ? 'Save Changes' : 'Create Challenge'}
      </Button>
    </Form>
  );
};

export default ChallengeForm;
