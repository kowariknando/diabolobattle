// client/src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import PersonsPage from './components/PersonsPage.jsx';
import Gallery from './components/Gallery.jsx';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // <-- We will now set this properly after login

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/login"
          element={<Login setToken={setToken} setUser={setUser} />}  // pass setUser
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/persons"
          element={
            <PrivateRoute>
              <PersonsPage token={token} user={user} logout={logout} />
            </PrivateRoute>
          }
        />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
}

export default App;
