import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';

const HelpSection = () => {
  const { uid } = useParams();
  const [formVisible, setFormVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all"); // 'approved', 'disapproved', or ''
  const [formData, setFormData] = useState({
    title: '', description: '', startDate: '', endDate: '',
    startTime: '', endTime: '', location: '', category: 'Environmental',
    volunteersNeeded: 0, extraVolunteers: false
  });
  

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/help/user/${uid}/${statusFilter}`);
      console.log(res.data);
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const validateForm = () => {
    const today = new Date().setHours(0, 0, 0, 0);
    const start = new Date(formData.startDate).setHours(0, 0, 0, 0);
    const end = new Date(formData.endDate).setHours(0, 0, 0, 0);
  
    if (start < today) {
      alert("Start date cannot be in the past.");
      return false;
    }
  
    if (end < start) {
      alert("End date cannot be before start date.");
      return false;
    }
  
    if (formData.startDate === formData.endDate) {
      const [startHour, startMin] = formData.startTime.split(':').map(Number);
      const [endHour, endMin] = formData.endTime.split(':').map(Number);
      if (endHour * 60 + endMin <= startHour * 60 + startMin) {
        alert("End time must be after start time.");
        return false;
      }
    }
  
    return true;
  };  

  useEffect(() => {
    fetchEvents();
  }, [statusFilter]);

  const handleCreate = async () => {
    if (!validateForm()) return;

    console.log(`UID: ${uid}`)
  
    try {
      await axios.post('http://localhost:5000/api/help/create', {
        ...formData,
        userIdForHelp: uid,
        isHelp: true,
        extraVolunteersForHelp: formData.extraVolunteers,
      });
      setFormVisible(false);
      setFormData({
        title: '', description: '', startDate: '', endDate: '',
        startTime: '', endTime: '', location: '', category: 'Environmental',
        volunteersNeeded: 0, extraVolunteers: false
      });
      fetchEvents();
    } catch (err) {
      console.error("Error creating event:", err);
    }
  };
  

  return (
    <Container className="mt-5">
      <Row className="mb-3">
        <Col><Button onClick={() => setFormVisible(true)}>Create</Button></Col>
        <Col><Button variant="success" onClick={() => setStatusFilter("approved")}>Approved</Button></Col>
        <Col><Button variant="danger" onClick={() => setStatusFilter("disapproved")}>Disapproved</Button></Col>
        <Col><Button variant="secondary" onClick={() => setStatusFilter("all")}>Show All</Button></Col>
      </Row>

      {formVisible && (
        <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />
        </Form.Group>
      
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
        </Form.Group>
      
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.startDate}
                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.endDate}
                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>
      
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                value={formData.startTime}
                onChange={e => setFormData({ ...formData, startTime: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                value={formData.endTime}
                onChange={e => setFormData({ ...formData, endTime: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>
      
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control
            value={formData.location}
            onChange={e => setFormData({ ...formData, location: e.target.value })}
          />
        </Form.Group>
      
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="Environmental">Environmental</option>
            <option value="Social Service">Social Service</option>
            <option value="Education">Education</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Community">Community</option>
          </Form.Select>
        </Form.Group>
      
        <Form.Check
          type="checkbox"
          label="Extra Volunteers Required"
          checked={formData.extraVolunteers}
          onChange={e => setFormData({ ...formData, extraVolunteers: e.target.checked })}
        />
      
        {formData.extraVolunteers && (
          <Form.Group className="mt-2">
            <Form.Label>Volunteers Needed</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={formData.volunteersNeeded}
              onChange={e => setFormData({ ...formData, volunteersNeeded: e.target.value })}
            />
          </Form.Group>
        )}
      
        <Button onClick={handleCreate} className="mt-3">Submit</Button>
      </Form>
      
      )}

      <h3 className="mt-4">Events List {statusFilter && `(Filtered: ${statusFilter})`}</h3>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Location</th>
            <th>Status</th>
            <th>Category</th>
            <th>Volunteers Needed</th>
            <th>Is Help</th>
            <th>Extra Volunteers For Help</th>
            <th>Help Status</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {events.map(ev => (
            <tr key={ev.id}>
              <td>{ev.title}</td>
              <td>{ev.description}</td>
              <td>{ev.startDate}</td>
              <td>{ev.endDate}</td>
              <td>{ev.startTime}</td>
              <td>{ev.endTime}</td>
              <td>{ev.location}</td>
              <td>{ev.status}</td>
              <td>{ev.category}</td>
              <td>{ev.volunteersNeeded}</td>
              <td>{ev.isHelp ? 'Yes' : 'No'}</td>
              <td>{ev.extraVolunteersForHelp ? 'Yes' : 'No'}</td>
              <td>{ev.helpStatus}</td>
              <td>{ev.User ? ev.User.name : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default HelpSection;