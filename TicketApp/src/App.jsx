import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Components
import EventList from "./components/EventList";
import EventDetails from "./components/EventDetails";
import MyEventsPage from "./components/MyEventsPage";
import EventForm from "./components/EventForm";
import EventAnalytics from "./components/EventAnalytics";
import AdminEventsPage from "./components/AdminEventsPage";

// Layouts
function StandardLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function OrganizerLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function AdminLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Protected Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <StandardLayout>
              <Dashboard />
            </StandardLayout>
          </ProtectedRoute>
        }
      />

      {/* Standard/Public Events */}
      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <StandardLayout>
              <EventList />
            </StandardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/events/:id"
        element={
          <ProtectedRoute>
            <StandardLayout>
              <EventDetails />
            </StandardLayout>
          </ProtectedRoute>
        }
      />

      {/* Organizer Routes */}
      <Route
        path="/my-events"
        element={
          <ProtectedRoute allowedRoles={["organizer"]}>
            <OrganizerLayout>
              <MyEventsPage />
            </OrganizerLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-events/new"
        element={
          <ProtectedRoute allowedRoles={["organizer"]}>
            <OrganizerLayout>
              <EventForm />
            </OrganizerLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-events/:id/edit"
        element={
          <ProtectedRoute allowedRoles={["organizer"]}>
            <OrganizerLayout>
              <EventForm />
            </OrganizerLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-events/analytics"
        element={
          <ProtectedRoute allowedRoles={["organizer"]}>
            <OrganizerLayout>
              <EventAnalytics />
            </OrganizerLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/events"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout>
              <AdminEventsPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
