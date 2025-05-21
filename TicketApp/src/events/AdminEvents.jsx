// src/events/AdminEvents.jsx
import React, { useEffect, useState } from 'react';
import api from "../services/api";


function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/events')
      .then(res => setEvents(res.data))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading events...</p>;

  return (
    <div>
      <h1>All Events (Admin)</h1>
      {events.length === 0 && <p>No events found.</p>}
      <table>
        <thead>
          <tr>
            <th>Title</th><th>Date</th><th>Location</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.location}</td>
              <td>{event.status}</td>
              <td>
                <button>Approve</button>
                <button>Decline</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminEvents;
