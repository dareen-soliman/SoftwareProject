import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";

const EventAnalytics = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "organizer") {
      navigate("/login");
      return;
    }

    api.get(`/v1/users/events/analytics`)
      .then(res => {
        const data = res.data.map(event => ({
          name: event.title,
          ticketsBooked: event.ticketsSold, // ✅ Use correct backend field
        }));
        setEvents(data);
      })
      .catch(() => alert("Failed to load analytics data"))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (loading) return <p>Loading analytics...</p>;
  if (events.length === 0) return <p>No events found to analyze.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Ticket Booking Analytics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={events} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="ticketsBooked" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EventAnalytics;
