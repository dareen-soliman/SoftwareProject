import { useState, useEffect } from "react";
import api from "../services/api";
import '../styles/dashboard.css';

const BookTicketForm = ({ event }) => {
  const [quantity, setQuantity] = useState(1);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const maxTickets = Math.max(1, event.remainingTickets || 1);

  // Reset quantity if maxTickets changes
  useEffect(() => {
    setQuantity(Math.min(quantity, maxTickets));
  }, [maxTickets]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    // Ensure the value is within bounds
    const validatedValue = Math.min(Math.max(1, value), maxTickets);
    console.log('Quantity changed to:', validatedValue); // Debug log
    setQuantity(validatedValue);
    setBookingStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBookingStatus(null);

    // Validate quantity before submission
    if (quantity < 1 || quantity > maxTickets) {
      setBookingStatus(`Please select a valid quantity (1 to ${maxTickets}).`);
      return;
    }

    setLoading(true);
    console.log('Attempting to book tickets:', { // Debug log
      eventId: event._id,
      quantity: quantity,
      maxTickets: maxTickets
    });

    try {
      // Token is handled by api interceptor
      const response = await api.post("/v1/bookings", {
        eventId: event._id,
        ticketsBooked: quantity
      });

      console.log('Booking response:', response.data); // Debug log

      if (response.data) {
        setBookingStatus(`Success! You've booked ${quantity} ticket${quantity > 1 ? 's' : ''}.`);
        // Reset quantity after successful booking
        setQuantity(1);
      }
    } catch (error) {
      console.error("Booking error:", error.response || error);
      let errorMessage = "Booking failed. Please try again.";
      
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "Please log in to book tickets.";
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      }
      
      setBookingStatus(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form-container">
      <h3 className="booking-title">Book Your Tickets</h3>
      
      <div className="event-summary">
        <p className="event-info">
          <strong>Event:</strong> {event.title}
        </p>
        <p className="event-info">
          <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="event-info">
          <strong>Location:</strong> {event.location}
        </p>
        <p className="event-info">
          <strong>Available Tickets:</strong> {maxTickets}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="quantity-selector">
          <label className="quantity-label">
            <strong>Select Quantity:</strong> <span className="quantity-value">{quantity}</span>
          </label>
          <div className="slider-container">
            <input
              type="range"
              min="1"
              max={maxTickets}
              value={quantity}
              onChange={handleQuantityChange}
              className="ticket-slider"
              disabled={loading || maxTickets <= 1}
              step="1"
            />
            <div className="slider-labels">
              <span>1</span>
              <span>{maxTickets}</span>
            </div>
          </div>
        </div>

        <div className="price-summary">
          <p className="price-per-ticket">
            <strong>Price per ticket:</strong> ${event.ticketPrice}
          </p>
          <p className="total-price">
            <strong>Total Price:</strong> <span className="price-value">${(event.ticketPrice * quantity).toFixed(2)}</span>
          </p>
        </div>

        <button
          type="submit"
          className={`booking-submit-button ${loading ? 'loading' : ''}`}
          disabled={loading || maxTickets < 1}
        >
          {loading ? (
            <span className="loading-text">
              <i className="fas fa-spinner fa-spin"></i> Processing...
            </span>
          ) : (
            <span className="button-text">
              <i className="fas fa-ticket-alt"></i> {maxTickets < 1 ? 'Sold Out' : 'Confirm Booking'}
            </span>
          )}
        </button>

        {bookingStatus && (
          <div className={`booking-status ${bookingStatus.includes("Success") ? "success" : "error"}`}>
            {bookingStatus}
          </div>
        )}
      </form>
    </div>
  );
};

export default BookTicketForm;
