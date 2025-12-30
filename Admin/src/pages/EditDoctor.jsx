import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoctorById, updateDoctor } from "../services/doctorService";

const EditDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

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

  // Fetch doctor by ID
  useEffect(() => {
    let mounted = true;

    const fetchDoctor = async () => {
      setLoading(true);
      try {
        const res = await getDoctorById(id);
        if (res?.success && mounted) {
          setDoctor(res.data);
          setForm({
            name: res.data.name || "",
            email: res.data.email || "",
            speciality: res.data.speciality || "",
            degree: res.data.degree || "",
            experience: res.data.experience || "",
            fees: res.data.fees || "",
            about: res.data.about || "",
            addressLine1: res.data.address?.line1 || "",
            addressLine2: res.data.address?.line2 || "",
          });
        } else {
          alert(res?.message || "Failed to fetch doctor");
        }
      } catch {
        alert("Something went wrong");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchDoctor();
    return () => {
      mounted = false;
    };
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image change + preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Submit update
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await updateDoctor(id, formData);

      if (res?.success) {
        navigate("/doctors");
      } else {
        alert(res?.message || "Failed to update doctor");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!doctor && loading) {
    return <p className="p-6 pt-20">Loading doctor data...</p>;
  }

  return (
    <div className="p-6 pt-24 bg-white shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 ">Edit Doctor</h2>

      <form onSubmit={submitHandler} className="space-y-5">
        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold">Full Name</label>
            <input
              id="name"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded border-gray-900"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded border-gray-900"
              required
            />
          </div>
        </div>

        {/* Speciality & Degree */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold">Speciality</label>
            <select
              id="speciality"
              name="speciality"
              value={form.speciality}
              onChange={handleChange}
              className="w-full border p-2 rounded border-gray-900"
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
          </div>

          <div>
            <label className="text-sm font-semibold">Degree</label>
            <input
              id="degree"
              name="degree"
              placeholder="Degree"
              value={form.degree}
              onChange={handleChange}
              className="w-full border p-2 rounded border-gray-900"
            />
          </div>
        </div>

        {/* Experience & Fees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold">Experience</label>
            <input
              id="experience"
              name="experience"
              placeholder="Experience (e.g., 5 years)"
              value={form.experience}
              onChange={handleChange}
              className="w-full border p-2 rounded border-gray-900"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Fees</label>
            <input
              id="fees"
              name="fees"
              type="number"
              placeholder="Fees"
              value={form.fees}
              onChange={handleChange}
              className="w-full border p-2 rounded border-gray-900"
            />
          </div>
        </div>

        {/*about*/}
        <div>
          <label className="text-sm font-semibold">About</label>
          <textarea
            id="about"
            name="about"
            placeholder="About doctor"
            value={form.about}
            onChange={handleChange}
            className="w-full border p-2 rounded h-28 resize-none border-gray-900"
          />
        </div>

        {/*Address*/}
        <div>
          <label className="text-sm font-semibold">Address</label>
          <textarea
            id="addressLine1"
            name="addressLine1"
            placeholder="Address"
            value={form.addressLine1}
            onChange={handleChange}
            className="w-full border p-2 rounded h- resize-none border-gray-900"
          />
        </div>

        {/* Image upload */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Doctor Image
          </label>
          {(preview || doctor?.image) && (
            <img
              src={preview || doctor.image}
              alt="Doctor"
              className="w-32 h-32 object-cover rounded-full mb-3 border border-gray-200"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-gray-700 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div className="">
          <button
            type="submit"
            disabled={loading}
            className="w-24 bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update"}
          </button>

          <button
            onClick={() => navigate("/doctors")}
            className=" ml-2 w-24 bg-red-600 text-white font-semibold py-3 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDoctor;
