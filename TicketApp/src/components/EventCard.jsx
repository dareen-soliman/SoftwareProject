// src/components/EventCard.jsx
import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <Link
      to={`/events/${event._id}`}
      className="block border rounded-lg p-4 shadow hover:shadow-lg transition duration-200"
    >
      <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
      <p className="text-sm text-gray-600 mb-1">
        📍 {event.location}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        📅 {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-800 font-medium">
        🎟️ ${event.ticketPrice}
      </p>
    </Link>
  );
}

export default EventCard;
