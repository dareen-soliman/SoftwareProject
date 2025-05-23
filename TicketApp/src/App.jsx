import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import EventList from "./components/EventList";
import EventDetails from "./components/EventDetails";
import EventAnalytics from "./components/EventAnalytics";
import ForgotPassword from "./pages/ForgotPassword";
import MyEventsPage from "./components/MyEventsPage";
import EventForm from "./components/EventForm";
import AdminEventsPage from "./events/AdminEvents";
import Dashboard from "./pages/Dashboard";
import UserBookings from "./pages/UserBookings";
import BookingDetails from "./pages/BookingDetails";
import Unauthorized from "./pages/Unauthorized";


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
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
       <Route path="/my-events" element={<MyEventsPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/Profile" element={<Profile />} /> */}
      <Route path="/logout" element={<Navbar showLogoutOnly={true} />} />
      <Route path="/events" element={<EventList />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/events/:id" element={<EventDetails />} />

        <Route element={<ProtectedRoute allowedRoles={["admin", "standard", "organizer"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["standard"]} />}>
         <Route path="/user-bookings" element={<UserBookings />} />
      <Route path="/bookings/:id" element={<BookingDetails />} />
      </Route>

      {/* Standard/public user
      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <StandardLayout>
              <EventList />
            </StandardLayout>
          </ProtectedRoute>
        }
      /> */}
      {/* <Route
        path="/events/:id"
        element={
          <ProtectedRoute>
            <StandardLayout>
              <EventDetails />
            </StandardLayout>
          </ProtectedRoute>
        }
      /> */}

      {/* Organizer-only routes */}
      {/* <Route
        path="/my-events"
        element={
          <ProtectedRoute allowedRoles={["organizer"]}>
            <OrganizerLayout>
              <MyEventsPage />
            </OrganizerLayout>
          </ProtectedRoute>
        }
      /> */}
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

export default App;
