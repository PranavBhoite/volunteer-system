import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button, Form, Container, Row, Col, Table,
  Dropdown, DropdownButton, Modal
} from 'react-bootstrap';
import axios from 'axios';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { BsCalendarEvent, BsPlusLg } from 'react-icons/bs';

const HelpSection = () => {
  const { uid } = useParams();
  const [formVisible, setFormVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '', date: '', time: '', place: '', extraVolunteers: false
  });

  const btnStyle = {
    padding: '0 6px',
    margin: '0',
    fontSize: '0.9rem',
    textDecoration: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    verticalAlign: 'middle'
  };
  const iconStyle = { fontSize: '1.1rem', verticalAlign: 'middle' };
  const dividerStyle = { color: '#ccc', margin: '0 6px' };

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
        ...formData, userId: uid, status: 'pending'
      });
      setFormVisible(false);
      setFormData({ title: '', date: '', time: '', place: '', extraVolunteers: false });
      fetchEvents();
    } catch (err) {
      console.error("Error creating event:", err);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/help/update/${editEvent._id}`, editEvent);
      setEditEvent(null);
      fetchEvents();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`http://localhost:5000/api/help/delete/${id}`);
        fetchEvents();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  return (
    <div className="main-content-container">
    <Container className="mt-4">
      {/* Header and Action Row */}
      <Row className="align-items-center justify-content-between mb-4 flex-wrap">
        <Col xs={12} md="auto" className="mb-2 mb-md-0">
          <h2 className="events-heading d-flex align-items-center">
            <BsCalendarEvent className="me-2" />
            Events List
          </h2>
        </Col>

        <Col xs={12} md="auto" className="d-flex gap-2 justify-content-md-end justify-content-start mt-2 mt-md-0 flex-wrap">
          <Button className="unified-btn me-2" onClick={() => setFormVisible(true)}>
            <BsPlusLg className="me-2" />
            Create
          </Button>

          <DropdownButton
            id="dropdown-filter"
            title={
              <span>
                <strong style={{ color: 'white' }}>Filter: </strong>
                <span>{statusFilter ? statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1) : 'All'}</span>
              </span>
            }
            onSelect={(status) => setStatusFilter(status)}
            className="custom-dropdown-btn"
          >
            <Dropdown.Item eventKey="">All</Dropdown.Item>
            <Dropdown.Item eventKey="approved" style={{ color: 'green', fontWeight: 'bold' }}>Approved</Dropdown.Item>
            <Dropdown.Item eventKey="disapproved" style={{ color: 'red', fontWeight: 'bold' }}>Disapproved</Dropdown.Item>
            <Dropdown.Item eventKey="pending" style={{ color: '#ff9800', fontWeight: 'bold' }}>Pending</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>

      {/* Create Form Modal */}
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
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control value={formData.place} onChange={e => setFormData({ ...formData, place: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Time</Form.Label>
                <Form.Control type="time" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} />
              </Form.Group>

              <Form.Check
                type="checkbox"
                label="Extra Volunteers Required"
                checked={formData.extraVolunteers}
                onChange={e => setFormData({ ...formData, extraVolunteers: e.target.checked })}
                className="mb-4"
              />
              <div className="d-flex justify-content-end gap-2 flex-wrap">
                <button className="custom-cancel-btn" onClick={() => setFormVisible(false)}>Cancel</button>
                <button type="submit" className="custom-submit-btn">Submit</button>
              </div>
            </Form>
          </div>
        </div>
      )}

      {/* Scrollable Table Section */}
      <div className="table-scroll-container">
        <Table bordered responsive className='table-bordered-blue table-rounded'>
          <thead className="table-header-maroon">
            <tr>
              <th>Title</th>
              <th>Start Date</th>
              <th>Location</th>
              <th>Status</th>
              <th>Feedback</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => {
              const rowColor = index % 2 === 0 ? '#FFFFFF' : '#cef6ff';
              const statusColor = event.status === 'approved' ? '#4CAF50' : event.status === 'pending' ? '#ff9800' : '#F44336';
              return (
                <tr key={event._id}>
                  <td style={{ backgroundColor: rowColor }}>{event.title}</td>
                  <td style={{ backgroundColor: rowColor }}>{event.date}</td>
                  <td style={{ backgroundColor: rowColor }}>{event.place}</td>
                  <td style={{ backgroundColor: rowColor, color: statusColor, fontWeight: 500 }}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </td>
                  <td style={{ backgroundColor: rowColor }}>{event.feedback || "-"}</td>
                  <td style={{ backgroundColor: rowColor, textAlign: 'center' }}>
                    <Button variant="link" onClick={() => setSelectedEvent(event)} style={{ ...btnStyle, color: '#cd2468' }}>
                      <FaEye style={iconStyle} /> View
                    </Button>
                    <span style={dividerStyle}>|</span>
                    <Button
                      variant="link"
                      onClick={() => (event.status === 'pending' || event.status === 'disapproved') && setEditEvent(event)}
                      style={{
                        ...btnStyle,
                        color: (event.status === 'pending' || event.status === 'disapproved') ? '#007bff' : '#aaa'
                      }}
                      disabled={!(event.status === 'pending' || event.status === 'disapproved')}
                    >
                      <FaEdit style={iconStyle} />
                    </Button>
                    <span style={dividerStyle}>|</span>
                    <Button
                      variant="link"
                      onClick={() => handleDelete(event._id)}
                      style={{ ...btnStyle, color: '#fa424a' }}
                    >
                      <FaTrash style={iconStyle} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      {/* View Modal */}
      {selectedEvent && (
        <div className="glass-popup-overlay" onDoubleClick={() => setSelectedEvent(null)}>
          <div className="glass-card">
            <h4>Event Details</h4>
            <hr />
            <p><strong>Title:</strong> {selectedEvent.title}</p>
            <p><strong>Start Date:</strong> {selectedEvent.date}</p>
            <p><strong>End Date:</strong> {selectedEvent.endDate || "-"}</p>
            <p><strong>Time:</strong> {selectedEvent.time}</p>
            <p><strong>Location:</strong> {selectedEvent.place}</p>
            <p><strong>Status:</strong> {selectedEvent.status}</p>
            <p><strong>Event Status:</strong> {selectedEvent.eventStatus || "-"}</p>
            <p><strong>Volunteer Needed:</strong> {selectedEvent.volunteerCount ?? "-"}</p>
            <p><strong>Admin Feedback:</strong> {(selectedEvent.status === 'approved') ? selectedEvent.feedback : "-"}</p>
            <p><em>(Double click anywhere to close)</em></p>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editEvent && (
        <Modal show onHide={() => setEditEvent(null)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control name="title" value={editEvent.title} onChange={handleEditChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" name="date" value={editEvent.date} onChange={handleEditChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Time</Form.Label>
                <Form.Control type="time" name="time" value={editEvent.time} onChange={handleEditChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Place</Form.Label>
                <Form.Control name="place" value={editEvent.place} onChange={handleEditChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditEvent(null)}>Cancel</Button>
            <Button variant="primary" onClick={handleEditSubmit}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
</div>
  );
};

export default HelpSection;
