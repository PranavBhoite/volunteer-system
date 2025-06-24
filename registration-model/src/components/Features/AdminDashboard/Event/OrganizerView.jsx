import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, Plus, Edit3, Trash2} from 'lucide-react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrganizerView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    location: '',
    volunteersNeeded: 0,
    category: 'Environmental',
  });
  const [eventType, setEventType] = useState("Upcoming");

  const toggleEventType = (type) => {
    setEventType(type);
    fetchEvents();
  }

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (err) {
      setError('Failed to fetch events');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      location: '',
      volunteersNeeded: 0,
      category: 'Environmental',
    });
  };


  const validateForm = () => {
    const today = new Date().setHours(0, 0, 0, 0);
    const start = new Date(formData.startDate).setHours(0, 0, 0, 0);
    const end = new Date(formData.endDate).setHours(0, 0, 0, 0);
  
    if (start < today) {
      alert('Start date cannot be in the past.');
      return false;
    }
  
    if (end < start) {
      alert('End date cannot be before start date.');
      return false;
    }

    if(!formData.startTime || !formData.endTime) {
      alert("Please enter Accurate Time");
      return false;
    }
  
    if (formData.startDate === formData.endDate) {
      const [startHour, startMin] = formData.startTime.split(':').map(Number);
      const [endHour, endMin] = formData.endTime.split(':').map(Number);
      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;
  
      if (endMinutes <= startMinutes) {
        alert('End time must be after start time on the same day.');
        return false;
      }
    }
  
    return true;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; 

    let response = null;
    try {
      if (editingEvent) {
        response = await axios.put(`http://localhost:5000/api/events/${editingEvent.id}`, {
          ...formData,
        });
        console.log(response.data);      
      } else {
        response = await axios.post('http://localhost:5000/api/events', {
          ...formData,
        });      
      }
      if (response.data) {
        fetchEvents();
        setShowAddForm(false);
        setEditingEvent(null);
        resetForm();
      }
    } catch (err) {
      console.error('Error saving event:', err);
      alert(err.response?.data?.message || 'Failed to save event. Please try again.');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.put(`http://localhost:5000/api/events/cancel/${eventId}`);
        fetchEvents();
      } catch (err) {
        console.error('Error deleting event:', err);
        alert('Failed to delete event');
      }
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      startDate: event.startDate.split('T')[0],
      endDate: event.endDate.split('T')[0],
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location,
      volunteersNeeded: event.volunteersNeeded.toString(),
      category: event.category,
    });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingEvent(null);
    resetForm();
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
  
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
  
    const matchesEventType = eventType === 'all' || event.status === eventType;
  
    return matchesSearch && matchesCategory && matchesEventType;
  });
  

  // const getProgressPercentage = (volunteers, maxVolunteers) => {
  //   return (volunteers / maxVolunteers) * 100;
  // };

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
          Organizer Dashboard
        </h1>
        <p style={{
          fontSize: '1rem',
          color: '#64748b',
          margin: 0
        }}>
          Manage your volunteer events and track participation
        </p>
      </div>

      {/* Create Event Button */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <button
          onClick={() => setShowAddForm(true)}
          style={{
            background: '#be185d',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            fontFamily: 'inherit'
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = '0.9';
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = '1';
          }}
        >
          <Plus size={16} />
          Create New Event
        </button>
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
            placeholder="Search events..."
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
          {['Ongoing', 'Upcoming', 'Completed', 'Cancelled'].map(type => (
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

      {/* Add/Edit Event Form */}
      {showAddForm && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '32px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1e293b',
            margin: '0 0 24px 0',
            textAlign: 'center'
          }}>
            {editingEvent ? 'Edit Event' : 'Create New Event'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              marginBottom: '20px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Start Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  End Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Start Time *
                </label>
                <input
                  type="time"
                  required
                  value={formData.startTime}
                  onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  End Time *
                </label>
                <input
                  type="time"
                  required
                  value={formData.endTime}
                  onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Volunteers Needed *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.volunteersNeeded}
                  onChange={(e) => setFormData({...formData, volunteersNeeded: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    cursor: 'pointer'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                >
                  <option value="Environmental">Environmental</option>
                  <option value="Social Service">Social Service</option>
                  <option value="Education">Education</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Community">Community</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Description *
              </label>
              <textarea
                required
                rows="4"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                  minHeight: '100px'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>

            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center'
            }}>
              <button
                type="submit"
                style={{
                  background: '#be185d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => {
                  e.target.style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = '1';
                }}
              >
                {editingEvent ? 'Update Event' : 'Create Event'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  background: 'transparent',
                  color: '#64748b',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#f8f9fa';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

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
                  <Calendar size={16} style={{ marginRight: '8px', color: '#0891b2' }} />
                  <span style={{ fontWeight: '500', marginRight: '4px' }}>Start Date:</span>
                  <span>{new Date(event.startDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '8px',
                  color: '#64748b',
                  fontSize: '14px'
                }}>
                  <Calendar size={16} style={{ marginRight: '8px', color: '#0891b2' }} />
                  <span style={{ fontWeight: '500', marginRight: '4px' }}>End Date:</span>
                  <span>{new Date(event.endDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>


                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '8px',
                  color: '#64748b',
                  fontSize: '14px'
                }}>
                  <Clock size={16} style={{ marginRight: '8px', color: '#0891b2' }} />
                  <span style={{ fontWeight: '500', marginRight: '4px' }}>Start Time:</span>
                  <span>{new Date(`2000-01-01T${event.startTime}`).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '8px',
                  color: '#64748b',
                  fontSize: '14px'
                }}>
                  <Clock size={16} style={{ marginRight: '8px', color: '#0891b2' }} />
                  <span style={{ fontWeight: '500', marginRight: '4px' }}>End Time:</span>
                  <span>{new Date(`2000-01-01T${event.endTime}`).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '8px',
                  color: '#64748b',
                  fontSize: '14px'
                }}>
                  <MapPin size={16} style={{ marginRight: '8px', color: '#0891b2' }} />
                  <span>{event.location}</span>
                </div>
                {eventType === "Upcoming" && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px',
                    color: '#64748b',
                    fontSize: '14px'
                  }}>
                    <Users size={16} style={{ marginRight: '8px', color: '#0891b2' }} />
                    <span>{event.volunteersNeeded} volunteers Needed</span>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              {/* {eventType === "Upcoming" && (
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
                    {Math.round(getProgressPercentage(event.volunteersRegistered, event.volunteersNeeded))}% registered
                  </p>
                </div>
              )} */}

              {/* //Status Badge
              <div style={{
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                <span style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  ...(eventType === "Completed" || event.volunteersRegistered >= event.volunteersNeeded 
                    ? {
                        background: '#dcfce7',
                        color: '#166534'
                      }
                    : event.volunteersRegistered > event.volunteersNeeded * 0.7
                    ? {
                        background: '#fef3c7',
                        color: '#92400e'
                      }
                    : {
                        background: '#dbeafe',
                        color: '#1e40af'
                      })
                }}>
                  {eventType === "Completed" ?
                  'Event Completed' 
                  :
                  event.volunteersRegistered >= event.volunteersNeeded 
                    ? 'Fully Registered' 
                    : event.volunteersRegistered > event.volunteersNeeded * 0.7
                    ? 'Almost Full'
                    : 'Open for Registration'}
                </span>
              </div> */}


              {/* Action Buttons - Only for Upcoming Events */}
              {eventType === "Upcoming" && 
                <div style={{
                  display: 'flex',
                  gap: '10px'
                }}>
                  <button
                    onClick={() => handleEdit(event)}
                    style={{
                      flex: '1',
                      padding: '10px 16px',
                      background: '#0891b2',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.2s ease',
                      fontFamily: 'inherit'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.opacity = '0.9';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.opacity = '1';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <Edit3 size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    style={{
                      flex: '1',
                      padding: '10px 16px',
                      background: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.2s ease',
                      fontFamily: 'inherit'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.opacity = '0.9';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.opacity = '1';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <Trash2 size={16} />
                    Cancel
                  </button>
                </div>
              }
            </div>
          ))}
        </div>
      ) : (
        /* No Events Message */
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '80px 20px',
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '10px'
          }}>
            No Events Found
          </h3>
          <p style={{
            fontSize: '1rem',
            color: '#64748b',
            marginBottom: '20px'
          }}>
            {events.length === 0 
              ? `No ${eventType.toLowerCase()} events available. Start by creating your first volunteer event to engage your community.`
              : 'No events match your current search criteria. Try adjusting your filters.'
            }
          </p>
          {events.length === 0 && (
            <button
              onClick={() => setShowAddForm(true)}
              style={{
                background: '#be185d',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '15px 30px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = '0.9';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <Plus size={20} />
              Create Your First Event
            </button>
          )}
        </div>
      )}

      {/* CSS Animation for Loading Spinner */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default OrganizerView;