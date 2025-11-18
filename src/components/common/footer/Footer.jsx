import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-muted py-3 border-top mt-auto" style={{ fontSize: '0.875rem' }}>
      <Container>
        <span>
          &copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.
        </span>
      </Container>
    </footer>
  );
};

export default Footer;
