import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { BsCalendarEvent } from 'react-icons/bs';
import { BsCheck2Circle, BsXCircle } from 'react-icons/bs';


const AdminHelp = () => {
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
      <Row className="align-items-center justify-content-between mb-4">
        <Col>
          <h3 className="events-heading">
            <BsCalendarEvent style={{ marginRight: '10px' }} />
            Help Requests
          </h3>
        </Col>
        <Col className="text-end fw-semibold text-muted">
          UID: {uid}
        </Col>
      </Row>

      <div style={{ maxHeight: '450px', overflowY: 'auto' }}>
        <Table bordered responsive className="table-bordered-blue">
          <thead className="table-header-maroon">
            <tr>
              <th>Name</th><th>Email</th><th>Phone</th>
              <th>Title</th><th>Date</th><th>Time</th><th>Place</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev, index) => {
              const rowColor = index % 2 === 0 ? '#ffffff' : '#e6f7ff';
              return (
                <tr key={ev._id}>
                  <td style={{ backgroundColor: rowColor }}>{ev.userId?.name || '-'}</td>
                  <td style={{ backgroundColor: rowColor }}>{ev.userId?.email || '-'}</td>
                  <td style={{ backgroundColor: rowColor }}>{ev.userId?.mobileNo || '-'}</td>
                  <td style={{ backgroundColor: rowColor }}>{ev.title}</td>
                  <td style={{ backgroundColor: rowColor }}>{ev.date}</td>
                  <td style={{ backgroundColor: rowColor }}>{ev.time}</td>
                  <td style={{ backgroundColor: rowColor }}>{ev.place}</td>
                  <td style={{ backgroundColor: rowColor }}>
                  <td style={{ backgroundColor: rowColor }}>
                   <div className="d-flex gap-2">
                    <Button
                    variant={ev.status === 'approved' ? 'success' : 'outline-success'}
                    size="sm"
                    className={ev.status === 'approved' ? 'fw-bold' : 'border-2'}
                    onClick={() => handleStatusChange(ev._id, 'approved')}
                    >
                    <BsCheck2Circle className="me-1" />
                    {ev.status === 'approved' ? 'Approved' : 'Approve'}
                    </Button>

                    <Button
                    variant={ev.status === 'disapproved' ? 'danger' : 'outline-danger'}
                    size="sm"
                    className={ev.status === 'disapproved' ? 'fw-bold' : 'border-2'}
                    onClick={() => handleStatusChange(ev._id, 'disapproved')}
                    >
                    <BsXCircle className="me-1" />
                  {ev.status === 'disapproved' ? 'Disapproved' : 'Disapprove'}
               </Button>
                 </div>
                 </td>
                 </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default AdminHelp;

