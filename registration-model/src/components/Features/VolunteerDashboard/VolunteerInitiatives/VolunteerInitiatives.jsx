// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Button, Form, Container, Row, Col, Table } from 'react-bootstrap';
// import axios from 'axios';

// const HelpSection = () => {
//   const { uid } = useParams();
//   const [formVisible, setFormVisible] = useState(false);
//   const [events, setEvents] = useState([]);
//   const [statusFilter, setStatusFilter] = useState("all"); // 'approved', 'disapproved', or ''
  // const [formData, setFormData] = useState({
  //   title: '', description: '', startDate: '', endDate: '',
  //   startTime: '', endTime: '', location: '', category: 'Environmental',
  //   volunteersNeeded: 0, extraVolunteersForHelp: false
  // });
  // const [isUpdating, setIsUpdating] = useState(false);
  // const [eventid, setEventId] = useState();
  

  // const fetchEvents = async () => {
  //   try {
  //     const res = await axios.get(`http://localhost:5000/api/help/user/${uid}/${statusFilter}`);
  
  //     const sortedData = res.data.sort((a, b) => {
  //       // Assign status priority
  //       const statusPriority = status => {
  //         if (status?.toLowerCase() === 'cancelled') return 2;     // lowest priority
  //         if (status?.toLowerCase() === 'completed') return 1;     // medium priority
  //         return 0;                                                 // highest priority
  //       };
  
  //       const priA = statusPriority(a.status);
  //       const priB = statusPriority(b.status);
  
  //       // First: compare status priority
  //       if (priA !== priB) return priA - priB;
  
  //       // Then: sort by startDate ascending
  //       const dateA = new Date(a.startDate);
  //       const dateB = new Date(b.startDate);
  //       return dateA - dateB;
  //     });
  
  //     setEvents(sortedData);
  //   } catch (error) {
  //     console.error("Error fetching events:", error);
  //   }
  // };  
  
  
  // useEffect(() => {
  //   fetchEvents();
  // }, [statusFilter]);

  // const validateForm = () => {
  //   const today = new Date().setHours(0, 0, 0, 0);
  //   const start = new Date(formData.startDate).setHours(0, 0, 0, 0);
  //   const end = new Date(formData.endDate).setHours(0, 0, 0, 0);
  //   console.log(`Time : ${formData.startTime} End Date : ${formData.endTime}`);

  //   if (start < today) {
  //     alert("Start date cannot be in the past.");
  //     return false;
  //   }
    
  //   if (end < start) {
  //     alert("End date cannot be before start date.");
  //     return false;
  //   }
    
  //   if(!formData.startTime || !formData.endTime) {
  //     alert("Please enter Accurate Time");
  //     return false;
  //   }
  
  //   if (formData.startDate === formData.endDate) {
  //     const [startHour, startMin] = formData.startTime.split(':').map(Number);
  //     const [endHour, endMin] = formData.endTime.split(':').map(Number);
  //     if (endHour * 60 + endMin <= startHour * 60 + startMin) {
  //       alert("End time must be after start time.");
  //       return false;
  //     }
  //   }
  
  //   return true;
  // };  


  // const handleCreateOrUpdate = async () => {
  //   if (!validateForm()) return;

  //   console.log(`UID: ${uid} event id : ${eventid}`)
  
  //   try {
  //     if(isUpdating){
  //       await axios.put(`http://localhost:5000/api/help/update/${eventid}`, {
  //         ...formData,
  //         userIdForHelp: uid,
  //       });
  //     }else {
  //       await axios.post('http://localhost:5000/api/help/create', {
  //         ...formData,
  //         userIdForHelp: uid,
  //       });
  //     }
  //     setFormVisible(false);
      // setFormData({
      //   title: '', description: '', startDate: '', endDate: '',
      //   startTime: '', endTime: '', location: '', category: 'Environmental',
      //   volunteersNeeded: 0, extraVolunteersForHelp: false
      // });
  //     fetchEvents();
  //   } catch (err) {
  //     console.error("Error creating event:", err);
  //   }
  // };
  
  // const handleCancelEvent = async (eventId) => {
  //   if (window.confirm('Are you sure you want to delete this event?')) {
  //     try {
  //       await axios.put(`http://localhost:5000/api/events/cancel/${eventId}`);
  //       fetchEvents();
  //     } catch (err) {
  //       console.error('Error Canceling event:', err);
  //       alert('Failed to cancel event');
  //     }
  //   }
  // };

//   return (
//     <Container className="mt-5">
//       <Row className="mb-3">
//         <Col><Button onClick={() => setFormVisible(true)}>Create</Button></Col>
//         <Col><Button variant="success" onClick={() => setStatusFilter("approved")}>Approved</Button></Col>
//         <Col><Button variant="danger" onClick={() => setStatusFilter("disapproved")}>Disapproved</Button></Col>
//         <Col><Button variant="secondary" onClick={() => setStatusFilter("all")}>Show All</Button></Col>
//       </Row>

//       {formVisible && (
//         <Form>
//         <Form.Group>
//           <Form.Label>Title</Form.Label>
//           <Form.Control
//             value={formData.title}
//             onChange={e => setFormData({ ...formData, title: e.target.value })}
//           />
//         </Form.Group>
      
//         <Form.Group>
//           <Form.Label>Description</Form.Label>
          // <Form.Control
          //   as="textarea"
          //   rows={3}
          //   value={formData.description}
          //   onChange={e => setFormData({ ...formData, description: e.target.value })}
          // />
//         </Form.Group>
      
//         <Row>
//           <Col>
//             <Form.Group>
//               <Form.Label>Start Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={formData.startDate}
//                 onChange={e => setFormData({ ...formData, startDate: e.target.value })}
//               />
//             </Form.Group>
//           </Col>
//           <Col>
//             <Form.Group>
//               <Form.Label>End Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={formData.endDate}
//                 onChange={e => setFormData({ ...formData, endDate: e.target.value })}
//               />
//             </Form.Group>
//           </Col>
//         </Row>
      
//         <Row>
//           <Col>
//             <Form.Group>
//               <Form.Label>Start Time</Form.Label>
//               <Form.Control
//                 type="time"
//                 value={formData.startTime}
//                 onChange={e => setFormData({ ...formData, startTime: e.target.value })}
//               />
//             </Form.Group>
//           </Col>
//           <Col>
//             <Form.Group>
//               <Form.Label>End Time</Form.Label>
//               <Form.Control
//                 type="time"
//                 value={formData.endTime}
//                 onChange={e => setFormData({ ...formData, endTime: e.target.value })}
//               />
//             </Form.Group>
//           </Col>
//         </Row>
      
//         <Form.Group>
//           <Form.Label>Location</Form.Label>
//           <Form.Control
//             value={formData.location}
//             onChange={e => setFormData({ ...formData, location: e.target.value })}
//           />
//         </Form.Group>
      
        // <Form.Group>
        //   <Form.Label>Category</Form.Label>
        //   <Form.Select
        //     value={formData.category}
        //     onChange={e => setFormData({ ...formData, category: e.target.value })}
        //   >
        //     <option value="Environmental">Environmental</option>
        //     <option value="Social Service">Social Service</option>
        //     <option value="Education">Education</option>
        //     <option value="Healthcare">Healthcare</option>
        //     <option value="Community">Community</option>
        //   </Form.Select>
        // </Form.Group>
      
//         <Form.Check
//           type="checkbox"
//           label="Extra Volunteers Required"
//           checked={formData.extraVolunteersForHelp}
//           onChange={e => setFormData({ ...formData, extraVolunteersForHelp: e.target.checked })}
//         />
      
        // {formData.extraVolunteersForHelp && (
        //   <Form.Group className="mt-2">
        //     <Form.Label>Volunteers Needed</Form.Label>
        //     <Form.Control
        //       type="number"
        //       min="1"
        //       value={formData.volunteersNeeded}
        //       onChange={e => setFormData({ ...formData, volunteersNeeded: e.target.value })}
        //     />
        //   </Form.Group>
        // )}
      
        // <Button onClick={handleCreateOrUpdate} className="mt-3">Submit</Button>
//       </Form>
      
//       )}

//       <h3 className="mt-4">Events List {statusFilter && `(Filtered: ${statusFilter})`}</h3>
//       <Table striped bordered responsive>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Start Date</th>
//             <th>End Date</th>
//             <th>Location</th>
//             <th>Event Status</th>
//             <th>Volunteers Needed</th>
//             <th>Help Status</th>
//             <th>Feedback from Admin</th>
//             <th>Edit Event</th>
//             <th>Cancel Event</th>
//           </tr>
//         </thead>
//         <tbody>
//           {events.map(ev => (
//             <tr key={ev.id}>
//               <td>{ev.title}</td>
//               <td>{ev.description}</td>
//               <td>{ev.startDate}</td>
//               <td>{ev.endDate}</td>
//               <td>{ev.location}</td>
//               <td>{ev.status}</td>
//               <td>{ev.volunteersNeeded}</td>
//               <td>{ev.helpStatus}</td>
//               <td>
                // {ev.helpStatus === 'pending' ? (
                //   <span className="text-muted fst-italic">Event not yet reviewed</span>
                // ) : (
                //   <span>{ev.helpFeedback || '—'}</span>
                // )}
//               </td>
//               <td>
//                 <Button 
                // disabled={ev.helpStatus === 'approved' || ev.status === "Cancelled" || ev.status === "Completed" ? true : false}
                // onClick={() => {
                //   setEventId(ev.id);
                //   setFormVisible(true);
                //   setIsUpdating(true);
                //   setFormData({...ev})
                // }}>Edit</Button>
//               </td>
//               <td>
//               <Button 
                // disabled={ev.helpStatus === 'approved' || ev.status === "Cancelled" || ev.status === "Completed" ? true : false}
                // onClick={() => {handleCancelEvent(ev.id)}}>
//                   Cancel
//               </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default HelpSection;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button, Form, Container, Row, Col, Table,
  Dropdown, DropdownButton
} from 'react-bootstrap';
import axios from 'axios';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { BsCalendarEvent, BsPlusLg } from 'react-icons/bs';
import { isPendingUser, isReadOnlyMode } from '../../../../utils/userPermissions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HelpSection = () => {
  const { uid } = useParams();
  const [formVisible, setFormVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', startDate: '', endDate: '',
    startTime: '', endTime: '', location: '', category: 'Environmental',
    volunteersNeeded: 0, extraVolunteersForHelp: false
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [eventid, setEventId] = useState();

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
      const res = await axios.get(`api/help/user/${uid}/${statusFilter}`);
  
      const sortedData = res.data.sort((a, b) => {
        const statusPriority = status => {
          if (status?.toLowerCase() === 'cancelled') return 2;
          if (status?.toLowerCase() === 'completed') return 1;
          return 0;
        };
        const priA = statusPriority(a.status);
        const priB = statusPriority(b.status);
        if (priA !== priB) return priA - priB;
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

    if(formData.extraVolunteersForHelp && formData.volunteersNeeded == 0) {
      alert("Please enter minimum 1 volunteer or uncheck the extra volunteers option");
      return false;
    }
    return true;
  };  

  const handleCreateClick = () => {
    if (isPendingUser()) {
      toast.error("You are not authorized yet. Your account is pending approval.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    setFormVisible(true);
  };

  const handleEditClick = (event) => {
    if (isPendingUser()) {
      toast.error("You are not authorized yet. Your account is pending approval.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    setEventId(event.id);
    setFormVisible(true);
    setIsUpdating(true);
    setFormData({ ...event });
  };

  const handleDeleteClick = (eventId) => {
    if (isPendingUser()) {
      toast.error("You are not authorized yet. Your account is pending approval.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    handleCancelEvent(eventId);
  };

  const handleCreateOrUpdate = async () => {
    if (!validateForm()) return;
  
    try {
      if(isUpdating){
        await axios.put(`api/help/update/${eventid}`, {
          ...formData,
          userIdForHelp: uid,
        });
      } else {
        await axios.post('api/help/create', {
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
      console.error("Error creating/updating event:", err);
      if (err.response?.status === 403) {
        alert(err.response.data.message || "You don't have permission to perform this action.");
      } else {
        alert("Error creating/updating event. Please try again.");
      }
    }
  };
  
  const handleCancelEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        // Use the help-specific cancel endpoint since these are help events
        await axios.put(`api/help/cancel/${eventId}`);
        fetchEvents();
      } catch (err) {
        console.error('Error Canceling event:', err);
        if (err.response?.status === 403) {
          alert(err.response.data.message || "You don't have permission to perform this action.");
        } else {
          alert('Failed to cancel event');
        }
      }
    }
  };

  return (
    <div className="main-content">
      <Container className="mt-4 pt-4 ">
        {/* Header and Action Row */}
        <Row className="align-items-center justify-content-between mb-4 flex-wrap">
          <Col xs={12} md="auto" className="mb-2 mb-md-0">
            <h2 className="events-heading d-flex align-items-center">
              <BsCalendarEvent className="me-2" />
              Events List
            </h2>
          </Col>

          <Col xs={12} md="auto" className="d-flex gap-2 justify-content-md-end justify-content-start mt-2 mt-md-0 flex-wrap">
            <Button 
              className="unified-btn me-2" 
              onClick={handleCreateClick}
              title={isPendingUser() ? "Account pending approval - Read-only access" : "Create new event"}
            >
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
              <Dropdown.Item eventKey="all">All</Dropdown.Item>
              <Dropdown.Item eventKey="approved" style={{ color: 'green', fontWeight: 'bold' }}>Approved</Dropdown.Item>
              <Dropdown.Item eventKey="disapproved" style={{ color: 'red', fontWeight: 'bold' }}>Disapproved</Dropdown.Item>
              <Dropdown.Item eventKey="pending" style={{ color: 'black', fontWeight: 'bold' }}>Pending</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>

        {/* Create Form Modal */}
        {formVisible && (
          <div className="glass-popup-overlay">
            <div
              className="glass-card"
              onClick={e => e.stopPropagation()}
              style={{
                maxHeight: '85vh',
                overflowY: 'auto',
                paddingRight: '10px'
              }}
            >
              <Form>
                <h3 className="mb-4">{isUpdating ? "Update Event" : "Create New Event"}</h3>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control type="date" value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control type="date" value={formData.endDate} onChange={e => setFormData({ ...formData, endDate: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
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
                <Form.Group className="mb-3">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control type="time" value={formData.startTime} onChange={e => setFormData({ ...formData, startTime: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control type="time" value={formData.endTime} onChange={e => setFormData({ ...formData, endTime: e.target.value })} />
                </Form.Group>

                <Form.Check
                  type="checkbox"
                  label="Extra Volunteers Required"
                  checked={formData.extraVolunteersForHelp}
                  onChange={e => setFormData({ ...formData, extraVolunteersForHelp: e.target.checked })}
                  className="mb-4"
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
                <div className="d-flex justify-content-end gap-2 flex-wrap">
                  <button className='custom-cancel-btn' onClick={() => {
                    setFormVisible(false);
                    setFormData({
                      title: '', description: '', startDate: '', endDate: '',
                      startTime: '', endTime: '', location: '', category: 'Environmental',
                      volunteersNeeded: 0, extraVolunteersForHelp: false
                    });
                  }}>Cancel</button>
                  <button type="button" className='custom-submit-btn' onClick={handleCreateOrUpdate}>Submit</button>
                </div>
              </Form>
            </div>
          </div>
        )}

        {/* Scrollable Table Section */}
        <div className="table-scroll-container">
          <Table bordered className='table-bordered-blue table-rounded'>
            <thead className="table-header-maroon">
              <tr>
                <th>Title</th>
                <th>Start Date</th>
                <th>Location</th>
                <th>Help Status</th>
                <th>Feedback</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => {
                const rowColor = index % 2 === 0 ? '#FFFFFF' : '#cef6ff';
                const statusColor = (() => {
                  switch (event.helpStatus.trim().toLowerCase()) {
                    case 'approved':
                      return 'green'; 
                    case 'pending':
                      return 'black'; 
                    case 'disapproved':
                      return 'red'; 
                    default:
                      return 'black'; 
                  }
                })();

                return (
                  <tr key={event.id}>
                    <td style={{ backgroundColor: rowColor }}>{event.title}</td>
                    <td style={{ backgroundColor: rowColor }}>{event.startDate}</td>
                    <td style={{ backgroundColor: rowColor }}>{event.location}</td>
                    <td style={{ backgroundColor: rowColor, color: statusColor, fontWeight: 'bold' }}>
                      {event.helpStatus.trim().toLowerCase().charAt(0).toUpperCase() + event.helpStatus.trim().toLowerCase().slice(1)}
                    </td>
                    <td style={{ backgroundColor: rowColor }}>
                      {event.status === 'Cancelled' || event.status === 'Completed' ? "--" :
                        event.helpStatus.trim().toLowerCase() === 'pending' ? (
                          <span className="text-muted fst-italic">Event not yet reviewed</span>
                        ) : (
                          <span>{event.helpFeedback || '—'}</span>
                        )}
                    </td>
                    <td style={{ backgroundColor: rowColor, textAlign: 'center' }}>
                      <Button variant="link" onClick={() => setSelectedEvent(event)} style={{ ...btnStyle, color: '#cd2468' }}>
                        <FaEye style={iconStyle} /> View
                      </Button>
                      <span style={dividerStyle}>|</span>
                      <Button
                        variant="link"
                        disabled={event.helpStatus === 'approved' || event.status === "Cancelled" || event.status === "Completed"}
                        onClick={() => handleEditClick(event)}
                        style={{
                          ...btnStyle,
                          color: (event.status === 'pending' || event.status === 'disapproved') ? '#007bff' : '#aaa'
                        }}
                        title={isPendingUser() ? "Account pending approval - Read-only access" : "Edit event"}
                      >
                        <FaEdit style={iconStyle} />
                      </Button>
                      <span style={dividerStyle}>|</span>
                      <Button
                        variant="link"
                        disabled={event.helpStatus === 'approved' || event.status === "Cancelled" || event.status === "Completed"}
                        onClick={() => handleDeleteClick(event.id)}
                        style={{ ...btnStyle, color: '#fa424a' }}
                        title={isPendingUser() ? "Account pending approval - Read-only access" : "Delete event"}
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
              <p><strong>Description:</strong> {selectedEvent.description}</p>
              <p><strong>Start Date:</strong> {selectedEvent.startDate}</p>
              <p><strong>End Date:</strong> {selectedEvent.endDate || "-"}</p>
              <p><strong>Start Time:</strong> {selectedEvent.startTime}</p>
              <p><strong>End Time:</strong> {selectedEvent.endTime}</p>
              <p><strong>Location:</strong> {selectedEvent.location}</p>
              <p><strong>Event Status:</strong> {selectedEvent.status}</p>
              <p><strong>Help Status:</strong> {selectedEvent.helpStatus ? selectedEvent.helpStatus.trim().toLowerCase().charAt(0).toUpperCase() + selectedEvent.helpStatus.trim().toLowerCase().slice(1) : "-"}</p>
              <p><strong>Volunteer Needed:</strong> {selectedEvent.volunteersNeeded}</p>
              <p><strong>Admin Feedback:</strong> {
                selectedEvent.helpStatus && selectedEvent.helpStatus.trim().toLowerCase() === 'pending' ? (
                  <span className="text-muted fst-italic">Event not yet reviewed</span>
                ) : (
                  <span>{selectedEvent.helpFeedback || '—'}</span>
                )
              }</p>
              <p><em>(Double click anywhere to close)</em></p>
            </div>
          </div>
        )}
      </Container>
      <ToastContainer />
    </div>
  );
};

export default HelpSection;