// client/src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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

  // A simple private route wrapper
  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
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
