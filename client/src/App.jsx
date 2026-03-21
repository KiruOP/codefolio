import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './templates/DashboardLayout';
import ProfileSettings from './pages/ProfileSettings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/profile" element={<ProfileSettings />} />
          {/* Default dashboard redirect for now */}
          <Route path="/dashboard" element={<Navigate to="/profile" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
