// src/components/UserRow.jsx
import React from "react";

const UserRow = ({ user, onUpdate, onDelete }) => {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <tr className="border-t hover:bg-gray-100 transition">
      <td className="p-2">{fullName}</td>
      <td className="p-2">{user.email}</td>
      <td className="p-2">{user.role}</td>
      <td className="p-2 space-x-2">
        <button
          onClick={() => onUpdate(user)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Update Role
        </button>
        <button
          onClick={() => onDelete(user._id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
