// File: src/components/EventForm.js
import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const categories = [
    'Environment', 
    'Community Service', 
    'Education', 
    'Healthcare', 
    'Animal Welfare', 
    'Senior Care'
  ];
  

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    volunteersNeeded : 0,
    volunteersRegistered : 0
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time || !formData.location) {
      alert('Please fill in all required fields.');
      return;
    }
    console.log(formData);
    try {
        const response = await axios.post('http://localhost:5000/api/events', formData);
        console.log(response);
        
      } catch (error) {
        console.error('Error:', error);
      }finally {
        navigate('/events');
      }
  };

  return (
    <div >
      <div >
        <div >
          <h2>Add New Event</h2>
          <button onClick={() => {navigate('/events')}}>
            <X size={20} />
          </button>
        </div>
        
        <div>
          <div>
            <label>Event Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div >
            <label >Description</label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <div>
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            
            <div >
              <label htmlFor="time">Time *</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          
          <div >
            <div >
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label >Volunteers Needed</label>
              <input
                type="number"
                id="volunteersNeeded"
                name="volunteersNeeded"
                value={formData.volunteersNeeded}
                onChange={handleChange}
                min="1"
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => {
                navigate('/events');
            }}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Add Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventForm;