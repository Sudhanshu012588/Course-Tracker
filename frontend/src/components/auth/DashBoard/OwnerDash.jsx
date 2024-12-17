import React from 'react';
import { useNavigate } from 'react-router-dom'; // Correct import for navigation

function OwnerDash() {
  const navigate = useNavigate(); // Hook for navigation

  const handleNavigation = (path) => {
    navigate(path); // Navigate to specified path
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Organisers Dashboard</h1>
      </header>

      <main className="flex-grow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Example card 1 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-white text-xl font-semibold">Events List</h2>
            <p className="text-gray-400 mt-2">List of Participants, Schedule of Event, Score.</p>
            <button 
              className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
              onClick={() => handleNavigation('/EventsList')}
            >
              Manage Users
            </button>
          </div>

          {/* Example card 2 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-white text-xl font-semibold">Volunteers</h2>
            <p className="text-gray-400 mt-2">Volunteers and their events.</p>
            <button 
              className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
              onClick={() => handleNavigation('/Volunteerdash')}
            >
              Manage Events
            </button>
          </div>

          {/* Example card 3 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-white text-xl font-semibold">Reports</h2>
            <p className="text-gray-400 mt-2">View and generate various reports.</p>
            <button 
              className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
              onClick={() => handleNavigation('/Reports')}
            >
              View Reports
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 p-4 text-center text-gray-400">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
}

export default OwnerDash;
