import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const MyEventsPage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === "organizer") {
      api.get("/events/organizer")
        .then((res) => setEvents(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((event) => (
          <div key={event._id} className="border p-4 rounded mb-2">
            <h3 className="font-semibold">{event.title}</h3>
            <p>{event.date}</p>
            {/* Add Edit/Delete buttons as needed */}
          </div>
        ))
      )}
    </div>
  );
};

export default MyEventsPage;
