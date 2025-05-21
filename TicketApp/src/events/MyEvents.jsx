// src/events/MyEvents.jsx
import React, { useEffect, useState } from 'react';
import api from "../services/api";


function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/organizer/events')
      .then(res => setEvents(res.data))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading your events...</p>;

  return (
    <div>
      <h1>My Events</h1>
      {events.length === 0 && <p>You have no events.</p>}
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.title} — {new Date(event.date).toLocaleDateString()} — {event.location} — ${event.price}
            {/* Edit and Delete buttons can be added here */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyEvents;
