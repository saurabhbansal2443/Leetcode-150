import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const StudentForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    college: "",
    branch: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Using a promise-based toast for better UX
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxr50GtbIX4qAM40Rls1Y3oE-dzlWHAxWmkEbpGuKCvk9JuEEx6CoPg-CKWisEgHblpIg/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      // Note: With 'no-cors', the fetch doesn't throw on 404/500, 
      // but if the network fails, it goes to catch.
      toast.success("Details submitted successfully! 🎉");
      
      // Reset form
      setFormData({ name: "", email: "", phoneNumber: "", college: "", branch: "" });
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Failed to submit. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* 1. Add the Toaster component anywhere in your tree */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Student Registration
        </h2>
       
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-gray-100 sm:rounded-xl sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your full name"
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                onChange={handleChange}
                value={formData.name}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="you@college.edu"
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
              <input
                name="phoneNumber"
                type="tel"
                placeholder="10-digit mobile number"
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                onChange={handleChange}
                value={formData.phoneNumber}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700">College</label>
                <input
                  name="college"
                  placeholder="e.g. IIT"
                  className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                  onChange={handleChange}
                  value={formData.college}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Branch</label>
                <input
                  name="branch"
                  placeholder="e.g. CSE"
                  className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                  onChange={handleChange}
                  value={formData.branch}
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 rounded-lg text-white font-bold bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  "Submit Registration"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;