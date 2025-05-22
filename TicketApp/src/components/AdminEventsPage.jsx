import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AdminEventsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch all events for admin
  const fetchEvents = () => {
    setLoading(true);
    api.get("/events/all")
      .then(res => setEvents(res.data))
      .catch(() => alert("Failed to load events"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    fetchEvents();
  }, [user, navigate]);

  const handleStatusChange = (eventId, newStatus) => {
    api.put(`/events/${eventId}`, { status: newStatus })
      .then(() => {
        alert(`Event ${newStatus}`);
        fetchEvents();
      })
      .catch(() => alert("Failed to update event status"));
  };

  // Filter events by status
  const filteredEvents = filter === "all" ? events : events.filter(e => e.status === filter);

  if (loading) return <p>Loading events...</p>;

  return (
    <div>
      <h2>Admin Events Management</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>Status filter: </label>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Organizer</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.length === 0 && (
            <tr><td colSpan="5" style={{ textAlign: "center" }}>No events found.</td></tr>
          )}
          {filteredEvents.map(event => (
            <tr key={event._id}>
              <td>{event.title}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.organizer?.name || "Unknown"}</td>
              <td>{event.status}</td>
              <td>
                {event.status !== "approved" && (
                  <button
                    onClick={() => handleStatusChange(event._id, "approved")}
                    style={{ marginRight: "0.5rem" }}
                  >
                    Approve
                  </button>
                )}
                {event.status !== "declined" && (
                  <button
                    onClick={() => handleStatusChange(event._id, "declined")}
                    style={{ marginRight: "0.5rem" }}
                  >
                    Decline
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminEventsPage;
