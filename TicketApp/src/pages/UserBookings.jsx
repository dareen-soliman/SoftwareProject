// src/pages/UserBookings.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api"; // this should handle base URL and token setup

function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

 useEffect(() => {
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/v1/users/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched bookings:", res.data); // <-- add this line
      setBookings(res.data);
    } catch (err) {
      setError("Failed to fetch bookings: " + (err.response?.data?.message || err.message));
    }
  };

  fetchBookings();
}, []);


  return (
    <div>
      <h2>My Bookings</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              <strong>Event:</strong> {booking.event?.name || "Unknown"} <br />
              <strong>Date:</strong> {new Date(booking.createdAt).toLocaleDateString()} <br />
              <strong>Status:</strong> {booking.status || "N/A"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserBookings;
