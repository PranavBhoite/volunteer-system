import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VolunteerView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [registeredEvents, setRegisteredEvents] = useState(new Set());
  const [savedEvents, setSavedEvents] = useState(new Set());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events when component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      
      // Transform the data to match your frontend expectations
      const transformedEvents = response.data.map(event => ({
        ...event,
        id: event._id, // Map MongoDB _id to id
        volunteers: event.volunteersRegistered || 0,
        maxVolunteers: event.volunteersNeeded || 10,
        category: event.category || 'Community' // Default category
      }));
      
      setEvents(transformedEvents);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch events');
      setLoading(false);
      console.error('Error:', err);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/events/${eventId}/register`);
      if (response.data.success) {
        setRegisteredEvents(prev => new Set([...prev, eventId]));
        // Update local state to reflect the new volunteer count
        setEvents(prevEvents => 
          prevEvents.map(event => 
            event.id === eventId 
              ? { ...event, volunteers: event.volunteers + 1 } 
              : event
          )
        );
      }
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

  const handleSave = (eventId) => {
    setSavedEvents(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(eventId)) {
        newSaved.delete(eventId);
      } else {
        newSaved.add(eventId);
      }
      return newSaved;
    });
  };

  const getProgressPercentage = (volunteers, maxVolunteers) => {
    return (volunteers / maxVolunteers) * 100;
  };

  const getStatusBadge = (volunteers, maxVolunteers) => {
    const percentage = getProgressPercentage(volunteers, maxVolunteers);
    if (percentage >= 100) return 'Full';
    if (percentage >= 80) return 'Almost Full';
    return 'Open';
  };

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
              <option value="Environment">Environment</option>
              <option value="Community">Community</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
            </select>
          </div>
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

                {/* Progress Section */}
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
                      width: `${getProgressPercentage(event.volunteers, event.maxVolunteers)}%`,
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                  <p style={{
                    fontSize: '0.8rem',
                    color: '#666',
                    margin: '5px 0 0 0',
                    textAlign: 'center'
                  }}>
                    {event.volunteers} / {event.maxVolunteers} volunteers registered
                  </p>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  justifyContent: 'space-between'
                }}>
                  <button
                    onClick={() => handleRegister(event.id)}
                    disabled={registeredEvents.has(event.id) || event.volunteers >= event.maxVolunteers}
                    style={{
                      flex: 1,
                      padding: '12px 20px',
                      background: registeredEvents.has(event.id) 
                        ? '#48bb78' 
                        : event.volunteers >= event.maxVolunteers 
                        ? '#4a5568' 
                        : 'linear-gradient(135deg, #667eea, #764ba2)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: registeredEvents.has(event.id) || event.volunteers >= event.maxVolunteers ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!registeredEvents.has(event.id) && event.volunteers < event.maxVolunteers) {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!registeredEvents.has(event.id) && event.volunteers < event.maxVolunteers) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }
                    }}
                  >
                    {registeredEvents.has(event.id) 
                      ? '✓ Registered' 
                      : event.volunteers >= event.maxVolunteers 
                      ? 'Full' 
                      : 'Register'}
                  </button>
                  <button
                    onClick={() => handleSave(event.id)}
                    style={{
                      padding: '12px',
                      background: savedEvents.has(event.id) ? '#e53e3e' : 'transparent',
                      color: savedEvents.has(event.id) ? 'white' : '#667eea',
                      border: savedEvents.has(event.id) ? '2px solid #e53e3e' : '2px solid #667eea',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!savedEvents.has(event.id)) {
                        e.currentTarget.style.background = '#667eea';
                        e.currentTarget.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!savedEvents.has(event.id)) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#667eea';
                      }
                    }}
                  >
                    {savedEvents.has(event.id) ? '❤️' : '🤍'}
                  </button>
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