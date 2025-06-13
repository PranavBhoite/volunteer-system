import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button, Container } from 'react-bootstrap';
import axios from 'axios';

const Help = () => {
  const { uid } = useParams();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/help/all');
      setEvents(res.data);
    } catch (error) {
      console.error('Failed to fetch help events:', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/help/status/${id}`, { status });
      fetchEvents();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Admin Dashboard</h2>
      <p>Logged in as UID: {uid}</p>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th>
            <th>Title</th><th>Date</th><th>Time</th><th>Place</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(ev => (
            <tr key={ev._id}>
              <td>{ev.userId?.name || '-'}</td>
              <td>{ev.userId?.email || '-'}</td>
              <td>{ev.userId?.mobileNo || '-'}</td>
              <td>{ev.title}</td>
              <td>{ev.date}</td>
              <td>{ev.time}</td>
              <td>{ev.place}</td>
              <td>
                {ev.status === 'approved' ? (
                  <span className="text-success fw-bold">Approved</span>
                ) : (
                  <>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleStatusChange(ev._id, 'approved')}
                    >
                      Approve
                    </Button>{' '}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleStatusChange(ev._id, 'disapproved')}
                    >
                      Disapprove
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Help;
