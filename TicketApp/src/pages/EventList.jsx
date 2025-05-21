import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/events/approved")
      .then((res) => {
        console.log("API response:", res.data);
        const data = res.data;
        // Support for data either as an array or an object with 'events' property
        const eventList = Array.isArray(data) ? data : data.events || [];
        setEvents(eventList);
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading events...</p>;

  return (
    <div>
      <h1>Approved Events</h1>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <Link to={`/events/${event.id}`}>
                {event.title} — {new Date(event.date).toLocaleDateString()} — {event.location} — ${event.price}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventList;
