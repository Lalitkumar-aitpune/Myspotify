import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Music from "./pages/Music";
import AdminUpload from "./pages/AdminUpload";

import ProtectedRoute from "./routes/ProtectedRoute";
import { PlayerProvider } from "./context/PlayerContext";
import Player from "./components/Player";


function App() {
  // auto redirect logic
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <PlayerProvider>
      <Router>
        <Routes>
          {/* Smart Default Route */}
          <Route
            path="/"
            element={user ? <Navigate to="/music" /> : <Navigate to="/login" />}
          />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Music Route */}
          <Route
            path="/music"
            element={
              <ProtectedRoute>
                <Music />
              </ProtectedRoute>
            }
          />

          {/* Admin Only Route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminUpload />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* GLOBAL PLAYER — survives page navigation */}
        <Player />
      </Router>
    </PlayerProvider>
  );
}

export default App;
