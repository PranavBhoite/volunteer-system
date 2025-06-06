// import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from './components/Authentication/Volunteer/Registration';
import Login from './components/Authentication/Volunteer/Login';
import Dashboard from './components/Authentication/Volunteer/Dashboard';
import VolunteerView from './components/Event/VolunteerView';
import OrganizerView from './components/Event/OrganizerView';
import TMGFHomepage from './components/Home/TMGFHomepage';

//mock data for initial events
const initialEvents = [
  {
    id: 1,
    title: "Community Beach Cleanup",
    description: "Join us for a community beach cleanup event to help preserve our local marine environment.",
    date: "2025-06-15",
    time: "09:00",
    location: "Sunny Beach Park",
    volunteersNeeded: 25,
    volunteersRegistered: 12,
    category: "Environmental",
    organizer: "Green Earth Foundation"
  },
  {
    id: 2,
    title: "Food Drive for Local Shelter",
    description: "Help collect and distribute food donations for families in need in our community.",
    date: "2025-06-20",
    time: "14:00",
    location: "Community Center Hall",
    volunteersNeeded: 15,
    volunteersRegistered: 8,
    category: "Social Service",
    organizer: "Helping Hands Charity"
  },
  {
    id: 3,
    title: "Senior Citizens Technology Workshop",
    description: "Teach senior citizens how to use smartphones and computers for daily tasks.",
    date: "2025-06-25",
    time: "10:30",
    location: "Senior Community Center",
    volunteersNeeded: 10,
    volunteersRegistered: 6,
    category: "Education",
    organizer: "Tech for All"
  }
];

function App() {

  // const [currentView, setCurrentView] = useState('volunteer');
  const [events, setEvents] = useState(initialEvents);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);

  const handleAddEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: Date.now(),
      volunteersRegistered: 0
    };
    setEvents([...events, newEvent]);
  };

  const handleEditEvent = (eventId, eventData) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, ...eventData }
        : event
    ));
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== eventId));
      setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
      setSavedEvents(savedEvents.filter(id => id !== eventId));
    }
  };

  const handleRegisterEvent = (eventId) => {
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents([...registeredEvents, eventId]);
      setEvents(events.map(event => 
        event.id === eventId 
          ? { ...event, volunteersRegistered: event.volunteersRegistered + 1 }
          : event
      ));
    }
  };

  const handleSaveEvent = (eventId) => {
    if (savedEvents.includes(eventId)) {
      setSavedEvents(savedEvents.filter(id => id !== eventId));
    } else {
      setSavedEvents([...savedEvents, eventId]);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<TMGFHomepage/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/Registration" element={<Registration/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route 
          path="/volunteer-view" 
          element={
            <VolunteerView 
              events={events} 
              registeredEvents={registeredEvents} 
              savedEvents={savedEvents} 
              onRegisterEvent={handleRegisterEvent} 
              onSaveEvent={handleSaveEvent} 
            />
          }
        />
        <Route 
        path= "/organizer-view"
          element={
            <OrganizerView
            events={events}
            onAddEvent={handleAddEvent}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
          />
          }
        />

      </Routes>
    </Router>
  );
}

export default App;