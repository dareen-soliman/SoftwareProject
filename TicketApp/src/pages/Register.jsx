import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'standard',
    age: '',          // Added age here
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Split the name into firstName and lastName
    const [firstName, ...lastNameParts] = form.name.trim().split(' ');
    const lastName = lastNameParts.join(' ') || '';

    // Check if age is a valid number
    if (!form.age || isNaN(form.age)) {
      setError('Please enter a valid age');
      return;
    }

    try {
      await api.post(
        '/v1/register',
        {
          firstName,
          lastName,
          email: form.email,
          password: form.password,
          role: form.role,
          age: Number(form.age), // Convert age to number
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
          min={1}
        />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="standard">User</option>
          <option value="organizer">Organizer</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
