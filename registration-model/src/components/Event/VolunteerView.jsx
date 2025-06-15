import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams } from "react-router-dom";

const VolunteerView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [events, setEvents] = useState([]);
  const [eventType, setEventType] = useState("Upcoming");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {userId} = useParams();

  // Fetch events when component mounts
  useEffect(() => {
    fetchEvents(eventType);
  }, []);

  const fetchEvents = async (type) => {
    setLoading(true);
    console.log(`Fetching type: ${type}`); 

    try {
      const response = await axios.get(`http://localhost:5000/api/events/${userId}/${type}`);
      
      // Transform the data to match your frontend expectations
      const transformedEvents = response.data.map(event => ({
        ...event,
        id: event._id, 
      }));
      
      setEvents(transformedEvents);
    } catch (err) {
      setError('Failed to fetch events');
      console.error('Error fetching events:', err.response ? err.response.data : err.message); // Log more details about the error
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventid) => {
    try {
      const registerType = eventType === "Upcoming" ? 'register' : 'unregister';
      const response = await axios.post(`http://localhost:5000/api/events/${registerType}`, {userId : userId, eventId : eventid});
      fetchEvents(eventType);
      console.log(response);
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

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const getProgressPercentage = (volunteers, maxVolunteers) => {
    return (volunteers / maxVolunteers) * 100;
  };

  const getStatusBadge = (volunteers, maxVolunteers) => {
    const percentage = getProgressPercentage(volunteers, maxVolunteers);
    if (percentage >= 100) return 'Full';
    if (percentage >= 80) return 'Almost Full';
    return 'Open';
  };

  const toggleEventType = (type) => {
    setEventType(type);
    fetchEvents(type);
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px',
        color: 'white'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '10px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          margin: 0
        }}>
          Volunteer Opportunities
        </h1>
        <p style={{
          fontSize: '1.2rem',
          opacity: 0.9,
          margin: 0
        }}>
          Make a difference in your community
        </p>
      </div>

      {/* Content Wrapper */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Search and Filter Bar */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '20px',
          marginBottom: '30px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '20px',
            alignItems: 'center'
          }}>
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '12px 20px',
                borderRadius: '25px',
                border: 'none',
                fontSize: '16px',
                background: 'rgba(255, 255, 255, 0.9)',
                outline: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '12px 20px',
                borderRadius: '25px',
                border: 'none',
                fontSize: '16px',
                background: 'rgba(255, 255, 255, 0.9)',
                outline: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Categories</option>
              <option value="Environmental">Environmental</option>
              <option value="Social Service">Social Service</option>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Community">Community</option>
            </select>
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '15px 20px',
          marginBottom: '30px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          justifyContent: 'space-around',
          gap: '10px'
        }}>
          {['Upcoming', 'Registered', 'Completed'].map(type => (
            <button
              key={type}
              onClick={() => toggleEventType(type)}
              style={{
                flex: 1, // Distribute space equally
                background: 'transparent',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '15px', // Slightly less rounded than the container
                fontSize: '1.1rem',
                fontWeight: eventType === type ? '700' : '500',
                color: eventType === type ? 'white' : 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative', // For the underline
                overflow: 'hidden',
                outline: 'none',
                // Conditional styling for active type
                transform: eventType === type ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: eventType === type ? '0 8px 20px rgba(0, 0, 0, 0.3)' : 'none',
              }}
              // Hover effects
              onMouseEnter={(e) => {
                if (eventType !== type) {
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (eventType !== type) {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {type}
              {/* Underline for active type */}
              {eventType === type && (
                <div style={{
                  position: 'absolute',
                  bottom: '0px', // Position slightly below the text
                  left: '10%',
                  width: '80%',
                  height: '4px',
                  background: 'linear-gradient(90deg, #84d9d2, #764ba2)', // Matching gradient color
                  borderRadius: '2px',
                  transition: 'width 0.3s ease-out',
                }}></div>
              )}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '25px'
          }}>
            {filteredEvents.map(event => (
              <div
                key={event.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '20px',
                  padding: '25px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
                }}
              >
                {/* Event Header */}
                <div style={{ marginBottom: '15px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '10px'
                  }}>
                    <h3 style={{
                      fontSize: '1.4rem',
                      fontWeight: 'bold',
                      color: '#2d3748',
                      margin: 0,
                      lineHeight: '1.3'
                    }}>
                      {event.title}
                    </h3>
                    <span style={{
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {event.category}
                    </span>
                  </div>
                  <p style={{
                    color: '#666',
                    fontSize: '0.9rem',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    {event.description}
                  </p>
                </div>

                {/* Event Details */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <span style={{
                      color: '#667eea',
                      marginRight: '8px'
                    }}>📅</span>
                    <span style={{
                      fontSize: '0.9rem',
                      color: '#555'
                    }}>
                      {event.date}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <span style={{
                      color: '#667eea',
                      marginRight: '8px'
                    }}>🕒</span>
                    <span style={{
                      fontSize: '0.9rem',
                      color: '#555'
                    }}>
                      {event.time}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <span style={{
                      color: '#667eea',
                      marginRight: '8px'
                    }}>📍</span>
                    <span style={{
                      fontSize: '0.9rem',
                      color: '#555'
                    }}>
                      {event.location}
                    </span>
                  </div>
                </div>

                {eventType !== "Completed" &&
                   <div style={{ marginBottom: '20px' }}>
                   <div style={{
                     background: '#e2e8f0',
                     borderRadius: '10px',
                     height: '8px',
                     overflow: 'hidden'
                   }}>
                     <div style={{
                       background: 'linear-gradient(90deg, #667eea, #764ba2)',
                       height: '100%',
                       width: `${getProgressPercentage(event.volunteersRegistered, event.volunteersNeeded)}%`,
                       transition: 'width 0.3s ease'
                     }}></div>
                   </div>
                   <p style={{
                     fontSize: '0.8rem',
                     color: '#666',
                     margin: '5px 0 0 0',
                     textAlign: 'center'
                   }}>
                     {event.volunteersRegistered} / {event.volunteersNeeded} volunteers registered
                   </p>
                  </div>
                }
               

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  justifyContent: 'space-between'
                }}>
                  {eventType !== "Completed" &&
                  <button
                    onClick={() => handleRegister(event.id)}
                    style={{
                      flex: 1,
                      padding: '12px 20px',
                      background: eventType === "Upcoming" 
                        ? 'linear-gradient(135deg, #667eea, #764ba2)'
                        : '#cc0202',
                      color: 'white',
                      border: 'none',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
                    }}
                  >
                    { eventType === "Upcoming" 
                      ? 'Register' 
                      : 'Unregister'}
                  </button>}
                  {eventType === "Registered" ?
                 <button
                 onClick={() => {}}
                 style={{
                   padding: '12px 20px', // Added horizontal padding for better spacing with icon
                   background: 'linear-gradient(135deg, #667eea, #764ba2)',
                   color: '#ffffff',
                   border: 'none', // Removed border as gradient background makes it redundant
                   borderRadius: '25px',
                   cursor: 'pointer',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   gap: '8px', // Space between icon and text
                   fontSize: '1rem', // Set a base font size for consistency
                   fontWeight: '600', // Make text a bit bolder
                   transition: 'all 0.3s ease',
                   boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' // Add a subtle shadow
                 }}
                 // Optional: Add hover effects for better UX
                 onMouseEnter={(e) => {
                   e.currentTarget.style.transform = 'translateY(-2px)';
                   e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.transform = 'translateY(0)';
                   e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
                 }}
               >
                 <svg
                   xmlns="http://www.w3.org/2000/svg"
                   width="20" // Adjust size as needed
                   height="20" // Adjust size as needed
                   viewBox="0 0 24 24"
                   fill="none"
                   stroke="currentColor" // Icon color inherits from button's text color
                   strokeWidth="2"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                 >
                   <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                   <line x1="16" y1="2" x2="16" y2="6"></line>
                   <line x1="8" y1="2" x2="8" y2="6"></line>
                   <line x1="3" y1="10" x2="21" y2="10"></line>
                 </svg>
                 Schedule
               </button> : 
                  <div/>
                  }
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'white'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              marginBottom: '10px',
              opacity: 0.9
            }}>
              No events found
            </h3>
            <p style={{
              fontSize: '1rem',
              opacity: 0.7,
              margin: 0
            }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerView;