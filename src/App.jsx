import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import StudentDashboard from './StudentDashboard';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 bg-light">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <footer className="bg-dark text-light py-3 mt-auto">
          <div className="container text-center">
            <small>&copy; {new Date().getFullYear()} Student Placement and Training Management System</small>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
