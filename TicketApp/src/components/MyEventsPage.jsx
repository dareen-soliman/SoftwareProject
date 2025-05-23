import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const MyEventsPage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    date: "",
    location: "",
    totalTickets: "",
    status: "",
  });

  useEffect(() => {
    if (!user) return;

    const fetchEvents = async () => {
      try {
        const res = await api.get("/v1/users/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user.role === "organizer" || user.role === "admin") {
      fetchEvents();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await api.delete(`/v1/events/${id}`);
      setEvents(events.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEditSave = async (id) => {
    try {
      const payload = {
        date: editForm.date,
        location: editForm.location,
        totalTickets: editForm.totalTickets,
      };
      if (user.role === "admin") {
        payload.status = editForm.status;
      }

      const updated = await api.put(`/v1/events/${id}`, payload);
      setEvents(events.map((e) => (e._id === id ? updated.data.event : e)));
      setEditId(null);
      setEditForm({ date: "", location: "", totalTickets: "", status: "" });
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const startEdit = (event) => {
    setEditId(event._id);
    setEditForm({
      date: event.date ? event.date.slice(0, 10) : "",
      location: event.location || "",
      totalTickets: event.totalTickets || "",
      status: event.status || "pending",
    });
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Loading user...</p>;
  if (user.role !== "organizer" && user.role !== "admin") return <p>Access denied.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((event) => (
          <div key={event._id} className="border p-4 rounded mb-3">
            {editId === event._id ? (
              <div className="space-y-2">
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  className="border px-2 py-1 w-full"
                />
                <input
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  placeholder="Location"
                  className="border px-2 py-1 w-full"
                />
                <input
                  type="number"
                  value={editForm.totalTickets}
                  onChange={(e) => setEditForm({ ...editForm, totalTickets: e.target.value })}
                  placeholder="Total Tickets"
                  className="border px-2 py-1 w-full"
                />
                {user.role === "admin" && (
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className="border px-2 py-1 w-full"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                )}
                <button onClick={() => handleEditSave(event._id)} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
                <button onClick={() => setEditId(null)} className="ml-2 bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
              </div>
            ) : (
              <>
                <h3 className="font-semibold">{event.title}</h3>
                <p>Date: {event.date ? event.date.slice(0, 10) : "N/A"}</p>
                <p>Location: {event.location}</p>
                <p>Tickets: {event.totalTickets}</p>
                <p>Status: {event.status}</p>
                <button
                  onClick={() => startEdit(event)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyEventsPage;
