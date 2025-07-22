// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Modal, Table, Button, Container, Form } from 'react-bootstrap';
// import axios from 'axios';

// const Help = () => {
  // const { uid } = useParams();
  // const [events, setEvents] = useState([]);

  // const [showModal, setShowModal] = useState(false);
  // const [currentStatus, setCurrentStatus] = useState('');
  // const [currentEventId, setCurrentEventId] = useState(null);
  // const [feedbackMessage, setFeedbackMessage] = useState('');

  // const handleSubmitStatusChange = () => {
  //   if (feedbackMessage.trim() === '') {
  //     alert("Feedback message cannot be empty.");
  //     return;
  //   }

  //   handleStatusChange(currentEventId, currentStatus, feedbackMessage.trim());
  //   setShowModal(false);
  //   setFeedbackMessage('');
  // };

  // useEffect(() => {
  //   fetchEvents();
  // }, []);

  // const fetchEvents = async () => {
  //   try {
  //     const res = await axios.get('http://localhost:5000/api/help/all');
  //     console.log(res.data)
  //     setEvents(res.data);
  //   } catch (error) {
  //     console.error('Failed to fetch help events:', error);
  //   }
  // };

  // const handleStatusChange = async (id, status, message) => {
  //   try {
  //     console.log(message);
  //     await axios.put(`http://localhost:5000/api/help/status/${id}`, { status, message });
  //     fetchEvents();
  //   } catch (error) {
  //     console.error('Failed to update status:', error);
  //   }
  // };

//   return (
//     <Container className="mt-5">
//       <h2>Admin Dashboard</h2>
//       <p>Logged in as UID: {uid}</p>
//       <Table striped bordered responsive>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Start Date</th>
//             <th>End Date</th>
//             <th>Location</th>
//             <th>Volunteers Needed</th>
//             <th>Event Status</th>
//             <th>Help Status</th>
//             <th>FeedBack</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {events.map(ev => (
//             <tr key={ev.userId}>
//               <td>{ev.userId?.name || '-'}</td>
//               <td>{ev.title}</td>
//               <td>{ev.description}</td>
//               <td>{ev.startDate}</td>
//               <td>{ev.endDate}</td>
//               <td>{ev.location}</td>
//               <td>{ev.volunteersNeeded}</td>
//               <td>{ev.status}</td>
//               <td>{ev.helpStatus}</td>
//               <td>{ev.helpStatus === 'pending' ? (
//                   <span className="text-muted fst-italic">Add feedback by approving or disapproving</span>
//                 ) : (
//                   <span>{ev.helpFeedback || '—'}</span>
//                 )}</td>
//               <td>
//                 {ev.helpStatus === "approved" ? (
//                   <span className="text-success fw-bold">Approved</span>
//                 ) : ev.helpStatus === "disapproved" ? (
//                   <span className="text-danger fw-bold">Disapproved</span>
//                 ) :(
//                   <>
//                     <Button
//                       variant="success"
//                       size="sm"
//                       onClick={() => {
//                         setCurrentStatus("approved");
//                         setCurrentEventId(ev.id);
//                         setShowModal(true);
//                       }}
//                     >
//                       Approve
//                     </Button>{' '}
//                     <Button
//                       variant="danger"
//                       size="sm"
                      // onClick={() => {
                      //   setCurrentStatus("disapproved");
                      //   setCurrentEventId(ev.id);
                      //   setShowModal(true);
                      // }}
//                     >
//                       Disapprove
//                     </Button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

      // <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      //   <Modal.Header closeButton>
      //     <Modal.Title>Provide Feedback</Modal.Title>
      //   </Modal.Header>
      //   <Modal.Body>
      //     <Form.Group>
      //       <Form.Label>Feedback Message</Form.Label>
      //       <Form.Control
      //         as="textarea"
      //         rows={3}
      //         value={feedbackMessage}
      //         onChange={(e) => setFeedbackMessage(e.target.value)}
      //         placeholder="Enter your feedback..."
      //       />
      //     </Form.Group>
      //   </Modal.Body>
      //   <Modal.Footer>
      //     <Button variant="secondary" onClick={() => setShowModal(false)}>
      //       Cancel
      //     </Button>
      //     <Button variant="primary" onClick={handleSubmitStatusChange}>
      //       Submit
      //     </Button>
      //   </Modal.Footer>
      // </Modal>

//     </Container>
//   );
// };

// export default Help;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { BsCalendarEvent, BsCheck2Circle, BsXCircle } from 'react-icons/bs';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';


const AdminHelp = () => {
  const { uid } = useParams();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('');
  const [currentEventId, setCurrentEventId] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmitStatusChange = () => {
    if (feedbackMessage.trim() === '') {
      alert("Feedback message cannot be empty.");
      return;
    }

    handleStatusChange(currentEventId, currentStatus, feedbackMessage.trim());
    setShowModal(false);
    setFeedbackMessage('');
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('api/help/all');
      console.log(res.data)
      setEvents(res.data);
    } catch (error) {
      console.error('Failed to fetch help events:', error);
    }
  };

  const handleStatusChange = async (id, status, message) => {
    try {
      console.log(message);
      await axios.put(`api/help/status/${id}`, { status, message });
      fetchEvents();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <div className='main-content'>
    <Container className="mt-5">
      <Row className="align-items-center justify-content-between mb-4">
        <Col>
          <h3 className="events-heading">
            <BsCalendarEvent style={{ marginRight: '10px' }} />
            Help Requests
          </h3>
        </Col>
      </Row>

      <div className="table-scroll-container">
  <Table bordered className="table-bordered-blue table-rounded">
    <thead className="table-header-maroon">
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Title</th>
        <th>Start Date</th>
        <th>Status</th>
        <th>Feedback</th>
        <th style={{ textAlign: 'center' }}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {events.map((ev, index) => {
        const rowColor = index % 2 === 0 ? '#ffffff' : '#e6f7ff';
        return (
          <tr key={ev.id}>
            <td style={{ backgroundColor: rowColor }}>{ev.userId?.name || '-'}</td>
            <td style={{ backgroundColor: rowColor }}>{ev.userId?.email || '-'}</td>
            <td style={{ backgroundColor: rowColor }}>{ev.userId?.mobileNo || '-'}</td>
            <td style={{ backgroundColor: rowColor }}>{ev.title}</td>
            <td style={{ backgroundColor: rowColor }}>{ev.startDate}</td>
            <td style={{ backgroundColor: rowColor }}>
              {ev.helpStatus.charAt(0).toUpperCase() + ev.helpStatus.slice(1)}
            </td>
            <td style={{ backgroundColor: rowColor }}>
              {ev.helpStatus === 'pending' ? (
                <span className="text-muted fst-italic">Add feedback by approving or disapproving</span>
              ) : (
                <span>{ev.helpFeedback || '—'}</span>
              )}
            </td>
            <td style={{ backgroundColor: rowColor }}>
              <div className="d-flex gap-2 justify-content-center">
                <Button variant="outline-info" size="sm" onClick={() => setSelectedEvent(ev)}>
                  <FaEye />
                </Button>
                <Button
                  variant={ev.helpStatus === 'approved' ? 'success' : 'outline-success'}
                  size="sm"
                  onClick={() => {
                    setCurrentStatus("approved");
                    setCurrentEventId(ev.id);
                    setShowModal(true);
                  }}
                >
                  <BsCheck2Circle />
                </Button>
                <Button
                  variant={ev.helpStatus === 'disapproved' ? 'danger' : 'outline-danger'}
                  size="sm"
                  onClick={() => {
                    setCurrentStatus("disapproved");
                    setCurrentEventId(ev.id);
                    setShowModal(true);
                  }}
                >
                  <BsXCircle />
                </Button>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  </Table>
</div>



      {/* View Event Modal */}
      {selectedEvent && (
        <Modal show onHide={() => setSelectedEvent(null)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Event Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Title:</strong> {selectedEvent.title}</p>
            <p><strong>Start Date:</strong> {selectedEvent.startDate}</p>
            <p><strong>End Date:</strong> {selectedEvent.endDate || '-'}</p>
            <p><strong>Start Time:</strong> {selectedEvent.startTime}</p>
            <p><strong>End Time:</strong> {selectedEvent.endTime}</p>
            <p><strong>Location:</strong> {selectedEvent.location}</p>
            <p><strong>Volunteers Needed:</strong> {selectedEvent.volunteersNeeded}</p>
            <p><strong>Event Status:</strong> {selectedEvent.status}</p>
            <p><strong>Help Status:</strong> {selectedEvent.helpStatus}</p>
            <p><strong>FeedBack:</strong> {selectedEvent.helpStatus === 'pending' ? (
                  <span className="text-muted fst-italic">Add feedback by approving or disapproving</span>
                ) : (
                  <span>{selectedEvent.helpFeedback || '—'}</span>
                )}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedEvent(null)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Provide Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Feedback Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
              placeholder="Enter your feedback..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <button className='custom-cancel-btn' onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className='custom-submit-btn' onClick={handleSubmitStatusChange}>
            Submit
          </button>
        </Modal.Footer>
      </Modal>


    </Container>
    </div>
  );
};

export default AdminHelp;