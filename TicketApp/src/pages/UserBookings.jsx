import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/v1/users/bookings");
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching user bookings:", err);
        setError("Failed to fetch bookings.");
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      await api.delete(`/v1/bookings/${bookingId}`);
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "Canceled" }
            : booking
        )
      );
    } catch (err) {
      console.error("Error cancelling booking:", err);
      alert("Failed to cancel booking.");
    }
  };

  const activeBookings = bookings.filter((b) => b.status !== "Canceled");
  const canceledBookings = bookings.filter((b) => b.status === "Canceled");

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">🎫 My Bookings</h2>

      {error && <p className="text-red-600">{error}</p>}

      {bookings.length === 0 ? (
        <p>You have not booked any events yet.</p>
      ) : (
        <>
          {/* Active Bookings */}
          <div className="space-y-6 mb-12">
            {activeBookings.map((booking) => (
              <div
                key={booking._id}
                className="border border-gray-300 p-5 rounded-xl bg-white shadow"
              >
                <h3
                  onClick={() => navigate(`/bookings/${booking._id}`)}
                  className="text-xl font-semibold text-blue-700 mb-2 hover:underline cursor-pointer"
                >
                  {booking.event.title}
                </h3>
                <p><strong>Date:</strong> {new Date(booking.event.date).toLocaleString()}</p>
                <p><strong>Location:</strong> {booking.event.location}</p>
                <p><strong>Category:</strong> {booking.event.category}</p>
                <p><strong>Tickets Booked:</strong> {booking.ticketsBooked}</p>
                <p><strong>Total Paid:</strong> ${booking.totalPrice}</p>
                <p><strong>Status:</strong> {booking.status}</p>
                <p><strong>Booked On:</strong> {new Date(booking.createdAt).toLocaleString()}</p>

                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel Booking
                </button>
              </div>
            ))}
          </div>

          {/* Canceled Bookings Section */}
          {canceledBookings.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-700 mb-4">❌ Canceled Bookings</h3>
              {canceledBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="border border-gray-200 p-5 rounded-xl bg-gray-50 shadow"
                >
                  <h3
                    onClick={() => navigate(`/bookings/${booking._id}`)}
                    className="text-xl font-semibold text-gray-600 mb-2 hover:underline cursor-pointer"
                  >
                    {booking.event.title}
                  </h3>
                  <p><strong>Date:</strong> {new Date(booking.event.date).toLocaleString()}</p>
                  <p><strong>Location:</strong> {booking.event.location}</p>
                  <p><strong>Category:</strong> {booking.event.category}</p>
                  <p><strong>Tickets Booked:</strong> {booking.ticketsBooked}</p>
                  <p><strong>Total Paid:</strong> ${booking.totalPrice}</p>
                  <p><strong>Status:</strong> {booking.status}</p>
                  <p><strong>Booked On:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default UserBookings;
