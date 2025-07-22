import '../../../../App.css';
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, Plus, Edit3, Trash2} from 'lucide-react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OrganizerView.css';
import { Container } from 'react-bootstrap';

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
      const response = await axios.get('api/events');
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
        response = await axios.put(`api/events/${editingEvent.id}`, {
          ...formData,
        });
        console.log(response.data);      
      } else {
        response = await axios.post('api/events', {
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
        await axios.put(`http://api/events/cancel/${eventId}`);
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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-card">
          <div className="spinner"></div>
          <div className="loading-text">Loading events...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-card">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className='main-content'>
    <Container className="organizer-view">

      {/* Search and Filter Section */}
      <div className="filter-section">
        <div className="search-filter-grid">
          <input
            type="text"
            placeholder="Search events..."
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

        {/* Event Type Tabs */}
        <div className="event-controls-row">
          <div className="event-type-tabs">
            {['Ongoing', 'Upcoming', 'Completed', 'Cancelled'].map(type => (
              <button
                key={type}
                onClick={() => toggleEventType(type)}
                className={`event-type-tab ${eventType === type ? 'active' : ''}`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="create-button-container">
            <button
              onClick={() => setShowAddForm(true)}
              className="create-button"
            >
              <Plus size={16} />
              Create New Event
            </button>
          </div>
        </div>

      </div>

      {/* Add/Edit Event Form */}
      {showAddForm && (
        <div className="form-container">
          <h2 className="form-title">
            {editingEvent ? 'Edit Event' : 'Create New Event'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Start Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  End Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Start Time *
                </label>
                <input
                  type="time"
                  required
                  value={formData.startTime}
                  onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  End Time *
                </label>
                <input
                  type="time"
                  required
                  value={formData.endTime}
                  onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Volunteers Needed *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.volunteersNeeded}
                  onChange={(e) => setFormData({...formData, volunteersNeeded: e.target.value})}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="form-select"
                >
                  <option value="Environmental">Environmental</option>
                  <option value="Social Service">Social Service</option>
                  <option value="Education">Education</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Community">Community</option>
                </select>
              </div>
            </div>

            <div className="form-group-full">
              <label className="form-label">
                Description *
              </label>
              <textarea
                required
                rows="4"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="form-textarea"
              />
            </div>

            <div className="form-buttons">
              <button
                type="submit"
                className="submit-button"
              >
                {editingEvent ? 'Update Event' : 'Create Event'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="events-grid">
          {filteredEvents.map(event => (
            <div
              key={event.id}
              className="event-card"
            >
              {/* Category Badge */}
              <div className="category-badge">
                {event.category}
              </div>

              {/* Event Content */}
              <div className="event-content">
                <h3 className="event-title">
                  {event.title}
                </h3>
                <p className="event-description">
                  {event.description}
                </p>
              </div>

              {/* Event Details */}
              <div className="event-details">
                <div className="event-detail-item">
                  <Calendar size={16} className="detail-icon" />
                  <span className="detail-label">Start Date:</span>
                  <span>{new Date(event.startDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>

                <div className="event-detail-item">
                  <Calendar size={16} className="detail-icon" />
                  <span className="detail-label">End Date:</span>
                  <span>{new Date(event.endDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>

                <div className="event-detail-item">
                  <Clock size={16} className="detail-icon" />
                  <span className="detail-label">Start Time:</span>
                  <span>{new Date(`2000-01-01T${event.startTime}`).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}</span>
                </div>

                <div className="event-detail-item">
                  <Clock size={16} className="detail-icon" />
                  <span className="detail-label">End Time:</span>
                  <span>{new Date(`2000-01-01T${event.endTime}`).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}</span>
                </div>

                <div className="event-detail-item">
                  <MapPin size={16} className="detail-icon" />
                  <span>{event.location}</span>
                </div>
                
                {eventType === "Upcoming" && (
                  <div className="event-detail-item">
                    <Users size={16} className="detail-icon" />
                    <span>{event.volunteersNeeded} volunteers Needed</span>
                  </div>
                )}
              </div>

              {/* Action Buttons - Only for Upcoming Events */}
              {eventType === "Upcoming" && 
                <div className="action-buttons">
                  <button
                    onClick={() => handleEdit(event)}
                    className="edit-button"
                  >
                    <Edit3 size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="delete-button"
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
        <div className="no-events-container">
          <h3 className="no-events-title">
            No Events Found
          </h3>
          <p className="no-events-description">
            {events.length === 0 
              ? `No ${eventType.toLowerCase()} events available. Start by creating your first volunteer event to engage your community.`
              : 'No events match your current search criteria. Try adjusting your filters.'
            }
          </p>
          {events.length === 0 && (
            <button
              onClick={() => setShowAddForm(true)}
              className="create-first-event-button"
            >
              <Plus size={20} />
              Create Your First Event
            </button>
          )}
        </div>
      )}
    </Container>
    </div>
  );
};

export default OrganizerView;