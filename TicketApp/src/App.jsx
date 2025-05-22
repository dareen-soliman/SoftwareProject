import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";


// Components (from components folder)
import EventList from "./components/EventList";
import EventDetails from "./components/EventDetails";
import MyEventsPage from "./components/MyEventsPage";
import EventForm from "./components/EventForm";
import EventAnalytics from "./components/EventAnalytics";
import AdminEventsPage from "./components/AdminEventsPage";

// Organizer route
function OrganizerLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Navbar showLogoutOnly={true} />} />

<Route path="/forgot-password" element={<ForgotPassword />} />

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
      <Route path="/logout" element={<Navbar showLogoutOnly={true} />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Navbar />
            <Dashboard />
          </ProtectedRoute>
        }
      />

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
