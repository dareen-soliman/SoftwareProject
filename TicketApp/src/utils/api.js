import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const logout = () => api.post('/auth/logout');
export const forgotPassword = (email) => api.post('/auth/forgot-password', { email });

// User endpoints
export const getCurrentUser = () => api.get('/users/me');
export const updateProfile = (data) => api.put('/users/me', data);
export const getAllUsers = () => api.get('/users');
export const updateUserRole = (userId, role) => api.put(`/users/${userId}/role`, { role });
export const deleteUser = (userId) => api.delete(`/users/${userId}`);

// Event endpoints
export const getEvents = () => api.get('/events');
export const getEvent = (id) => api.get(`/events/${id}`);
export const createEvent = (eventData) => api.post('/events', eventData);
export const updateEvent = (id, eventData) => api.put(`/events/${id}`, eventData);
export const deleteEvent = (id) => api.delete(`/events/${id}`);
export const approveEvent = (id) => api.put(`/events/${id}/approve`);
export const declineEvent = (id) => api.put(`/events/${id}/decline`);

// Booking endpoints
export const createBooking = (eventId, bookingData) => api.post(`/events/${eventId}/bookings`, bookingData);
export const getUserBookings = () => api.get('/bookings/me');
export const cancelBooking = (bookingId) => api.delete(`/bookings/${bookingId}`);

export default api; 