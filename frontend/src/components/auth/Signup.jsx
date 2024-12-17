import { useState } from 'react';

function Signup() {
  const [user, setUser] = useState({
    username: "",
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Role: "Student", // Default role
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
      const response = await fetch("/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username, // Correct field name
          FirstName: user.FirstName,
          LastName: user.LastName,
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
        username: "",
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        Role: "Student",
      }); // Reset form
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-white text-2xl font-bold mb-4">Signup</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="FirstName" className="block text-white text-sm mb-2">First Name</label>
            <input
              type="text"
              id="FirstName"
              name="FirstName"
              value={user.FirstName}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your first name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="LastName" className="block text-white text-sm mb-2">Last Name</label>
            <input
              type="text"
              id="LastName"
              name="LastName"
              value={user.LastName}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your last name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block text-white text-sm mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your username"
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
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
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
