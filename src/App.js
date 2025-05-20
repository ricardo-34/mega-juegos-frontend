// frontend/src/App.js

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home        from './pages/Home/Home';
import GameDetails from './pages/GameDetails/GameDetails';
import Login       from './pages/Login/Login';
import Admin       from './pages/Admin/Admin';

function App() {
  // Estado en memoria: siempre arranca en `false`
  const [logged, setLogged] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GameDetails />} />

        {/* Login */}
        <Route
          path="/login"
          element={
            logged
              ? <Navigate to="/admin" replace />
              : <Login onLogin={() => setLogged(true)} />
          }
        />

        {/* Admin protegido */}
        <Route
          path="/admin"
          element={
            logged
              ? <Admin />
              : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
