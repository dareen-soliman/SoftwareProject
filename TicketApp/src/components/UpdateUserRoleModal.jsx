// src/components/UpdateUserRoleModal.jsx
import React, { useState } from "react";
import api from "../services/api";

const roles = ["standard", "organizer", "admin"];

const UpdateUserRoleModal = ({ user, onClose, onRoleUpdated }) => {
  const [role, setRole] = useState(user.role);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.put(`/v1/users/${user._id}`, { role });
      onRoleUpdated(res.data.user);
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update role";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Update Role for {user.firstName} {user.lastName}</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">Select Role:</label>
          <select
            className="w-full p-2 border mb-4"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {roles.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          {error && <p className="text-red-500 mb-2">{error}</p>}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserRoleModal;
