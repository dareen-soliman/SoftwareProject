// src/events/MyEvents.jsx
import React, { useEffect, useState } from 'react';
import api from "../services/api";
import '../styles/dashboard.css';

function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/organizer/events')
      .then(res => setEvents(res.data))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="main-content">
        <div className="loading-state">Loading your events...</div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <h1 className="dashboard-title">My Events</h1>
      {events.length === 0 && (
        <div className="empty-state">
          <p>You have no events.</p>
          <button className="dashboard-button">Create New Event</button>
        </div>
      )}
      <div className="dashboard-grid">
        {events.map(event => (
          <div key={event.id} className="dashboard-card">
            <h3 className="event-title">{event.title}</h3>
            <div className="event-meta">
              <span>📍 {event.location}</span>
              <span>📅 {new Date(event.date).toLocaleDateString()}</span>
            </div>
            <p className="event-description">{event.description}</p>
            <div className="event-details">
              <p className="event-price">🎟️ ${event.price}</p>
              <div className="event-actions">
                <button className="dashboard-button">Edit</button>
                <button className="dashboard-button delete-button">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyEvents;
