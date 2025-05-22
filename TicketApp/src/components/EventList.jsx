// src/pages/EventList.jsx
import { useEffect, useState } from "react";
import api from "../services/api";
import EventCard from "./EventCard.jsx";

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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Approved Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default EventList;
