import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login.jsx';
import Signup from './components/auth/Signup.jsx';
import FirstPage from './components/auth/FirstPage.jsx';

function App() {
  const [count, setCount] = useState(0);

  const userTypeRedirect = (user) => {
    switch (user.UserType) {
      case 'Organizer':
        return <Navigate to="/OwnerDash" />;
      case 'Participant':
        return <Navigate to="/Participantdash" />;
      case 'Volunteer':
        return <Navigate to="/Volunteerdash" />;
      default:
        return <Navigate to="/" />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
