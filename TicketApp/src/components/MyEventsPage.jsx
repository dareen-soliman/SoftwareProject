import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const MyEventsPage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    if (!user) return; // Wait for user to load

    if (user.role === "organizer") {
      api.get("/v1/users/events")
        .then((res) => setEvents(res.data))
        .catch((err) => console.error("Failed to fetch events:", err))
        .finally(() => setLoading(false));
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
      const updated = await api.put(`/v1/events/${id}`, { title: editTitle });
      setEvents(events.map((e) => (e._id === id ? updated.data : e)));
      setEditId(null);
      setEditTitle("");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Loading user...</p>;
  if (user.role !== "organizer") return <p>Access denied. Organizer only.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((event) => (
          <div key={event._id} className="border p-4 rounded mb-3">
            {editId === event._id ? (
              <div>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border px-2 py-1 mr-2"
                />
                <button onClick={() => handleEditSave(event._id)} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
                <button onClick={() => setEditId(null)} className="ml-2 bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
              </div>
            ) : (
              <>
                <h3 className="font-semibold">{event.title}</h3>
                <p>{event.date}</p>
                <button onClick={() => {
                  setEditId(event._id);
                  setEditTitle(event.title);
                }} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(event._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyEventsPage;
