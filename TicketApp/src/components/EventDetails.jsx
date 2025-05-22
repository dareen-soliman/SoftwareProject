import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import BookTicketForm from "../components/BookTicketForm";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/v1/events/${id}`);
        setEvent(res.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching event:", error);
        setError("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        Loading event details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 text-lg">
        {error}
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        Event not found.
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-3xl">
        <img
          src={event.image}
          alt={event.title}
          className="w-full max-h-96 object-cover rounded-xl mb-6"
        />

        <h1 className="text-4xl font-bold text-center text-blue-800 mb-4">
          {event.title}
        </h1>

        <div className="text-gray-700 text-center space-y-2 mb-6">
          <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Category:</strong> {event.category}</p>
          <p><strong>Ticket Price:</strong> ${event.ticketPrice}</p>
          <p><strong>Available Tickets:</strong> {event.remainingTickets}</p>
        </div>

        <p className="mb-8 text-center text-gray-800 whitespace-pre-line">
          {event.description}
        </p>

        {user ? (
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl text-center">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">🎟️ Book Your Ticket</h2>
            <BookTicketForm event={event} />
          </div>
        ) : (
          <div className="text-center mt-4">
            <p className="text-red-600 font-medium mb-4">Please log in to book a ticket.</p>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full shadow transition-all"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
