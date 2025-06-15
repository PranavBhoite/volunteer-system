import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VolunteerView = ({ userId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [events, setEvents] = useState([]);
  const [eventType, setEventType] = useState("Upcoming");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events when component mounts
  useEffect(() => {
    fetchEvents(eventType);
  });

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
      console.error('Error fetching events:', err.response ? err.response.data : err.message);
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
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f8f9fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          borderRadius: '12px',
          background: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #0891b2',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <div style={{ color: '#64748b', fontSize: '1.1rem' }}>Loading events...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f8f9fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          borderRadius: '12px',
          background: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #fecaca',
          color: '#dc2626'
        }}>
          {error}
        </div>
      </div>
    );
  }

  const getProgressPercentage = (volunteers, maxVolunteers) => {
    return (volunteers / maxVolunteers) * 100;
  };

  // const getStatusBadge = (volunteers, maxVolunteers) => {
  //   const percentage = getProgressPercentage(volunteers, maxVolunteers);
  //   if (percentage >= 100) return 'Full';
  //   if (percentage >= 80) return 'Almost Full';
  //   return 'Open';
  // };

  const toggleEventType = (type) => {
    setEventType(type);
    fetchEvents(type);
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8f9fa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '24px'
    }}>
      {/* Header */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '32px',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '600',
          color: '#1e293b',
          margin: '0 0 8px 0'
        }}>
          Volunteer Events
        </h1>
        <p style={{
          fontSize: '1rem',
          color: '#64748b',
          margin: 0
        }}>
          Building stronger communities through dedicated volunteers
        </p>
      </div>

      {/* Search and Filter Section */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 200px',
          gap: '16px',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s ease',
              fontFamily: 'inherit',
              background: '#f9fafb'
            }}
            onFocus={(e) => e.target.style.borderColor = '#0891b2'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '14px',
              outline: 'none',
              cursor: 'pointer',
              background: 'white',
              fontFamily: 'inherit'
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

        {/* Event Type Tabs */}
        <div style={{
          display: 'flex',
          gap: '4px'
        }}>
          {['Upcoming', 'Registered', 'Completed'].map(type => (
            <button
              key={type}
              onClick={() => toggleEventType(type)}
              style={{
                padding: '10px 20px',
                background: eventType === type ? '#be185d' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: eventType === type ? 'white' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit'
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px'
        }}>
          {filteredEvents.map(event => (
            <div
              key={event.id}
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease',
                border: '1px solid #f1f5f9',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Category Badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: '#0891b2',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {event.category}
              </div>

              {/* Event Content */}
              <div style={{ marginBottom: '16px', paddingRight: '80px' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  margin: '0 0 8px 0',
                  lineHeight: '1.4'
                }}>
                  {event.title}
                </h3>
                <p style={{
                  color: '#64748b',
                  fontSize: '14px',
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
                  marginBottom: '8px',
                  color: '#64748b',
                  fontSize: '14px'
                }}>
                  <span style={{ marginRight: '8px' }}>📅</span>
                  <span>{event.date}</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '8px',
                  color: '#64748b',
                  fontSize: '14px'
                }}>
                  <span style={{ marginRight: '8px' }}>🕒</span>
                  <span>{event.time}</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '8px',
                  color: '#64748b',
                  fontSize: '14px'
                }}>
                  <span style={{ marginRight: '8px' }}>📍</span>
                  <span>{event.location}</span>
                </div>
              </div>

              {/* Progress Bar */}
              {eventType !== "Completed" && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    background: '#f1f5f9',
                    borderRadius: '4px',
                    height: '6px',
                    overflow: 'hidden',
                    marginBottom: '8px'
                  }}>
                    <div style={{
                      background: '#0891b2',
                      height: '100%',
                      width: `${getProgressPercentage(event.volunteersRegistered, event.volunteersNeeded)}%`,
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                  <p style={{
                    fontSize: '12px',
                    color: '#64748b',
                    margin: 0,
                    textAlign: 'center'
                  }}>
                    {event.volunteersRegistered} / {event.volunteersNeeded} volunteers registered
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '8px'
              }}>
                {eventType !== "Completed" && (
                  <button
                    onClick={() => handleRegister(event.id)}
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      background: eventType === "Upcoming" 
                        ? '#be185d'
                        : '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: 'inherit'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.9';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    {eventType === "Upcoming" ? 'Register' : 'Unregister'}
                  </button>
                )}
                
                {eventType === "Registered" && (
                  <button
                    onClick={() => {}}
                    style={{
                      padding: '10px 16px',
                      background: '#0891b2',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.2s ease',
                      fontFamily: 'inherit'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.9';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
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
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '60px 20px',
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '16px',
            opacity: 0.5
          }}>
            📋
          </div>
          <h3 style={{
            fontSize: '1.25rem',
            marginBottom: '8px',
            fontWeight: '600',
            color: '#1e293b'
          }}>
            No events found
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#64748b',
            margin: 0
          }}>
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default VolunteerView;