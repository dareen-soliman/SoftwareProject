import React from 'react';

const ConfirmationDialog = ({ message, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-5 rounded shadow-lg text-center">
        <p className="mb-4">{message}</p>
        <button onClick={onCancel} className="mr-2 px-3 py-1 bg-gray-300 rounded">Cancel</button>
        <button onClick={onConfirm} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
 