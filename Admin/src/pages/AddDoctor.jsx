import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoctor } from "../services/doctorService";

const AddDoctor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    speciality: "",
    degree: "",
    experience: "",
    fees: "",
    about: "",
    addressLine1: "",
    addressLine2: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload + preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // Submit form
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      alert("Name and Email are required");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // ✅ Append normal fields
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("speciality", form.speciality);
      formData.append("degree", form.degree);
      formData.append("experience", form.experience);
      formData.append("fees", form.fees);
      formData.append("about", form.about);

      // ✅ IMPORTANT: address object
      formData.append("address[line1]", form.addressLine1);
      formData.append("address[line2]", form.addressLine2);

      // ✅ Image
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await addDoctor(formData);

      if (res?.success) {
        navigate("/doctors");
      } else {
        alert(res?.message || "Failed to add doctor");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 pt-24 bg-white shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Add Doctor</h2>

      <form onSubmit={submitHandler} className="space-y-4">
        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            id="name"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded border-gray-900"
            required
          />

          {/* Email */}
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded border-gray-900"
            required
          />
        </div>
        {/* Speciality */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            id="speciality"
            name="speciality"
            value={form.speciality}
            onChange={handleChange}
            className="border p-2 rounded border-gray-900"
            required
          >
            <option value="">Select Speciality</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Orthopedic">Orthopedic</option>
            <option value="Psychiatrist">Psychiatrist</option>
          </select>

          {/* Degree */}
          <input
            id="degree"
            name="degree"
            placeholder="Degree"
            value={form.degree}
            onChange={handleChange}
            className="border p-2 rounded border-gray-900"
            required
          />
        </div>
        {/* Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            id="experience"
            name="experience"
            placeholder="Experience (e.g., 5 years)"
            value={form.experience}
            onChange={handleChange}
            className="border p-2 rounded border-gray-900"
            required
          />

          {/* Fees */}
          <input
            id="fees"
            name="fees"
            type="string"
            placeholder="Fees"
            value={form.fees}
            onChange={handleChange}
            className="border p-2 rounded border-gray-900"
            required
          />
        </div>
        {/* About */}
        <textarea
          id="about"
          name="about"
          placeholder="About doctor"
          value={form.about}
          onChange={handleChange}
          className="w-full border p-2 rounded h-28 resize-none border-gray-900"
          required
        />
        {/* Address Line 1 */}
        <input
          id="addressLine1"
          name="addressLine1"
          placeholder="Full Address"
          value={form.addressLine1}
          onChange={handleChange}
          className="w-full border p-2 rounded  resize-none border-gray-900 h-20"
          required
        />
        {/* Image Upload */}
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-24 h-24 object-cover mx-auto"
          required
        />
        Insert Image
        {/* Image Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-24 h-24 rounded-full object-cover mx-auto"
          />
        )}
        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className=" bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-60"
          >
            {loading ? "Saving..." : "Add Doctor"}
          </button>

          <button onClick={() => navigate("/doctors")} className="ml-2 px-4 py-2 rounded bg-red-900 text-white">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
