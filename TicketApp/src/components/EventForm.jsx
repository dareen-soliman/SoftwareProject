import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const EventForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams(); // event id if editing

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    date: "",
    location: "",
    totalTickets: "",
    ticketPrice: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Only organizers can access
  useEffect(() => {
    if (!user || user.role !== "organizer") {
      navigate("/login");
    }
  }, [user, navigate]);

  // If editing, load event data
  useEffect(() => {
    if (id) {
      setLoading(true);
      api
        .get(`/v1/events/${id}`)
        .then((res) => {
          const event = res.data;
          const organizerId =
  typeof event.organizer === "object" ? event.organizer._id : event.organizer;

if (String(organizerId) !== String(user._id)) {
  alert("You are not authorized to edit this event");
  navigate("/my-events");
  return;
}

          setFormData({
            title: event.title,
            description: event.description || "",
            category: event.category || "",
            image: event.image || "",
            date: event.date?.slice(0, 10),
            location: event.location,
            totalTickets: event.totalTickets,
            ticketPrice: event.ticketPrice,
          });
        })
        .catch(() => {
          alert("Failed to load event data");
          navigate("/my-events");
        })
        .finally(() => setLoading(false));
    }
  }, [id, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const {
      title,
      description,
      category,
      image,
      date,
      location,
      totalTickets,
      ticketPrice,
    } = formData;

    if (
      (!id && !title) ||
      !description ||
      !category ||
      !image ||
      !date ||
      !location ||
      !totalTickets ||
      !ticketPrice
    ) {
      setError("All fields are required.");
      return;
    }

    if (Number(totalTickets) < 1 || Number(ticketPrice) < 0) {
      setError("Ticket count must be at least 1 and price cannot be negative.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        title,
        description,
        category,
        image,
        date,
        location,
        totalTickets: Number(totalTickets),
        ticketPrice: Number(ticketPrice),
      };

      if (!id) {
        await api.post("/v1/events", payload);
        alert("Event created successfully");
      } else {
        await api.put(`/v1/events/${id}`, payload);
        alert("Event updated successfully");
      }

      navigate("/my-events");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save event");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>{id ? "Edit Event" : "Create New Event"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {!id && (
          <div>
            <label>Title</label><br />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div>
          <label>Description</label><br />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Category</label><br />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Image URL</label><br />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Date</label><br />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Location</label><br />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Total Tickets</label><br />
          <input
            type="number"
            name="totalTickets"
            value={formData.totalTickets}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div>
          <label>Ticket Price</label><br />
          <input
            type="number"
            name="ticketPrice"
            value={formData.ticketPrice}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {id ? "Update Event" : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
