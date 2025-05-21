// src/pages/EventDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from "../services/api";
import { useAuth } from '../context/AuthContext';

function EventDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading event details...</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <div>
      <h1>{event.title}</h1>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Location: {event.location}</p>
      <p>Tickets available: {event.ticketsAvailable}</p>
      <p>Price: ${event.price}</p>
      
      {user ? (
        <button>Book Ticket (placeholder)</button>
      ) : (
        <p>Please <a href="/login">login</a> to book tickets.</p>
      )}
    </div>
  );
}

export default EventDetails;
