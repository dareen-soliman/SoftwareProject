import { useEffect, useState } from "react";
import api from "../services/api";
import EventCard from "../components/EventCard";

function AdminEventManagement() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchEvents = async () => {
    try {
      const response = await api.get("/v1/events/all");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleStatusChange = async (eventId, newStatus) => {
    try {
      await api.put(`/v1/events/${eventId}`, { status: newStatus });
      fetchEvents(); // Refresh list
    } catch (error) {
      console.error(`Error updating event status to ${newStatus}:`, error);
    }
  };

  const filteredEvents =
    filter === "all"
      ? events
      : events.filter((event) => event.status === filter);

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4">Admin Event Management</h2>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by status:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((event) => (
          <div key={event._id} className="relative border rounded-lg p-4 shadow">
            <EventCard event={event} />
            <p className="text-sm mt-2 font-semibold">
              Organizer: {event.organizer?.name || "N/A"}
            </p>
            <p className="text-sm mb-2">Status: {event.status}</p>
            <div className="flex space-x-2">
              {event.status !== "approved" && (
                <button
                  onClick={() => handleStatusChange(event._id, "approved")}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
              )}
              {event.status !== "declined" && (
                <button
                  onClick={() => handleStatusChange(event._id, "declined")}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Decline
                </button>
              )}
            </div>
          </div>
        ))}
        {filteredEvents.length === 0 && (
          <p className="text-gray-500 text-center col-span-full mt-6">
            No events found.
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminEventManagement;
