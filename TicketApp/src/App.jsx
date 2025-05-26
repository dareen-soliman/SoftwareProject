import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/dashboard.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
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
import AdminEventManagement from "./pages/AdminEventManagement";
import Dashboard from "./pages/Dashboard";
import UserBookings from "./pages/UserBookings";
import BookingDetails from "./pages/BookingDetails";
import Unauthorized from "./pages/Unauthorized";
import AdminUsersPage from "./pages/AdminUsersPage";
import UserRow from "./components/UserRow";
import UpdateUserRoleModal from "./components/UpdateUserRoleModal";
import ConfirmationDialog from "./components/ConfirmationDialog";

function Layout({ children }) {
  return (
    <div className="app-container">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="app-wrapper">
        <ToastContainer />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Layout><EventList /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/unauthorized" element={<Layout><Unauthorized /></Layout>} />
          <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
          <Route path="/events/:id" element={<Layout><EventDetails /></Layout>} />
          <Route path="/logout" element={<Layout><Navbar showLogoutOnly={true} /></Layout>} />

          {/* Protected routes for all authenticated users */}
          <Route element={<ProtectedRoute allowedRoles={["admin", "standard", "organizer"]} />}>
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
          </Route>

          {/* Standard user routes */}
          <Route element={<ProtectedRoute allowedRoles={["standard"]} />}>
            <Route path="/user-bookings" element={<Layout><UserBookings /></Layout>} />
            <Route path="/bookings/:id" element={<Layout><BookingDetails /></Layout>} />
          </Route>

          {/* Admin routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/events" element={<Layout><AdminEventManagement /></Layout>} />
            <Route path="/admin/users" element={<Layout><AdminUsersPage /></Layout>} />
          </Route>

          {/* Organizer routes */}
          <Route element={<ProtectedRoute allowedRoles={["organizer"]} />}>
            <Route path="/my-events" element={<Layout><MyEventsPage /></Layout>} />
            <Route path="/my-events/new" element={<Layout><EventForm /></Layout>} />
            <Route path="/my-events/:id/edit" element={<Layout><EventForm /></Layout>} />
            <Route path="/my-events/analytics" element={<Layout><EventAnalytics /></Layout>} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
