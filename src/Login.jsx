import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy authentication
    if (username && password) {
      localStorage.setItem('role', role);
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white text-center py-3">
              <h4 className="mb-0">System Login</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Select Role</label>
                  <select 
                    className="form-select" 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Username / Roll No</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <button type="submit" className="btn btn-primary w-100 py-2">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
