import React, { useState } from "react";
import toast from "react-hot-toast";

const MyProfile = () => {
    const [userData, setUserData] = useState({
    firstName: "",
    image: "",
    email: "",
    phone: "",
    address: {
      line1: "",
      line2: "",
    },
    gender: "",
    dob: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only images allowed!");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setUserData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // VALIDATION BEFORE SAVE
  const validateForm = () => {
    if (userData.firstName.trim().length < 2)
      return toast.error("Name must be at least 2 characters");

    if (!userData.email.includes("@"))
      return toast.error("Invalid email");

    if (userData.phone.length < 10)
      return toast.error("Phone must be minimum 10 digits");

    if (!userData.gender)
      return toast.error("Please select gender");

    if (!userData.dob)
      return toast.error("Please select Date of Birth");

    return true;
  };

  // SAVE PROFILE
  const handleSave = () => {
    if (!validateForm()) return;

    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      setIsEdit(false);
      toast.success("Profile Updated Successfully!");
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-xl border">

      <h2 className="text-center text-2xl font-bold mb-4">My Profile</h2>

      {/* Image */}
      <div className="flex flex-col items-center gap-3">
        <img
          src={userData.image}
          alt="Profile"
          className="w-28 h-28 rounded-full border shadow-md object-cover"
        />

        {isEdit && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-sm"
          />
        )}
      </div>

      {/* NAME */}
      <div className="mt-6">
        <label className="font-semibold">Full Name</label>
        {isEdit ? (
          <input
            type="text"
            value={userData.firstName}
            onChange={(e) =>
              setUserData((p) => ({ ...p, firstName: e.target.value }))
            }
            className="w-full border p-2 rounded"
          />
        ) : (
          <p className="border p-2 rounded bg-gray-50">{userData.firstName}</p>
        )}
      </div>

      {/* EMAIL */}
      <div className="mt-3">
        <label className="font-semibold">Email</label>
        {isEdit ? (
          <input
            type="email"
            value={userData.email}
            onChange={(e) =>
              setUserData((p) => ({ ...p, email: e.target.value }))
            }
            className="w-full border p-2 rounded"
          />
        ) : (
          <p className="border p-2 rounded bg-gray-50">{userData.email}</p>
        )}
      </div>

      {/* PHONE */}
      <div className="mt-3">
        <label className="font-semibold">Phone</label>
        {isEdit ? (
          <input
            type="number"
            value={userData.phone}
            onChange={(e) =>
              setUserData((p) => ({ ...p, phone: e.target.value }))
            }
            className="w-full border p-2 rounded"
          />
        ) : (
          <p className="border p-2 rounded bg-gray-50">{userData.phone}</p>
        )}
      </div>

      {/* ADDRESS */}
      <div className="mt-3">
        <label className="font-semibold">Address Line 1</label>
        {isEdit ? (
          <input
            type="text"
            value={userData.address.line1}
            onChange={(e) =>
              setUserData((p) => ({
                ...p,
                address: { ...p.address, line1: e.target.value },
              }))
            }
            className="w-full border p-2 rounded"
          />
        ) : (
          <p className="border p-2 rounded bg-gray-50">{userData.address.line1}</p>
        )}

        <label className="font-semibold mt-2 block">Address Line 2</label>
        {isEdit ? (
          <input
            type="text"
            value={userData.address.line2}
            onChange={(e) =>
              setUserData((p) => ({
                ...p,
                address: { ...p.address, line2: e.target.value },
              }))
            }
            className="w-full border p-2 rounded"
          />
        ) : (
          <p className="border p-2 rounded bg-gray-50">{userData.address.line2}</p>
        )}
      </div>

      {/* GENDER */}
      <div className="mt-3">
        <label className="font-semibold">Gender</label>
        {isEdit ? (
          <select
            value={userData.gender}
            onChange={(e) =>
              setUserData((p) => ({ ...p, gender: e.target.value }))
            }
            className="w-full border p-2 rounded"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        ) : (
          <p className="border p-2 rounded bg-gray-50">{userData.gender}</p>
        )}
      </div>

      {/* DOB */}
      <div className="mt-3">
        <label className="font-semibold">Date of Birth</label>
        {isEdit ? (
          <input
            type="date"
            value={userData.dob}
            onChange={(e) =>
              setUserData((p) => ({ ...p, dob: e.target.value }))
            }
            className="w-full border p-2 rounded"
          />
        ) : (
          <p className="border p-2 rounded bg-gray-50">{userData.dob}</p>
        )}
      </div>

      {/* BUTTONS */}
      <div className="mt-6 flex justify-between">
        {!isEdit ? (
          <button
            onClick={() => setIsEdit(true)}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsEdit(false)}
              className="px-5 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded flex items-center gap-2"
            >
              {isSaving ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Save"
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
