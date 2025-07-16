import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './VolunteerView.css';

const VolunteerView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [events, setEvents] = useState([]);
  const [eventType, setEventType] = useState("Upcoming");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {uid} = useParams();

  useEffect(() => {
    fetchEvents(eventType);
  }, []);

  const fetchEvents = async (type) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/events/${uid}/${type}`);
      const transformedEvents = response.data.map(event => ({
        ...event,
      }));
      setEvents(transformedEvents);
    } catch (err) {
      setError('Failed to fetch events');
      console.error('Error fetching events:', err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventid) => {
    try {
      const registerType = eventType === "Upcoming" ? 'register' : 'unregister';
      const response = await axios.post(`http://localhost:5000/api/events/${registerType}`, {userId : uid, eventId : eventid});
      fetchEvents(eventType);
    } catch (err) {
      console.error('Registration failed:', err);
      alert(err.response?.data?.message || 'Failed to register for event');
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleEventType = (type) => {
    setEventType(type);
    fetchEvents(type);
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-box">
          <div className="spinner"></div>
          <div className="loading-text">Loading events...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-container">
        <div className="error-box">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <div className="volunteer-container">
        <div className="search-section">
          <div className="search-row">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              <option value="all">All Categories</option>
              <option value="Environmental">Environmental</option>
              <option value="Social Service">Social Service</option>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Community">Community</option>
            </select>
          </div>
          <div className="event-type-buttons">
            {['Ongoing','Upcoming', 'Registered', 'Completed'].map(type => (
              <button
                key={type}
                onClick={() => toggleEventType(type)}
                className={`event-type-btn ${eventType === type ? 'active' : ''}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="events-grid">
            {filteredEvents.map(event => (
              <div key={event.id} className="event-card">
                <div className="event-category">{event.category}</div>
                <div className="event-header">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                </div>
                <div className="event-details">
                  <div>📅 <strong>Start Date:</strong> {event.startDate}</div>
                  <div>📅 <strong>End Date:</strong> {event.endDate}</div>
                  <div>🕒 <strong>Start Time:</strong> {event.startTime}</div>
                  <div>🕒 <strong>End Time:</strong> {event.endTime}</div>
                  <div>📍 {event.location}</div>
                </div>
                {eventType !== "Completed" && eventType !== "Ongoing" && (
                  <p className="progress-text">{event.volunteersNeeded} volunteers Needed</p>
                )}
                <div className="event-actions">
                  {eventType !== "Completed" && eventType !== "Ongoing" && (
                    <button
                      onClick={() => handleRegister(event.id)}
                      disabled={eventType === "Upcoming" && event.volunteersNeeded <= 0}
                      className={`action-btn ${eventType === "Upcoming" && event.volunteersNeeded <= 0 ? 'disabled' : eventType === 'Upcoming' ? 'register' : 'unregister'}`}
                    >
                      {eventType === "Upcoming"
                        ? (event.volunteersNeeded <= 0 ? 'Event Full' : 'Register')
                        : 'Unregister'}
                    </button>
                  )}
                  {eventType === "Registered" && (
                    <button className="schedule-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      Schedule
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-events">
            <div className="no-events-icon">📋</div>
            <h3>No events found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerView;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const VolunteerView = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [events, setEvents] = useState([]);
//   const [eventType, setEventType] = useState("Upcoming");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [clickedButton, setClickedButton] = useState(null);
//   const { uid } = useParams();

//   useEffect(() => {
//     fetchEvents(eventType);
//   }, []);

//   const fetchEvents = async (type) => {
//     setLoading(true);
//     console.log(`Fetching type: ${type}`); 

//     try {
//       const response = await axios.get(`http://localhost:5000/api/events/${uid}/${type}`);
      
//       // Transform the data to match your frontend expectations
//       const transformedEvents = response.data.map(event => ({
//         ...event,
//       }));
      
//       setEvents(transformedEvents);
//     } catch (err) {
//       setError('Failed to fetch events');
//       console.error('Error fetching events:', err.response ? err.response.data : err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegister = async (eventid) => {
//     try {
//       console.log("Started registration");
//       const registerType = eventType === "Upcoming" ? 'register' : 'unregister';
//       const response = await axios.post(`http://localhost:5000/api/events/${registerType}`, {userId : uid, eventId : eventid});
//       console.log("Response recieved");
//       fetchEvents(eventType);
//       console.log(response);
//     } catch (err) {
//       console.error('Registration failed:', err);
//       alert(err.response?.data?.message || 'Failed to register for event');
//     }
//   };

//   const filteredEvents = events.filter(event => {
//     const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const toggleEventType = (type) => {
//     setEventType(type);
//     fetchEvents(type);
//   }

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-box">
//           <div className="spinner"></div>
//           <div className="loading-text">Loading events...</div>
//         </div>

//         <style>{`
//           .loading-container {
//             min-height: 100vh;
//             background: #f8f9fa;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-family: sans-serif;
//             padding: 20px;
//           }
//           .loading-box {
//             text-align: center;
//             padding: 40px;
//             border-radius: 12px;
//             background: white;
//             box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//             width: 100%;
//             max-width: 320px;
//           }
//           .spinner {
//             width: 50px;
//             height: 50px;
//             border: 4px solid #e2e8f0;
//             border-top: 4px solid #0891b2;
//             border-radius: 50%;
//             animation: spin 1s linear infinite;
//             margin: 0 auto 20px;
//           }
//           .loading-text {
//             color: #64748b;
//             font-size: 1.1rem;
//           }
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}</style>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="error-container">
//         <div className="error-box">
//           {error}
//         </div>
//         <style>{`
//           .error-container {
//             min-height: 100vh;
//             background: #f8f9fa;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-family: sans-serif;
//             padding: 20px;
//           }
//           .error-box {
//             text-align: center;
//             padding: 40px;
//             border-radius: 12px;
//             background: white;
//             box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//             border: 1px solid #fecaca;
//             color: #dc2626;
//             width: 100%;
//             max-width: 320px;
//           }
//         `}</style>
//       </div>
//     );
//   }

//   return (
//     <div className="volunteer-view-container, main-content">
  
//       {/* Search & Filters */}
//       <div className="search-filters">
//         <div className="search-filter-row">
//           <input
//             type="text"
//             placeholder="Search"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="search-input"
//           />
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="category-select"
//           >
//             <option value="all">All Categories</option>
//             <option value="Environmental">Environmental</option>
//             <option value="Social Service">Social Service</option>
//             <option value="Education">Education</option>
//             <option value="Healthcare">Healthcare</option>
//             <option value="Community">Community</option>
//           </select>
//         </div>
  
//         <div className="event-type-buttons">
//           {['Ongoing', 'Upcoming', 'Registered', 'Completed'].map(type => (
//             <button
//               key={type}
//               onClick={() => toggleEventType(type)}
//               className={`event-type-btn ${eventType === type ? 'active' : ''} ${clickedButton === type ? 'clicked' : ''}`}
//             >
//               {type}
//             </button>
//           ))}
//         </div>
//       </div>
  
//       {/* Events */}
//       {filteredEvents.length > 0 ? (
//         <div className="events-grid">
//           {filteredEvents.map(event => (
//             <div key={event.id} className="event-card">
//               <div className="event-category">{event.category}</div>
  
//               <div className="event-header">
//                 <h3>{event.title}</h3>
//                 <p>{event.description}</p>
//               </div>
  
//               <div className="event-details">
//                 <div>📅 Start Date: {event.startDate}</div>
//                 <div>📅 End Date: {event.endDate}</div>
//                 <div>🕒 Start Time: {event.startTime}</div>
//                 <div>🕒 End Time: {event.endTime}</div>
//                 <div>📍 {event.location}</div>
//               </div>
  
//               {eventType !== "Completed" && eventType !== "Ongoing" && (
//                 <>
//                   <p className="progress-text">
//                     {event.volunteersNeeded} volunteers Needed
//                   </p>
//                 </>
//               )}
  
//               <div className="event-action-buttons">
//                 {eventType !== "Completed" && eventType !== "Ongoing" && (
//                   <button
//                     onClick={() => handleRegister(event.id)}
//                     disabled={eventType === "Upcoming" && event.volunteersNeeded <= 0}
//                     className={`register-btn ${eventType === "Upcoming" ? 'register' : 'unregister'}`}
//                   >
//                     {eventType === "Upcoming"
//                       ? (event.volunteersNeeded <= 0 ? 'Event Full' : 'Register')
//                       : 'Unregister'}
//                   </button>
//                 )}
  
//                 {eventType === "Registered" && (
//                   <button
//                     onClick={() => {}}
//                     className="schedule-btn"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="16"
//                       height="16"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
//                       <line x1="16" y1="2" x2="16" y2="6"></line>
//                       <line x1="8" y1="2" x2="8" y2="6"></line>
//                       <line x1="3" y1="10" x2="21" y2="10"></line>
//                     </svg>
//                     Schedule
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="no-events">
//           <div className="no-events-icon">📋</div>
//           <h3>No events found</h3>
//           <p>Try adjusting your search or filter criteria</p>
//         </div>
//       )}

//       {/* Styles */}
//       <style>{`
//         .volunteer-view-container {
//           min-height: 100vh;
//           background: #f8f9fa;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           padding: 24px;
//           box-sizing: border-box;
//         }
//         /* Search & Filters */
//         .search-filters {
//           background: white;
//           border-radius: 12px;
//           padding: 24px;
//           margin-bottom: 24px;
//           box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//         }
//         .search-filter-row {
//           display: grid;
//           grid-template-columns: 1fr 200px;
//           gap: 16px;
//           align-items: center;
//           margin-bottom: 20px;
//         }
//         .search-input, .category-select {
//           padding: 12px 16px;
//           border-radius: 8px;
//           border: 1px solid #d1d5db;
//           font-size: 14px;
//           background: #f9fafb;
//           box-sizing: border-box;
//           width: 100%;
//         }
//         .category-select {
//           background: white;
//         }
//         .event-type-buttons {
//           display: flex;
//           gap: 4px;
//           flex-wrap: wrap;
//         }
//         .event-type-btn {
//           padding: 10px 20px;
//           background: transparent;
//           border-radius: 8px;
//           font-size: 14px;
//           font-weight: 500;
//           color: #64748b;
//           border: none;
//           cursor: pointer;
//           user-select: none;
//           transition: transform 0.2s ease, background 0.2s ease;
//         }
//         .event-type-btn.active {
//           background: #be185d;
//           color: white;
//         }
//         .event-type-btn.clicked {
//           transform: scale(0.95);
//         }
//         /* Events Grid */
//         .events-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
//           gap: 20px;
//         }
//         .event-card {
//           background: white;
//           border-radius: 12px;
//           padding: 24px;
//           box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//           border: 1px solid #f1f5f9;
//           position: relative;
//           display: flex;
//           flex-direction: column;
//         }
//         .event-category {
//           position: absolute;
//           top: 16px;
//           right: 16px;
//           background: #0891b2;
//           color: white;
//           padding: 4px 12px;
//           border-radius: 12px;
//           font-size: 12px;
//           white-space: nowrap;
//         }
//         .event-header h3 {
//           font-size: 1.25rem;
//           font-weight: 600;
//           color: #1e293b;
//           margin: 0 0 8px 0;
//         }
//         .event-header p {
//           font-size: 14px;
//           color: #64748b;
//           margin: 0 0 16px 0;
//         }
//         .event-details {
//           font-size: 14px;
//           color: #64748b;
//           margin-bottom: 16px;
//           display: flex;
//           flex-wrap: wrap;
//           gap: 12px;
//         }
//         .volunteer-progress-bar {
//           background: #f1f5f9;
//           height: 6px;
//           border-radius: 4px;
//           overflow: hidden;
//           margin-bottom: 6px;
//           width: 100%;
//         }
//         .progress-fill {
//           height: 100%;
//           background: #0891b2;
//           transition: width 0.3s ease;
//         }
//         .progress-text {
//           font-size: 12px;
//           color: #64748b;
//           text-align: center;
//           margin: 0 0 12px 0;
//         }
//         .register-btn {
//           width: 100%;
//           padding: 10px;
//           color: white;
//           border-radius: 8px;
//           border: none;
//           cursor: pointer;
//           font-weight: 600;
//           transition: background 0.3s ease;
//         }
//         .register-btn.register {
//           background: #be185d;
//         }
//         .register-btn.unregister {
//           background: #dc2626;
//         }
//         .register-btn:hover {
//           filter: brightness(0.9);
//         }
//         .no-events {
//           background: white;
//           border-radius: 12px;
//           padding: 60px 20px;
//           text-align: center;
//           box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//         }
//         .no-events-icon {
//           font-size: 3rem;
//           margin-bottom: 16px;
//           opacity: 0.5;
//         }

//         /* Responsive */
//         @media (max-width: 768px) {
//           .search-filter-row {
//             grid-template-columns: 1fr;
//             gap: 12px;
//           }
//           .event-details {
//             flex-direction: column;
//             gap: 6px;
//           }
//           .events-grid {
//             grid-template-columns: 1fr;
//           }
//         }
//       `}</style>
//       </div>
//   )
// };

// export default VolunteerView;