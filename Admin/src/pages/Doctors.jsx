import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteDoctor } from "../services/doctorService";
import { useDoctors } from "../context/DoctorContext";

const Doctors = () => {
  const navigate = useNavigate();
  const { doctors, loading, fetchDoctors } = useDoctors();

  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);

  // Fetch doctors on mount
  useEffect(() => {
    fetchDoctors().catch(() => {
      setError("Failed to load doctors");
    });
  }, [fetchDoctors]);

  // Delete doctor handler
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );
    if (!confirmDelete) return;

    try {
      setDeleting(id);
      const res = await deleteDoctor(id);

      if (res?.success) {
        fetchDoctors();
      } else {
        alert(res?.message || "Delete failed");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return <p className="p-6 pt-20">Loading doctors...</p>;
  }

  if (error) {
    return <p className="p-6 pt-20 text-red-600">{error}</p>;
  }

  return (
    <div className="p-6 pt-20 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Doctors</h1>

        <button
          onClick={() => navigate("/add-doctor")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add Doctor
        </button>
      </div>

      {/* Doctors Grid */}
      {doctors.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              {/* Doctor Image */}
              <img
                src={
                  doc.image && doc.image.startsWith("http")
                    ? doc.image
                    : "https://placehold.co/300x300?text=Doctor"
                }
                alt={doc.name}
                className="w-20 h-20 rounded-full object-cover mb-3"
                onError={(e) => {
                  e.currentTarget.src = "/doctor.png";
                }}
                loading="lazy"
              />

              {/* Doctor Info */}
              <h3 className="font-semibold text-lg">{doc.name}</h3>
              <p className="text-sm text-gray-500">{doc.speciality}</p>
              <p className="text-sm">Experience: {doc.experience}</p>
              <p className="text-sm">Fees: ₹{doc.fees}</p>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => navigate(`/edit-doctor/${doc._id}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(doc._id)}
                  disabled={deleting === doc._id}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded disabled:opacity-60"
                >
                  {deleting === doc._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Doctors;
