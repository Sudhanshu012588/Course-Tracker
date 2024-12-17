import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OwnerDash from './DashBoard/OwnerDash'; // Import useNavigate for navigation

function Login() {
  const [user, setUser] = useState({
    Name: "",
    Email: "",
    Password: "",
    UserType: "Participant" // Default role is "Participant"
  });

  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user); // Process form submission
    // Add your validation logic here
    if (true) { // Replace with actual validation logic
      switch (user.UserType) {
        case 'Organizer':
          navigate('/OwnerDash'); // Redirect to Organizer dashboard
          break;
        case 'Volunteer':
          navigate('/Volunteerdash'); // Redirect to Volunteer dashboard
          break;
        case 'Participant':
          navigate('/Participantdash'); // Redirect to Participant dashboard
          break;
        default:
          console.error('Invalid User Type');
      }
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-white text-2xl font-bold mb-4">Login</h2>
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
          <div className="mb-6">
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

          <div className="mb-4">
            <label htmlFor="UserType" className="block text-white text-sm mb-2">User Type</label>
            <select
              id="UserType"
              name="UserType"
              value={user.UserType}
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
