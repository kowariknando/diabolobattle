// client/src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import PersonsPage from './components/PersonsPage.jsx';
import Gallery from './components/Gallery.jsx';  // ✅ Import Gallery Page

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/persons" element={<PrivateRoute><PersonsPage token={token} user={user} logout={logout} /></PrivateRoute>} />
        <Route path="/gallery" element={<Gallery />} />  {/* ✅ Ensure this exists */}
      </Routes>
    </Router>
  );
}

export default App;
