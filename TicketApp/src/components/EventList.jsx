import { useEffect, useState } from "react";
import api from "../services/api";
import EventCard from "./EventCard.jsx";
import '../styles/dashboard.css';

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchApprovedEvents = async () => {
      try {
        const response = await api.get("/v1/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching approved events:", error);
      }
    };

    fetchApprovedEvents();
  }, []);

  return (
    <div className="main-content">
      <h1 className="dashboard-title">Upcoming Events</h1>
      <div className="dashboard-grid">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default EventList;
