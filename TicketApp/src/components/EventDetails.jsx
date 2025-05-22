import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <p>Loading event details...</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <img src={event.image} alt={event.title} className="w-full rounded-xl mb-4" />
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-gray-600 mb-2">Date: {new Date(event.date).toLocaleString()}</p>
      <p className="text-gray-600 mb-2">Location: {event.location}</p>
      <p className="text-gray-600 mb-2">Category: {event.category}</p>
      <p className="text-gray-600 mb-2">Ticket Price: ${event.ticketPrice}</p>
      <p className="text-gray-600 mb-4">Available Tickets: {event.remainingTickets}</p>
      <p className="mb-4">{event.description}</p>

      {user ? (
        <div className="bg-blue-100 p-4 rounded-lg">
          <p>🎟️ Book your ticket here!</p>
          {/* You can place BookTicketForm component here when ready */}
        </div>
      ) : (
        <p className="text-red-600">Please login to book a ticket.</p>
      )}
    </div>
  );
};

export default EventDetails;
