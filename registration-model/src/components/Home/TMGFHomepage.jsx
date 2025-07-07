import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Row,
  Col,
  Card
} 
from "react-bootstrap";
import { FaHome, FaGraduationCap, FaHeartbeat, FaLeaf, FaTrophy, FaRegFileAlt, FaPrayingHands, FaHandsHelping, FaUserFriends, FaHeart } from 'react-icons/fa';
import './TMGFHomepage.css';

const TMGFHomepage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaHome style={{ color: '#fff', fontSize: 32 }} />, // Orphanages
      title: "Orphanages & Shelter Homes",
      description:
        "Runs 4 orphanages—like Shree Manashanti Chhatralaya, Mamata Bal Sadan and Maainagari—offering safe shelter, food and care to 260+ children",
      gradient: "linear-gradient(135deg, var(--tmgf-primary-2), var(--tmgf-primary-1))",
    },
    {
      icon: <FaGraduationCap style={{ color: '#fff', fontSize: 32 }} />, // Education
      title: "Education Support",
      description:
        "Supports education for 260+ children across 12 schools and 5 colleges; includes libraries, computer labs and motivational sessions",
      gradient: "linear-gradient(135deg, var(--tmgf-primary), var(--tmgf-primary-2))",
    },
    {
      icon: <FaHeartbeat style={{ color: '#fff', fontSize: 32 }} />, // Healthcare
      title: "Healthcare & Nutrition",
      description:
        "Provides quality food, routine medical care, and hospital tie‑ups to ensure holistic health and well‑being",
      gradient: "linear-gradient(135deg, var(--tmgf-primary-3), var(--tmgf-primary-1))",
    },
    {
      icon: <FaLeaf style={{ color: '#fff', fontSize: 32 }} />, // Emotional & Social
      title: "Emotional & Social Upliftment",
      description:
        "Creates loving, home‑like environments to build confidence, emotional stability and seamless integration into society",
      gradient: "linear-gradient(135deg, var(--tmgf-primary-4), var(--tmgf-primary-2))",
    },
    {
      icon: <FaTrophy style={{ color: '#fff', fontSize: 32 }} />, // Alumni Success
      title: "Alumni Success & Impact",
      description:
        "Over 2,100 orphaned individuals raised; 1,000+ are employed and 400+ are married, reflecting long‑term rehabilitation success",
      gradient: "linear-gradient(135deg, var(--tmgf-primary-1), var(--tmgf-primary-3))",
    },
    {
      icon: <FaRegFileAlt style={{ color: '#fff', fontSize: 32 }} />, // Registered NGO
      title: "Registered & Credible NGO",
      description:
        "Officially registered since 2017, working under a transparent governance structure led by trusts and Padma Shri recipient Sindhutai Maai",
      gradient: "linear-gradient(135deg, var(--tmgf-primary-2), var(--tmgf-primary-4))",
    },
  ];

  const testimonials = [
    {
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "Volunteering with TMGF has been a life-changing experience. The love and support here are unmatched!",
      name: "Priya Sharma",
      role: "Volunteer, 2 years",
      border: "3px solid var(--tmgf-primary-2)"
    },
    {
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "TMGF gave me the opportunity to give back to society and grow as a person. Highly recommended!",
      name: "Rahul Verma",
      role: "Volunteer, 1 year",
      border: "3px solid var(--tmgf-primary)"
    },
    {
      img: "https://randomuser.me/api/portraits/women/65.jpg",
      text: "The children's smiles and the team spirit at TMGF inspire me every day. I'm proud to be part of this family.",
      name: "Sneha Patil",
      role: "Volunteer, 3 years",
      border: "3px solid var(--tmgf-primary-3)"
    }
  ];

  // Strictly allow only one nav tab to be selected at a time, including About, Initiatives, Team, Contact
  const getActiveNav = () => {
    const { pathname, hash } = window.location;
    if (pathname === '/' && (!hash || hash === '')) return 'home';
    if (hash === '#team') return 'team';
    if (pathname === '/about') return 'about';
    if (pathname === '/initiatives') return 'initiatives';
    if (pathname === '/contact') return 'contact';
    // For external links, highlight only if user is on the homepage and hash matches
    if (window.location.href.includes('sindhutaisapkal.org/about')) return 'about';
    if (window.location.href.includes('sindhutaisapkal.org/initiatives')) return 'initiatives';
    if (window.location.href.includes('sindhutaisapkal.org/contact')) return 'contact';
    return '';
  };
  const activeNav = getActiveNav();

  return (
    <div
      className="min-vh-100"
      style={{
        background: `linear-gradient(135deg, var(--tmgf-primary-1) 0%, #fff 100%)`,
        fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
        color: 'var(--tmgf-primary-4)'
      }}
    >
      {/* Navigation */}
      <Navbar expand="lg" className="tmgf-navbar sticky-top py-2">
        <Container fluid>
          <Navbar.Brand className="d-flex align-items-center me-4" style={{cursor: 'pointer'}} onClick={() => navigate('/')}>
            <a href="/" style={{display: 'inline-block'}}>
              <img
                src="/images/LOGO.png"
                alt="TMGF Logo"
                className="img-fluid"
                style={{
                  width: "220px",
                  height: "auto",
                  objectFit: "contain",
                  marginRight: "10px",
                  background: "none",
                  border: "none",
                  boxShadow: "none"
                }}
              />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="tmgf-navbar-nav" />
          <Navbar.Collapse id="tmgf-navbar-nav">
            <Nav className="d-flex align-items-center flex-lg-row flex-column justify-content-lg-end justify-content-start w-100 text-start ps-lg-0 ps-3 tmgf-navbar-nav">
              <Nav.Link className={`nav-link${activeNav === 'home' ? ' active' : ''}`} href="#home">Home</Nav.Link>
              {/* Removed About and Initiatives links */}
              {/* Team now scrolls to the team section below */}
              <Nav.Link className={`nav-link${activeNav === 'team' ? ' active' : ''}`} href="#team">Team</Nav.Link>
              {/* Removed Contact link from navbar */}
              <Button
                onClick={() => navigate('/Registration')}
                className="tmgf-btn-donate d-flex align-items-center tmgf-btn-navbar"
              >
                <span style={{
                  background: '#fff',
                  color: '#ac2e62',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  marginRight: 4,
                  fontWeight: 900
                }}>♥</span>
                Get Started
              </Button>
              <Button
                onClick={() => navigate('/login')}
                className="tmgf-btn-donate d-flex align-items-center tmgf-btn-navbar"
              >
                <span style={{
                  background: '#fff',
                  color: '#ac2e62',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  marginRight: 4,
                  fontWeight: 900
                }}>♥</span>
                Login
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section
        className="tmgf-hero position-relative" id="home"
        style={{
          padding: '0',
          background: 'none',
          minHeight: '60vh',
          overflow: 'hidden',
        }}
      >
        {/* Background image with dark overlay */}
        <div
        
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: "url('/images/tmgf-children.jpg')",
            backgroundColor: 'var(--tmgf-black)',
            backgroundBlendMode: 'luminosity',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(1.5) brightness(0.45)',
            zIndex: 1,
            pointerEvents: 'none',
            userSelect: 'none',
            borderRadius: 0
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(255,255,255,0.25)',
            zIndex: 2,
          }}
        />
        <Container style={{position: 'relative', zIndex: 3}}>
          <Row className="align-items-center justify-content-center g-5" style={{minHeight: '60vh'}}>
            <Col lg={8} className="mx-auto">
              <div className="text-center mx-auto" style={{
                borderRadius: 24,
                padding: '2.5rem 2rem',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                background: 'none',
                border: 'none',
                backdropFilter: 'none',
                WebkitBackdropFilter: 'none'
              }}>
                <h1 className="tmgf-hero-title mb-3" style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '4.5rem',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  color: '#ffffff',
                  textShadow: 'none',
                  letterSpacing: '1px'
                }}>
                  Volunteer<br/>
                  <span style={{color: '#ffffff'}}>Management</span>
                </h1>
                <p className="tmgf-hero-subtitle mb-4" style={{
                  fontSize: '1.35rem',
                  color: '#ffffff',
                  fontWeight: 500,
                  maxWidth: 480,
                  margin: '0 auto',
                  textShadow: 'none'
                }}>
                  Empower your NGO with our comprehensive volunteer management platform for TMGF
                </p>
                <div className="d-flex flex-wrap gap-3 justify-content-center mb-4">
                  <Button
                    className="tmgf-btn-discover"
                    style={{
                      background: '#ac2e62',
                      color: '#fff',
                      borderRadius: 999,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      border: 'none',
                      boxShadow: 'none',
                      letterSpacing: '0.5px',
                      fontSize: '1.08rem',
                      padding: '0.55rem 1.5rem',
                      height: 'auto',
                      minWidth: 'auto',
                      width: 'auto',
                      maxWidth: 'none',
                    }}
                    href="https://sindhutaisapkal.org/donate"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span style={{
                      background: '#fff',
                      color: '#ac2e62',
                      borderRadius: '50%',
                      width: 22,
                      height: 22,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      marginRight: 7,
                      fontWeight: 900
                    }}>♥</span>
                    Donate Now
                  </Button>
                  <Button
                    className="tmgf-btn-discover"
                    style={{
                      background: '#ac2e62',
                      color: '#fff',
                      borderRadius: 999,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      border: 'none',
                      boxShadow: 'none',
                      letterSpacing: '0.5px',
                      fontSize: '1.08rem',
                      padding: '0.55rem 1.5rem',
                      height: 'auto',
                      minWidth: 'auto',
                      width: 'auto',
                      maxWidth: 'none',
                    }}
                    onClick={() => navigate('/Registration')}
                  >
                    <span style={{
                      background: '#fff',
                      color: '#ac2e62',
                      borderRadius: '50%',
                      width: 22,
                      height: 22,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      marginRight: 7,
                      fontWeight: 900
                    }}>♥</span>
                    Get Started
                  </Button>
                  <Button
                    className="tmgf-btn-discover"
                    style={{
                      background: '#ac2e62',
                      color: '#fff',
                      borderRadius: 999,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      border: 'none',
                      boxShadow: 'none',
                      letterSpacing: '0.5px',
                      fontSize: '1.08rem',
                      padding: '0.55rem 1.5rem',
                      height: 'auto',
                      minWidth: 'auto',
                      width: 'auto',
                      maxWidth: 'none',
                    }}
                    href="https://www.youtube.com/watch?app=desktop&v=XE2zps1lWdQ"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span style={{
                      background: '#fff',
                      color: '#ac2e62',
                      borderRadius: '50%',
                      width: 22,
                      height: 22,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      marginRight: 7,
                      fontWeight: 900
                    }}>♥</span>
                    Know More
                  </Button>
                </div>
                <Row className="g-3 mt-4 justify-content-center tmgf-hero-stats-row">
                  <Col xs={12} sm={4} md={3} className="tmgf-hero-stat-col mb-3 mb-sm-0">
                    <div className="text-center p-3 tmgf-hero-stat-card" style={{background: '#fff', boxShadow: '0 2px 8px rgba(172,46,98,0.08)', border: '1px solid #eee', borderRadius: 16}}>
                      <h2 className="fw-bold mb-1" style={{fontSize: '2.2rem'}}>120</h2>
                      <div style={{fontWeight: 600, fontSize: '1rem'}}>Active Volunteers</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={4} md={3} className="tmgf-hero-stat-col mb-3 mb-sm-0">
                    <div className="text-center p-3 tmgf-hero-stat-card" style={{background: '#fff', boxShadow: '0 2px 8px rgba(172,46,98,0.08)', border: '1px solid #eee', borderRadius: 16}}>
                      <h2 className="fw-bold mb-1" style={{fontSize: '2.2rem'}}>24</h2>
                      <div style={{fontWeight: 600, fontSize: '1rem'}}>Events</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={4} md={3} className="tmgf-hero-stat-col">
                    <div className="text-center p-3 tmgf-hero-stat-card" style={{background: '#fff', boxShadow: '0 2px 8px rgba(172,46,98,0.08)', border: '1px solid #eee', borderRadius: 16}}>
                      <h2 className="fw-bold mb-1" style={{fontSize: '2.2rem'}}>24/7</h2>
                      <div style={{fontWeight: 600, fontSize: '1rem'}}>Support</div>
                    </div>
                  </Col>
                </Row>
                <style>{`
                  @media (max-width: 768px) {
                    .tmgf-hero-stats-row {
                      justify-content: center !important;
                      gap: 0.5rem !important;
                    }
                    .tmgf-hero-stat-col {
                      display: flex;
                      justify-content: center;
                      align-items: stretch;
                      padding-left: 0;
                      padding-right: 0;
                      margin-bottom: 1rem !important;
                    }
                    .tmgf-hero-stat-card {
                      min-width: 110px;
                      max-width: 110px;
                      min-height: 90px;
                      border-radius: 10px !important;
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                      background: #fff !important;
                      box-shadow: 0 2px 8px rgba(172,46,98,0.08) !important;
                      border: 1px solid #eee !important;
                    }
                  }
                  @media (max-width: 576px) {
                    .tmgf-hero-stat-col {
                      margin-bottom: 1.2rem !important;
                    }
                  }
                `}</style>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="tmgf-section" style={{background: 'var(--tmgf-secondary-2)'}}>
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold tmgf-section-title mb-3">Our Services</h2>
            <p className="lead text-muted mx-auto" style={{maxWidth: 600}}>
              TMGF is dedicated to transforming lives through holistic support, education, and empowerment.
            </p>
          </div>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col key={index} sm={6} lg={4}>
                <Card className="tmgf-card h-100 border-0 text-center p-4">
                  <div className="tmgf-feature-icon mb-3" style={{background: '#ac2e62', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', boxShadow: '0 2px 8px rgba(172,46,98,0.08)'}}>{React.cloneElement(feature.icon, { color: '#fff' })}</div>
                  <Card.Title className="h5 fw-bold mb-2" style={{color: 'var(--tmgf-primary-4)'}}>{feature.title}</Card.Title>
                  <Card.Text className="text-muted lh-base">{feature.description}</Card.Text>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="tmgf-section" style={{background: '#f7f7f7'}}>
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold tmgf-section-title mb-3">What Our Volunteers Say</h2>
            <p className="lead text-muted mx-auto" style={{maxWidth: 600}}>
              Real stories from people making a difference with TMGF.
            </p>
          </div>
          <div style={{overflow: 'hidden', width: '100%'}}>
            <div className="tmgf-testimonial-train" style={{display: 'flex', width: 'max-content', animation: 'testimonialTrain 18s linear infinite'}}>
              {testimonials.concat(testimonials).map((t, idx) => (
                <div key={idx} style={{minWidth: 340, maxWidth: 340, margin: '0 18px'}}>
                  <Card className="tmgf-card h-100 border-0 p-4">
                    <Card.Body className="text-center">
                      <img
                        src={t.img}
                        alt={t.name}
                        className="rounded-circle mb-3"
                        style={{ width: "70px", height: "70px", objectFit: "cover", border: t.border }}
                      />
                      <Card.Text className="mb-3 text-muted">
                        "{t.text}"
                      </Card.Text>
                      <h6 className="fw-bold mb-0">{t.name}</h6>
                      <small className="text-secondary">{t.role}</small>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @keyframes testimonialTrain {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .tmgf-testimonial-train:hover {
              animation-play-state: paused;
            }
          `}</style>
        </Container>
      </section>

      {/* How You Can Help Section */}
      <section className="tmgf-section" style={{background: 'var(--tmgf-secondary-1)'}}>
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold tmgf-section-title mb-3">How You Can Help</h2>
            <p className="lead text-muted mx-auto" style={{maxWidth: 600}}>
              We believe we can save more lives with you
            </p>
          </div>
          <Row className="g-4 justify-content-center">
            <Col md={3} sm={6} xs={12} className="text-center">
              <div className="tmgf-feature-icon mb-3" style={{background: '#ac2e62'}}>
                <FaPrayingHands style={{ fontSize: 40, color: '#fff' }} />
              </div>
              <h5 className="fw-bold mb-2">Prayers</h5> 
              <p className="text-muted">Pray for the well being of our children and bless them to be happy and healthy</p>
            </Col>
            <Col md={3} sm={6} xs={12} className="text-center">
              <div className="tmgf-feature-icon mb-3" style={{background: '#ac2e62'}}>
                <FaHandsHelping style={{ fontSize: 40, color: '#fff' }} />
              </div>
              <h5 className="fw-bold mb-2">Support</h5>
              <p className="text-muted">Be a part of our initiatives and help us achieve our goals with your expertise and resources</p>
            </Col>
            <Col md={3} sm={6} xs={12} className="text-center">
              <div className="tmgf-feature-icon mb-3" style={{background: '#ac2e62'}}>
                <FaUserFriends style={{ fontSize: 40, color: '#fff' }} />
              </div>
              <h5 className="fw-bold mb-2">Volunteer</h5>
              <p className="text-muted">Volunteer with us, share your time and expertise for the betterment of children.</p>
            </Col>
            <Col md={3} sm={6} xs={12} className="text-center">
              <div className="tmgf-feature-icon mb-3" style={{background: '#ac2e62'}}>
                <FaHeart style={{ fontSize: 40, color: '#fff' }} />
              </div>
              <h5 className="fw-bold mb-2">Donations</h5>
              <p className="text-muted">Make donations to help us run our initiatives and orphanages.</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Team Section */}
      <section className="tmgf-section" style={{background: 'var(--tmgf-primary-3)', marginBottom: 0}} id="team">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <img
                src="/images/tmgf-team.jpg"
                alt="TMGF Team"
                className="img-fluid rounded-4 shadow-lg"
                style={{maxHeight: 340, objectFit: "cover"}}
              />
            </Col>
            <Col md={6}>
              <h2 className="display-6 fw-bold tmgf-section-title mb-3" style={{color: '#fff'}}>Backbone of TMGF</h2>
              <p className="lead mb-4" style={{color: '#fff'}}>
                People who inspire us, guide us and help us to undertake initiatives and achieve our goals
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="tmgf-footer py-4" style={{background: '#333333', color: '#e5e5e5', marginTop: 0, fontSize: '1rem', letterSpacing: 0.1}}>
        <Container>
          <Row className="align-items-center justify-content-between">
            <Col md={6} className="mb-3 mb-md-0 text-center text-md-start">
              <img
                src="/images/LOGO.png"
                alt="TMGF Logo"
                style={{
                  width: 200,
                  height: 110,
                  borderRadius: '0',
                  background: 'none',
                  marginBottom: 10,
                  marginTop: 6,
                  boxShadow: 'none',
                  objectFit: 'contain',
                  display: 'block',
                  marginLeft: 0
                }}
              />
              <div className="fw-bold fs-4 mt-2" style={{color: '#e5e5e5', letterSpacing: 1}}>The Mother Global Foundation</div>
              <div style={{fontSize: '1.05rem', color: '#b0b0b0', marginTop: 4}}>Empowering Lives. Creating Impact.</div>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <div className="fw-bold mb-2" style={{fontSize: '1.08rem', color: '#e5e5e5'}}>Contact</div>
              <div style={{fontSize: '0.97rem', color: '#b0b0b0', lineHeight: 1.6}}>
                info@tmgf.in<br/>
                +91 9881337914<br/>
                Shirur, Maharashtra
              </div>
              <div className="mt-2" style={{fontSize: '0.93rem', color: '#b0b0b0', opacity: 0.8}}>
                &copy; 2025 TMGF NGO. All rights reserved.
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default TMGFHomepage;
