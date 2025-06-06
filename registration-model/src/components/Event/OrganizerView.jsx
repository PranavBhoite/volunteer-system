import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Plus, Edit3, Trash2, Eye } from 'lucide-react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrganizerView = ({ events, onAddEvent, onEditEvent, onDeleteEvent }) => {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/Registration");
  };

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    volunteersNeeded: '',
    category: 'Environmental',
    organizer: ''
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      volunteersNeeded: '',
      category: 'Environmental',
      organizer: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEvent) {
      onEditEvent(editingEvent.id, { ...formData, volunteersNeeded: parseInt(formData.volunteersNeeded) });
      setEditingEvent(null);
    } else {
      onAddEvent({ ...formData, volunteersNeeded: parseInt(formData.volunteersNeeded) });
      setShowAddForm(false);
    }
    resetForm();
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      volunteersNeeded: event.volunteersNeeded.toString(),
      category: event.category,
      organizer: event.organizer
    });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingEvent(null);
    resetForm();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '0',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Navigation Bar */}
                  <Navbar
                    expand="lg"
                    className="navbar-dark"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Container>
                      <Navbar.Brand href="#" className="fw-bold fs-3 text-white">
                        TMGF
                      </Navbar.Brand>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                      <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center">
                          <Nav.Link
                            href="#about"
                            className="text-white mx-2 fw-medium"
                            style={{ fontSize: "1.1rem" }}
                          >
                            About
                          </Nav.Link>
                          <Nav.Link
                            className="text-white mx-2 fw-medium position-relative"
                            style={{ fontSize: "1.1rem"}}
                            onClick={handleLogin}
                          >
                            Events
                          </Nav.Link>
                          <Button
                            variant="outline-light"
                            className="mx-2 px-4 py-2 fw-medium"
                            onClick={handleLogin}
                            style={{ borderRadius: "25px", transition: "all 0.3s ease" }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                              e.target.style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "transparent";
                              e.target.style.transform = "translateY(0)";
                            }}
                          >
                            Login
                          </Button>
                          <Button
                            variant="light"
                            className="mx-2 px-4 py-2 fw-medium"
                            onClick={handleSignup}
                            style={{
                              borderRadius: "25px",
                              transition: "all 0.3s ease",
                              color: "#667eea",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "#f8f9fa";
                              e.target.style.transform = "translateY(-2px)";
                              e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "white";
                              e.target.style.transform = "translateY(0)";
                              e.target.style.boxShadow = "none";
                            }}
                          >
                            Sign Up
                          </Button>
                        </Nav>
                      </Navbar.Collapse>
                    </Container>
                  </Navbar>

      {/* Main Content */}
      <div style={{ padding: '20px' }}>
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
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            Organizer Dashboard
          </h1>
          <p style={{
            fontSize: '1.2rem',
            opacity: '0.9'
          }}>
            Manage your volunteer events and track participation
          </p>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Add Event Button */}
          <div style={{
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            <button
              onClick={() => setShowAddForm(true)}
              style={{
                background: 'linear-gradient(135deg, #48bb78, #38a169)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '15px 30px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 20px rgba(72, 187, 120, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = '';
                e.target.style.boxShadow = '';
              }}
            >
              <Plus size={20} />
              Create New Event
            </button>
          </div>

          {/* Add/Edit Event Form */}
          {showAddForm && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '30px',
              marginBottom: '30px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
            }}>
              <h2 style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: '#2d3748',
                marginBottom: '25px',
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
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <label style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#2d3748',
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
                        padding: '12px 16px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#667eea';
                        e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '2px solid #e2e8f0';
                        e.target.style.boxShadow = '';
                      }}
                    />
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <label style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#2d3748',
                      marginBottom: '8px'
                    }}>
                      Organizer *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.organizer}
                      onChange={(e) => setFormData({...formData, organizer: e.target.value})}
                      style={{
                        padding: '12px 16px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#667eea';
                        e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '2px solid #e2e8f0';
                        e.target.style.boxShadow = '';
                      }}
                    />
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <label style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#2d3748',
                      marginBottom: '8px'
                    }}>
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      style={{
                        padding: '12px 16px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#667eea';
                        e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '2px solid #e2e8f0';
                        e.target.style.boxShadow = '';
                      }}
                    />
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <label style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#2d3748',
                      marginBottom: '8px'
                    }}>
                      Time *
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      style={{
                        padding: '12px 16px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#667eea';
                        e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '2px solid #e2e8f0';
                        e.target.style.boxShadow = '';
                      }}
                    />
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <label style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#2d3748',
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
                        padding: '12px 16px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#667eea';
                        e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '2px solid #e2e8f0';
                        e.target.style.boxShadow = '';
                      }}
                    />
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <label style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#2d3748',
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
                        padding: '12px 16px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#667eea';
                        e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '2px solid #e2e8f0';
                        e.target.style.boxShadow = '';
                      }}
                    />
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <label style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#2d3748',
                      marginBottom: '8px'
                    }}>
                      Category *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      style={{
                        padding: '12px 16px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#667eea';
                        e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '2px solid #e2e8f0';
                        e.target.style.boxShadow = '';
                      }}
                    >
                      <option value="Environmental">Environmental</option>
                      <option value="Social Service">Social Service</option>
                      <option value="Education">Education</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Community">Community</option>
                    </select>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gridColumn: '1 / -1'
                }}>
                  <label style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#2d3748',
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
                      resize: 'vertical',
                      minHeight: '100px',
                      padding: '12px 16px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#667eea';
                      e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.border = '2px solid #e2e8f0';
                      e.target.style.boxShadow = '';
                    }}
                  />
                </div>

                <div style={{
                  display: 'flex',
                  gap: '15px',
                  justifyContent: 'center',
                  marginTop: '30px'
                }}>
                  <button
                    type="submit"
                    style={{
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '25px',
                      padding: '12px 30px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-1px)';
                      e.target.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = '';
                      e.target.style.boxShadow = '';
                    }}
                  >
                    {editingEvent ? 'Update Event' : 'Create Event'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    style={{
                      background: 'transparent',
                      color: '#718096',
                      border: '2px solid #e2e8f0',
                      borderRadius: '25px',
                      padding: '12px 30px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#f7fafc';
                      e.target.style.borderColor = '#cbd5e0';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.borderColor = '#e2e8f0';
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Events List */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '25px'
          }}>
            {events.map(event => (
              <div 
                key={event.id} 
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '20px',
                  padding: '25px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
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
                    <div>
                      <h3 style={{
                        fontSize: '1.4rem',
                        fontWeight: 'bold',
                        color: '#2d3748',
                        margin: '0',
                        lineHeight: '1.3'
                      }}>
                        {event.title}
                      </h3>
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#718096',
                        margin: '5px 0 0 0',
                        fontStyle: 'italic'
                      }}>
                        by {event.organizer}
                      </p>
                    </div>
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
                </div>

                {/* Event Description */}
                <p style={{
                  color: '#666',
                  fontSize: '0.9rem',
                  margin: '0 0 15px 0',
                  lineHeight: '1.5'
                }}>
                  {event.description}
                </p>

                {/* Event Details */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <Calendar size={16} style={{
                      color: '#667eea',
                      marginRight: '8px'
                    }} />
                    <span style={{
                      fontSize: '0.9rem',
                      color: '#555'
                    }}>
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <Clock size={16} style={{
                      color: '#667eea',
                      marginRight: '8px'
                    }} />
                    <span style={{
                      fontSize: '0.9rem',
                      color: '#555'
                    }}>
                      {new Date(`2000-01-01T${event.time}`).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <MapPin size={16} style={{
                      color: '#667eea',
                      marginRight: '8px'
                    }} />
                    <span style={{
                      fontSize: '0.9rem',
                      color: '#555'
                    }}>
                      {event.location}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <Users size={16} style={{
                      color: '#667eea',
                      marginRight: '8px'
                    }} />
                    <span style={{
                      fontSize: '0.9rem',
                      color: '#555'
                    }}>
                      {event.volunteersRegistered} / {event.volunteersNeeded} volunteers registered
                    </span>
                  </div>
                </div>

                {/* Registration Progress */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <span style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#4a5568'
                    }}>
                      Registration Progress
                    </span>
                    <span style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#667eea'
                    }}>
                      {Math.round((event.volunteersRegistered / event.volunteersNeeded) * 100)}%
                    </span>
                  </div>
                  <div style={{
                    background: '#e2e8f0',
                    borderRadius: '10px',
                    height: '10px',
                    overflow: 'hidden'
                  }}>
                    <div 
                      style={{
                        background: 'linear-gradient(90deg, #667eea, #764ba2)',
                        height: '100%',
                        width: `${Math.min((event.volunteersRegistered / event.volunteersNeeded) * 100, 100)}%`,
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>
                </div>

                {/* Status Badge */}
                <div style={{
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    ...(event.volunteersRegistered >= event.volunteersNeeded 
                      ? {
                          background: '#c6f6d5',
                          color: '#22543d'
                        }
                      : event.volunteersRegistered > event.volunteersNeeded * 0.7
                      ? {
                          background: '#feebc8',
                          color: '#c05621'
                        }
                      : {
                          background: '#bee3f8',
                          color: '#2c5282'
                        })
                  }}>
                    {event.volunteersRegistered >= event.volunteersNeeded 
                      ? 'Fully Registered' 
                      : event.volunteersRegistered > event.volunteersNeeded * 0.7
                      ? 'Almost Full'
                      : 'Open for Registration'}
                  </span>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '10px'
                }}>
                  <button
                    onClick={() => handleEdit(event)}
                    style={{
                      flex: '1',
                      padding: '10px 16px',
                      background: 'linear-gradient(135deg, #4299e1, #3182ce)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-1px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(66, 153, 225, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = '';
                      e.target.style.boxShadow = '';
                    }}
                  >
                    <Edit3 size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => onDeleteEvent(event.id)}
                    style={{
                      flex: '1',
                      padding: '10px 16px',
                      background: 'linear-gradient(135deg, #e53e3e, #c53030)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-1px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(229, 62, 62, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = '';
                      e.target.style.boxShadow = '';
                    }}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>

                  <button 
                    style={{
                      flex: '1',
                      padding: '10px 16px',
                      background: 'transparent',
                      color: '#718096',
                      border: '2px solid #e2e8f0',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#f7fafc';
                      e.target.style.borderColor = '#cbd5e0';
                      e.target.style.color = '#4a5568';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.color = '#718096';
                    }}
                  >
                    <Eye size={16} />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {events.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '80px 20px',
              color: 'white'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '10px',
                opacity: '0.9'
              }}>
                No Events Created Yet
              </h3>
              <p style={{
                fontSize: '1rem',
                opacity: '0.7'
              }}>
                Start by creating your first volunteer event to engage your community
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                style={{
                  background: 'linear-gradient(135deg, #48bb78, #38a169)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '15px 30px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginTop: '20px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(72, 187, 120, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = '';
                  e.target.style.boxShadow = '';
                }}
              >
                <Plus size={20} />
                Create Your First Event
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizerView;