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
    volunteersNeeded: 0, extraVolunteersForHelp: false
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [eventid, setEventId] = useState();
  

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/help/user/${uid}/${statusFilter}`);
  
      const sortedData = res.data.sort((a, b) => {
        // Assign status priority
        const statusPriority = status => {
          if (status?.toLowerCase() === 'cancelled') return 2;     // lowest priority
          if (status?.toLowerCase() === 'completed') return 1;     // medium priority
          return 0;                                                 // highest priority
        };
  
        const priA = statusPriority(a.status);
        const priB = statusPriority(b.status);
  
        // First: compare status priority
        if (priA !== priB) return priA - priB;
  
        // Then: sort by startDate ascending
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateA - dateB;
      });
  
      setEvents(sortedData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };  
  
  
  useEffect(() => {
    fetchEvents();
  }, [statusFilter]);

  const validateForm = () => {
    const today = new Date().setHours(0, 0, 0, 0);
    const start = new Date(formData.startDate).setHours(0, 0, 0, 0);
    const end = new Date(formData.endDate).setHours(0, 0, 0, 0);
    console.log(`Time : ${formData.startTime} End Date : ${formData.endTime}`);

    if (start < today) {
      alert("Start date cannot be in the past.");
      return false;
    }
    
    if (end < start) {
      alert("End date cannot be before start date.");
      return false;
    }
    
    if(!formData.startTime || !formData.endTime) {
      alert("Please enter Accurate Time");
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


  const handleCreateOrUpdate = async () => {
    if (!validateForm()) return;

    console.log(`UID: ${uid} event id : ${eventid}`)
  
    try {
      if(isUpdating){
        await axios.put(`http://localhost:5000/api/help/update/${eventid}`, {
          ...formData,
          userIdForHelp: uid,
        });
      }else {
        await axios.post('http://localhost:5000/api/help/create', {
          ...formData,
          userIdForHelp: uid,
        });
      }
      setFormVisible(false);
      setFormData({
        title: '', description: '', startDate: '', endDate: '',
        startTime: '', endTime: '', location: '', category: 'Environmental',
        volunteersNeeded: 0, extraVolunteersForHelp: false
      });
      fetchEvents();
    } catch (err) {
      console.error("Error creating event:", err);
    }
  };
  
  const handleCancelEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.put(`http://localhost:5000/api/events/cancel/${eventId}`);
        fetchEvents();
      } catch (err) {
        console.error('Error Canceling event:', err);
        alert('Failed to cancel event');
      }
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
          checked={formData.extraVolunteersForHelp}
          onChange={e => setFormData({ ...formData, extraVolunteersForHelp: e.target.checked })}
        />
      
        {formData.extraVolunteersForHelp && (
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
      
        <Button onClick={handleCreateOrUpdate} className="mt-3">Submit</Button>
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
            <th>Location</th>
            <th>Event Status</th>
            <th>Volunteers Needed</th>
            <th>Help Status</th>
            <th>Feedback from Admin</th>
            <th>Edit Event</th>
            <th>Cancel Event</th>
          </tr>
        </thead>
        <tbody>
          {events.map(ev => (
            <tr key={ev.id}>
              <td>{ev.title}</td>
              <td>{ev.description}</td>
              <td>{ev.startDate}</td>
              <td>{ev.endDate}</td>
              <td>{ev.location}</td>
              <td>{ev.status}</td>
              <td>{ev.volunteersNeeded}</td>
              <td>{ev.helpStatus}</td>
              <td>
                {ev.helpStatus === 'pending' ? (
                  <span className="text-muted fst-italic">Event not yet reviewed</span>
                ) : (
                  <span>{ev.helpFeedback || '—'}</span>
                )}
              </td>
              <td>
                <Button 
                disabled={ev.helpStatus === 'approved' || ev.status === "Cancelled" || ev.status === "Completed" ? true : false}
                onClick={() => {
                  setEventId(ev.id);
                  setFormVisible(true);
                  setIsUpdating(true);
                  setFormData({...ev})
                }}>Edit</Button>
              </td>
              <td>
              <Button 
                disabled={ev.helpStatus === 'approved' || ev.status === "Cancelled" || ev.status === "Completed" ? true : false}
                onClick={() => {handleCancelEvent(ev.id)}}>
                  Cancel
              </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default HelpSection;