import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await api.get(`/v1/bookings/${id}`);
        setBooking(res.data);
      } catch (err) {
        console.error("Error fetching booking:", err);
        setError(err.response?.data?.message || "Failed to fetch booking.");
      }
    };

    fetchBooking();
  }, [id]);

  if (error) {
    return (
      <div className="p-6 text-red-600">
        <p>{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!booking) return <div className="p-6">Loading...</div>;

  const event = booking.event;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-blue-800 mb-4">
        Booking Details
      </h2>

      <div className="border border-gray-300 p-6 rounded-xl bg-white shadow space-y-2">
        <h3 className="text-2xl font-semibold text-blue-700">{event.title}</h3>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Category:</strong> {event.category}</p>
        <p><strong>Tickets Booked:</strong> {booking.ticketsBooked}</p>
        <p><strong>Total Paid:</strong> ${booking.totalPrice}</p>
        <p><strong>Status:</strong> {booking.status}</p>
        <p><strong>Booked On:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Back to My Bookings
      </button>
    </div>
  );
}

export default BookingDetails;
