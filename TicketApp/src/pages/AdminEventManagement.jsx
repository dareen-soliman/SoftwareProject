// src/pages/AdminEventsPage.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminEventsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/unauthorized");
    } else {
      fetchEvents();
    }
  }, [user]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/v1/events/all");
      setEvents(res.data);
    } catch (err) {
      setError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (eventId, status) => {
    try {
      await api.put(`/v1/events/${eventId}`, { status });
      fetchEvents();
    } catch (err) {
      alert("Failed to update event status.");
    }
  };

  const filteredEvents =
    filter === "all"
      ? events
      : events.filter((event) => event.status === filter);

  return (
    <div>
      <h2>Admin: All Events</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Filter:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Title</th>
              <th>Organizer</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => (
              <tr key={event._id}>
                <td>{event.title}</td>
                <td>{event.organizer?.name}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.status}</td>
                <td>
                  {event.status !== "approved" && (
                    <button onClick={() => handleStatusChange(event._id, "approved")}>Approve</button>
                  )}
                  {event.status !== "declined" && (
                    <button onClick={() => handleStatusChange(event._id, "declined")}>Decline</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminEventsPage;
