import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const VolunteerView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [events, setEvents] = useState([]);
  const [eventType, setEventType] = useState("Upcoming");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clickedButton, setClickedButton] = useState(null);
  const { uid } = useParams();

  useEffect(() => {
    fetchEvents(eventType);
  }, []);

  const fetchEvents = async (type) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/events/${uid}/${type}`);
      const transformedEvents = response.data.map(event => ({
        ...event,
        id: event._id,
      }));
      setEvents(transformedEvents);
      setError(null);
    } catch (err) {
      setError('Failed to fetch events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventid) => {
    try {
      const registerType = eventType === "Upcoming" ? 'register' : 'unregister';
      await axios.post(`http://localhost:5000/api/events/${registerType}`, {
        userId: uid,
        eventId: eventid,
      });
      fetchEvents(eventType);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to register for event');
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getProgressPercentage = (volunteers, maxVolunteers) => {
    return (volunteers / maxVolunteers) * 100;
  };

  const toggleEventType = (type) => {
    setClickedButton(type);
    setEventType(type);
    fetchEvents(type);

    // reset clickedButton after 200ms to end animation
    setTimeout(() => setClickedButton(null), 200);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f8f9fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif'
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
        fontFamily: 'sans-serif'
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

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8f9fa',
      fontFamily: 'sans-serif',
      padding: '24px'
    }}>

      {/* Search & Filters */}
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
              background: '#f9fafb'
            }}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '14px',
              background: 'white'
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

        <div style={{ display: 'flex', gap: '4px' }}>
          {['Upcoming', 'Registered', 'Completed'].map(type => (
            <button
              key={type}
              onClick={() => toggleEventType(type)}
              style={{
                padding: '10px 20px',
                background: eventType === type ? '#be185d' : 'transparent',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: eventType === type ? 'white' : '#64748b',
                border: 'none',
                cursor: 'pointer',
                userSelect: 'none',
                transform: clickedButton === type ? 'scale(0.95)' : 'scale(1)',
                transition: 'transform 0.2s ease',
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Events */}
      {filteredEvents.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px'
        }}>
          {filteredEvents.map(event => (
            <div key={event.id} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #f1f5f9',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: '#0891b2',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px'
              }}>
                {event.category}
              </div>

              <div style={{ marginBottom: '16px' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1e293b'
                }}>
                  {event.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b' }}>{event.description}</p>
              </div>

              <div style={{ fontSize: '14px', color: '#64748b' }}>
                📅 {event.date}<br />
                🕒 {event.time}<br />
                📍 {event.location}
              </div>

              {eventType !== "Completed" && (
                <>
                  <div style={{ margin: '12px 0' }}>
                    <div style={{ background: '#f1f5f9', height: '6px', borderRadius: '4px' }}>
                      <div style={{
                        height: '100%',
                        width: `${getProgressPercentage(event.volunteersRegistered, event.volunteersNeeded)}%`,
                        background: '#0891b2'
                      }}></div>
                    </div>
                    <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center' }}>
                      {event.volunteersRegistered} / {event.volunteersNeeded} volunteers
                    </p>
                  </div>
                  <button
                    onClick={() => handleRegister(event.id)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: eventType === "Upcoming" ? '#be185d' : '#dc2626',
                      color: 'white',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {eventType === "Upcoming" ? 'Register' : 'Unregister'}
                  </button>
                </>
              )}
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
