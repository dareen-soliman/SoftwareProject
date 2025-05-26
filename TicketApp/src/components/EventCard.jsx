// src/components/EventCard.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import '../styles/dashboard.css';

function EventCard({ event }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="dashboard-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <Link to={`/events/${event._id}`} className="event-content">
        <h3 className="event-title">{event.title}</h3>
        <div className="event-meta">
          <span className="event-location">
            <i className="fas fa-map-marker-alt"></i> {event.location}
          </span>
          <span className="event-date">
            <i className="far fa-calendar-alt"></i> {new Date(event.date).toLocaleDateString()}
          </span>
        </div>
        <p className="event-description">{event.description}</p>
        <div className="event-details">
          <p className="event-price">
            <i className="fas fa-ticket-alt"></i> ${event.ticketPrice}
          </p>
          <p className="tickets-available">
            <i className="fas fa-ticket-alt"></i> {event.remainingTickets} tickets available
          </p>
          <div className="view-details-button">
            <span className="button-text">
              <i className="fas fa-arrow-right"></i> View Details
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default EventCard;
