import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import { FaEye } from 'react-icons/fa';
import { BsCalendarEvent } from 'react-icons/bs';
import { BsPlusLg } from 'react-icons/bs';
import { BsCheck2Circle, BsXCircle } from 'react-icons/bs'

const HelpSection = () => {
  const { uid } = useParams();
  const [formVisible, setFormVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '', date: '', time: '', place: '', extraVolunteers: false
  });

  const fetchEvents = async () => {
    try {
      const query = statusFilter ? `?status=${statusFilter}` : '';
      const res = await axios.get(`http://localhost:5000/api/help/user/${uid}${query}`);
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    if (uid) fetchEvents();
  }, [statusFilter, uid]);

  const handleCreate = async (e) => {
    e.preventDefault();
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
      <Row className="align-items-center justify-content-between mb-4">
        <Col><h3 className="events-heading"><BsCalendarEvent style={{ marginRight: '10px' }} />
          Events List {statusFilter && `(Filtered: ${statusFilter})`}</h3></Col>
        <Col className="text-end d-flex gap-2 justify-content-end">
          <Button variant="outline-primary" className="border-2" onClick={() => setFormVisible(true)}>
          <BsPlusLg style={{ marginRight: '8px' }} />
           Create
          </Button>
          <Button
          variant="outline-success"
          className={`border-2 ${statusFilter === 'approved' ? 'active-approved' : ''}`}
          onClick={() => setStatusFilter('approved')}
          >
         <BsCheck2Circle style={{ marginRight: '6px' }} />
          Approved
         </Button>

        <Button
        variant="outline-danger"
        className={`border-2 ${statusFilter === 'disapproved' ? 'active-disapproved' : ''}`}
        onClick={() => setStatusFilter('disapproved')}
       >
        <BsXCircle style={{ marginRight: '6px' }} />
         Disapproved
       </Button>
        </Col>
      </Row>

      {formVisible && (
        <div className="glass-popup-overlay" onClick={() => setFormVisible(false)}>
          <div className="glass-card" onClick={e => e.stopPropagation()}>
            <Form onSubmit={handleCreate}>
              <h3 className="mb-4">Create New Event</h3>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Time</Form.Label>
                <Form.Control type="time" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Place</Form.Label>
                <Form.Control value={formData.place} onChange={e => setFormData({ ...formData, place: e.target.value })} />
              </Form.Group>
              <Form.Check type="checkbox" label="Extra Volunteers Required" checked={formData.extraVolunteers} onChange={e => setFormData({ ...formData, extraVolunteers: e.target.checked })} className="mb-4" />
              <div className="d-flex justify-content-end gap-2">
              <button className="custom-cancel-btn"onClick={() => setFormVisible(false)}>Cancel</button>
              <button type="submit" className="custom-submit-btn">Submit</button>
              </div>



            </Form>
          </div>
        </div>
      )}

      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <Table bordered responsive className='table-bordered-blue'>
          <thead className="table-header-maroon">
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Time</th>
              <th>Place</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => {
              const rowColor = index % 2 === 0 ? '#FFFFFF' : '#cef6ff';
              return (
                <tr key={event._id}>
                  <td style={{ backgroundColor: rowColor }}>{event.title}</td>
                  <td style={{ backgroundColor: rowColor }}>{event.date}</td>
                  <td style={{ backgroundColor: rowColor }}>{event.time}</td>
                  <td style={{ backgroundColor: rowColor }}>{event.place}</td>
                  <td style={{
                    backgroundColor: rowColor,
                    color: event.status === 'approved' ? '#4CAF50' : event.status === 'disapproved' ? '#F44336' : '#333',
                    fontWeight: 500
                  }}>{event.status}</td>
                  <td style={{ backgroundColor: rowColor, textAlign: 'center' }}>
                    <Button variant="light" onClick={() => setSelectedEvent(event)} style={{ border: 'none', backgroundColor: 'transparent' }}>
                      <FaEye style={{ color: '#a70a4a', fontSize: '1.2rem' }} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      {selectedEvent && (
        <div className="glass-popup-overlay" onDoubleClick={() => setSelectedEvent(null)}>
          <div className="glass-card">
            <h4>Event Details</h4>
            <hr />
            <p><strong>Title:</strong> {selectedEvent.title}</p>
            <p><strong>Date:</strong> {selectedEvent.date}</p>
            <p><strong>Time:</strong> {selectedEvent.time}</p>
            <p><strong>Place:</strong> {selectedEvent.place}</p>
            <p><strong>Status:</strong> {selectedEvent.status}</p>
            <p><em>(Double click anywhere to close)</em></p>
          </div>
        </div>
      )}
    </Container>
  );
};

export default HelpSection;