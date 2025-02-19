// client/src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import PersonsPage from './components/PersonsPage.jsx';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  // Private route for authenticated pages
  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/persons"
          element={
            <PrivateRoute>
              <PersonsPage token={token} user={user} logout={logout} />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
