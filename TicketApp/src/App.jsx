import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EventList from "./pages/EventList";
import EventDetails from "./pages/EventDetails";
import AdminEventsPage from "./events/AdminEvents";
import MyEventsPage from "./events/MyEvents";
import EventForm from "./events/EventForm";
import EventAnalytics from "./events/EventAnalytics";
import ForgotPassword from "./pages/ForgotPassword";

// Organizer route
function OrganizerLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

// Admin route
function AdminLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

// Public/standard user route
function StandardLayout({ children }) {
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
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/logout" element={<Navbar showLogoutOnly={true} />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />


      {/* Standard/public user */}
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

      {/* Organizer-only routes */}
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

      {/* Admin-only route */}
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
