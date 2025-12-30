const LoginRequiredModal = ({ open, onClose, onLogin }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-[90%] max-w-sm shadow-lg">
        <h2 className="text-xl font-bold mb-2">Login Required</h2>
        <p className="text-gray-600 mb-4">
          Please login to book an appointment.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>
          <button
            onClick={onLogin}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
