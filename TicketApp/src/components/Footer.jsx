import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

const Footer = () => {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);

  useEffect(() => {
    // Function to check if navbar is collapsed
    const checkNavbarState = () => {
      const mainContent = document.querySelector('.main-content');
      setIsNavbarCollapsed(mainContent?.classList.contains('full-width') || false);
    };

    // Initial check
    checkNavbarState();

    // Create observer to watch for class changes on main-content
    const observer = new MutationObserver(checkNavbarState);
    const mainContent = document.querySelector('.main-content');
    
    if (mainContent) {
      observer.observe(mainContent, {
        attributes: true,
        attributeFilter: ['class']
      });
    }

    return () => observer.disconnect();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer ${isNavbarCollapsed ? 'full-width' : 'with-navbar'}`}>
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Eicket</h4>
          <p>Your premier destination for event ticketing and management.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <ul>
            <li>Email: support@eicket.com</li>
            <li>Phone: (123) 456-7890</li>
            <li>Address: 123 Event Street, City</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Eicket. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 