import React, { useEffect, useState } from "react";
import api from "../services/api";
import UserRow from "../components/UserRow";
import UpdateUserRoleModal from "../components/UpdateUserRoleModal";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/v1/users");
        setUsers(res.data);
      } catch (err) {
        const msg = err.response?.data?.message || "Failed to load users";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdateRole = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleRoleUpdated = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u._id === updatedUser._id ? updatedUser : u))
    );
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/v1/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  if (loading) return <div className="p-4">Loading users...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <table className="w-full border table-auto">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user._id}
              user={user}
              onUpdate={handleUpdateRole}
              onDelete={handleDeleteUser}
            />
          ))}
        </tbody>
      </table>

      {isModalOpen && editingUser && (
        <UpdateUserRoleModal
          user={editingUser}
          onClose={() => setIsModalOpen(false)}
          onRoleUpdated={(updatedUser) => {
            handleRoleUpdated(updatedUser);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminUsersPage;
