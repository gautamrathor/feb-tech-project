// import React, { useState } from "react";
// import axios from "axios";

// export default function Signup() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [msg, setMsg] = useState("");

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:3000/signup", form);
//       setMsg(res.data.message);
//     } catch (err) {
//       setMsg(err.response?.data?.message || "Error hai");
//     }
//   };

//   return (
//     <div
//       className=" border-width: 1px justify"

//     >
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="Name" onChange={handleChange} />
//         <input name="email" placeholder="Email" onChange={handleChange} />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           onChange={handleChange}
//         />
//         <button type="submit">Signup</button>
//       </form>
//       <p>{msg}</p>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";


const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [msg, setMsg] = useState("");

  // Handle input changes safely
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files && files[0];
      if (file) {
        setFormData({ ...formData, image: file });
        setPreview(URL.createObjectURL(file));
      } else {
        setFormData({ ...formData, image: null });
        setPreview(null);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Clean up the preview URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare form data for upload
      const data = new FormData();
      data.append("fullName", formData.fullname);
      data.append("email", formData.email);
      data.append("password", formData.password);
      if (formData.image) data.append("image", formData.image);

      // Send to backend
      const res = await axios.post("http://localhost:3000/api/user/register",data, {
                                                       
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMsg(res.data.message || "Signup successful!");
    
    } catch (err) {
      setMsg(err.response?.data?.message || "❌ Error occurred");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image Upload */}
          <div className="flex flex-col items-center">
            {preview ? (
              <img
                src={preview}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover mb-3 shadow"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 mb-3">
                No Image
              </div>
            )}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="text-sm text-gray-600"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Message */}
        {msg && (
          <p className="text-center text-gray-700 mt-4 font-medium">{msg}</p>
        )}

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
