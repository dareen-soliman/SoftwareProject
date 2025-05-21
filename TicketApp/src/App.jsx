import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EventList from "./pages/EventList";
import EventDetails from "./pages/EventDetails";
import AdminEvents from "./events/AdminEvents";
import MyEvents from "./events/MyEvents";
import ForgotPassword from "./pages/ForgotPassword";



function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Navbar showLogoutOnly={true} />} />

<Route path="/forgot-password" element={<ForgotPassword />} />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Dashboard />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <EventList />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/:id"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <EventDetails />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-events"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <>
                <Navbar />
                <AdminEvents />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-events"
          element={
            <ProtectedRoute allowedRoles={["organizer"]}>
              <>
                <Navbar />
                <MyEvents />
              </>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
