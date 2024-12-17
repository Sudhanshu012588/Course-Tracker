import { useState } from 'react';

function Signup() {
  const [user, setUser] = useState({
    Name: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Role: "Participant" // Default role is "Participant"
  });
  const [error, setError] = useState(""); // State to handle errors
  const [success, setSuccess] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages

    // Check if passwords match
    if (user.Password !== user.ConfirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/v1/uers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: user.Name,
          Email: user.Email,
          Password: user.Password,
          Role: user.Role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to signup");
      }

      setSuccess("Signup successful!"); // Success message
      setUser({
        Name: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        Role: "Participant",
      }); // Reset form
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-white text-2xl font-bold mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="Name" className="block text-white text-sm mb-2">Username</label>
            <input
              type="text"
              id="Name"
              name="Name"
              value={user.Name}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Email" className="block text-white text-sm mb-2">Email</label>
            <input
              type="email"
              id="Email"
              name="Email"
              value={user.Email}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Password" className="block text-white text-sm mb-2">Password</label>
            <input
              type="password"
              id="Password"
              name="Password"
              value={user.Password}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="ConfirmPassword" className="block text-white text-sm mb-2">Confirm Password</label>
            <input
              type="password"
              id="ConfirmPassword"
              name="ConfirmPassword"
              value={user.ConfirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Confirm your password"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="Role" className="block text-white text-sm mb-2">Role</label>
            <select
              id="Role"
              name="Role"
              value={user.Role}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Participant">Participant</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Organizer">Organizer</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
