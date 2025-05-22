import { useState } from "react";
import api from "../services/api";

const BookTicketForm = ({ event }) => {
  const [quantity, setQuantity] = useState(1);
  const [bookingStatus, setBookingStatus] = useState(null); // success or error messages
  const [loading, setLoading] = useState(false);

  const maxTickets = event.remainingTickets;

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0 && value <= maxTickets) {
      setQuantity(value);
      setBookingStatus(null);
    } else if (value > maxTickets) {
      setBookingStatus(`Only ${maxTickets} tickets available.`);
    } else {
      setQuantity(1);
      setBookingStatus(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBookingStatus(null);

    if (quantity < 1 || quantity > maxTickets) {
      setBookingStatus(`Please select a valid quantity (1 to ${maxTickets}).`);
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/v1/bookings", {
        eventId: event._id,
        ticketsBooked: quantity,
      });

      setBookingStatus(`Booking successful! You booked ${quantity} ticket(s).`);
      // Optionally: reset quantity or do other UI updates
    } catch (error) {
      console.error("Booking error:", error);
      // Show error message from backend if available
      const message =
        error.response?.data?.message || "Booking failed. Please try again.";
      setBookingStatus(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        Quantity:
        <input
          type="number"
          min="1"
          max={maxTickets}
          value={quantity}
          onChange={handleQuantityChange}
          className="ml-2 border rounded px-2 py-1 w-20"
          disabled={loading}
        />
      </label>

      <p>
        Total Price: <strong>${(event.ticketPrice * quantity).toFixed(2)}</strong>
      </p>

      <button
        type="submit"
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? "Booking..." : "Book"}
      </button>

      {bookingStatus && (
        <p className={`mt-2 ${bookingStatus.includes("successful") ? "text-green-600" : "text-red-600"}`}>
          {bookingStatus}
        </p>
      )}
    </form>
  );
};

export default BookTicketForm;
