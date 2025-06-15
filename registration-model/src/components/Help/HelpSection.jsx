import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';

const HelpSection = () => {
  const { uid } = useParams();
  const [formVisible, setFormVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [statusFilter, setStatusFilter] = useState(""); // 'approved', 'disapproved', or ''
  const [formData, setFormData] = useState({
    title: '', date: '', time: '', place: '', extraVolunteers: false
  });

  useEffect(() => {
    fetchEvents();
  }, [statusFilter]);

  const fetchEvents = async () => {
    try {
      const query = statusFilter ? `?status=${statusFilter}` : '';
      const res = await axios.get(`http://localhost:5000/api/help/user/${uid}${query}`);
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:5000/api/help/create', {
        ...formData, userId: uid
      });
      setFormVisible(false);
      setFormData({ title: '', date: '', time: '', place: '', extraVolunteers: false });
      fetchEvents();
    } catch (err) {
      console.error("Error creating event:", err);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="mb-3">
        <Col><Button onClick={() => setFormVisible(true)}>Create</Button></Col>
        <Col><Button variant="success" onClick={() => setStatusFilter('approved')}>Approved</Button></Col>
        <Col><Button variant="danger" onClick={() => setStatusFilter('disapproved')}>Disapproved</Button></Col>
        <Col><Button variant="secondary" onClick={() => setStatusFilter('')}>Show All</Button></Col>
      </Row>

      {formVisible && (
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Time</Form.Label>
            <Form.Control type="time" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Place</Form.Label>
            <Form.Control value={formData.place} onChange={e => setFormData({ ...formData, place: e.target.value })} />
          </Form.Group>
          <Form.Check
            type="checkbox"
            label="Extra Volunteers Required"
            checked={formData.extraVolunteers}
            onChange={e => setFormData({ ...formData, extraVolunteers: e.target.checked })}
          />
          <Button onClick={handleCreate} className="mt-2">Submit</Button>
        </Form>
      )}

      <h3 className="mt-4">Events List {statusFilter && `(Filtered: ${statusFilter})`}</h3>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Title</th><th>Date</th><th>Time</th><th>Place</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {events.map(ev => (
            <tr key={ev._id}>
              <td>{ev.title}</td>
              <td>{ev.date}</td>
              <td>{ev.time}</td>
              <td>{ev.place}</td>
              <td>{ev.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default HelpSection;
