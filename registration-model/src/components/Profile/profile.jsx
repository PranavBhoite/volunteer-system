import React, { useState, useEffect } from 'react';
import { Button, Card, Dropdown, Container, Row, Col } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [showCard, setShowCard] = useState(false);
  const [domToImageLoaded, setDomToImageLoaded] = useState(false);
  const [jsPDFLoaded, setJsPDFLoaded] = useState(false);

  const user = {
    name: 'John Doe',
    id: '123456',
    email: 'john@example.com',
    mobileNo: '9876543210',
    address: '123 Main Street, City, State, ZIP',
  };

  useEffect(() => {
    const loadScript = (src, id, onLoadCallback) => {
      if (document.getElementById(id)) {
        onLoadCallback();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.id = id;
      script.onload = onLoadCallback;
      script.onerror = () => console.error(`Failed to load script: ${src}`);
      document.head.appendChild(script);
    };

    loadScript(
      'https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js',
      'dom-to-image-script',
      () => setDomToImageLoaded(true)
    );

    loadScript(
      'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
      'jspdf-script',
      () => setJsPDFLoaded(true)
    );
  }, []);

  const handleDownloadPdf = async () => {
    const input = document.getElementById('virtual-id-card');
    if (!input || !window.domtoimage || !window.jspdf) {
      console.warn('Libraries not loaded or input element missing');
      return;
    }

    try {
      const { jsPDF } = window.jspdf;

      const scale = 2;
      const style = {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${input.offsetWidth}px`,
        height: `${input.offsetHeight}px`,
      };

      const dataUrl = await window.domtoimage.toPng(input, {
        width: input.offsetWidth * scale,
        height: input.offsetHeight * scale,
        style,
        quality: 1,
      });

      const pdf = new jsPDF('portrait', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const img = new Image();
      img.src = dataUrl;

      img.onload = () => {
        const pxToMm = (px) => (px * 25.4) / 96;
        const imgWidthMm = pxToMm(img.width);
        const imgHeightMm = pxToMm(img.height);

        let finalWidth = imgWidthMm;
        let finalHeight = imgHeightMm;

        if (imgWidthMm > pageWidth) {
          finalWidth = pageWidth;
          finalHeight = (imgHeightMm * pageWidth) / imgWidthMm;
        }
        if (finalHeight > pageHeight) {
          finalHeight = pageHeight;
          finalWidth = (imgWidthMm * pageHeight) / imgHeightMm;
        }

        const x = (pageWidth - finalWidth) / 2;
        const y = (pageHeight - finalHeight) / 2;

        pdf.addImage(dataUrl, 'PNG', x, y, finalWidth, finalHeight);
        pdf.save('Virtual_ID.pdf');
      };
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <Container className="py-5 bg-light min-vh-100">
      <Row className="justify-content-end mb-4">
        <Col xs="auto">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="primary"
              onClick={() => setShowCard(prev => !prev)}
              className="shadow-sm"
            >
              Virtual ID
            </Button>
          </motion.div>
        </Col>
      </Row>

      <AnimatePresence>
        {showCard && (
          <Row className="justify-content-center mt-5">
            <Col xs="auto">
              <motion.div
                id="virtual-id-card"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7, y: 20 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              >
                <Card
                  className="p-4 text-white shadow-lg border-0"
                  style={{
                    width: '22rem',
                    background: 'linear-gradient(to bottom right, #8A2BE2, #4B0082)',
                    borderRadius: '1rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Dropdown className="position-absolute" style={{ top: '1rem', right: '1rem' }}>
                    <Dropdown.Toggle
                      variant="light"
                      size="sm"
                      className="bg-transparent border-0 text-white p-0"
                    >
                      <span style={{ fontSize: '1.5rem', lineHeight: '1' }}>&#8942;</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleDownloadPdf}>Download PDF</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Card.Body className="text-center">
                    <Card.Subtitle className="mb-2 text-white-50">Virtual ID Card</Card.Subtitle>
                    <Card.Title as="h3" className="mb-3 fw-bold">{user.name}</Card.Title>
                    <Card.Text className="mb-4">ID: {user.id}</Card.Text>
                    <Card.Text className="text-start">
                      <strong>Email:</strong> {user.email} <br />
                      <strong>Contact:</strong> {user.mobileNo} <br />
                      <strong>Address:</strong> {user.address}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default App;