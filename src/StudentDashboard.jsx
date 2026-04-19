import React, { useState } from 'react';

// Dummy Data
const studentProfile = {
  roll_no: '101',
  name: 'John Doe',
  dept: 'CSE',
  year: 2024,
  cgpa: 8.5,
  arrear_status: 'None',
  email: 'john@example.com',
  phone: '1234567890'
};

const availableTrainings = [
  { id: 1, training_name: 'Aptitude Mastery', trainer_name: 'Mr. Smith', training_date: '2023-10-15', duration: '2 Hours', description: 'Quantitative aptitude and reasoning', status: 'Registered' },
  { id: 2, training_name: 'Advanced React', trainer_name: 'Ms. Alice', training_date: '2023-10-20', duration: '3 Days', description: 'React hooks, state management', status: 'Open' },
];

const eligibleCompanies = [
  { id: 1, company_name: 'TechCorp', min_cgpa: 7.5, arrear_allowed: 'No', package: 8.5, year: 2024, deadline: '2023-11-01' },
  { id: 2, company_name: 'InnovateX', min_cgpa: 7.0, arrear_allowed: 'Yes', package: 7.0, year: 2024, deadline: '2023-11-05' },
];

const placementStatus = {
  status: 'Not Placed',
  company: '-',
  companiesAttended: 3
};

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Student Dashboard</h2>
      
      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>Profile</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'trainings' ? 'active' : ''}`} onClick={() => setActiveTab('trainings')}>Trainings</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'companies' ? 'active' : ''}`} onClick={() => setActiveTab('companies')}>Eligible Companies</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'status' ? 'active' : ''}`} onClick={() => setActiveTab('status')}>Placement Status</button>
        </li>
      </ul>

      {/* Content Area */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          
          {/* PROFILE SECTION */}
          {activeTab === 'profile' && (
            <div>
              <h4 className="mb-3">My Profile</h4>
              <div className="row">
                <div className="col-md-6">
                  <table className="table table-bordered">
                    <tbody>
                      <tr><th>Name</th><td>{studentProfile.name}</td></tr>
                      <tr><th>Roll No</th><td>{studentProfile.roll_no}</td></tr>
                      <tr><th>Department</th><td>{studentProfile.dept}</td></tr>
                      <tr><th>Year</th><td>{studentProfile.year}</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-6">
                  <table className="table table-bordered">
                    <tbody>
                      <tr><th>CGPA</th><td>{studentProfile.cgpa}</td></tr>
                      <tr><th>Arrear Status</th><td>{studentProfile.arrear_status}</td></tr>
                      <tr><th>Email</th><td>{studentProfile.email}</td></tr>
                      <tr><th>Phone</th><td>{studentProfile.phone}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <button className="btn btn-outline-primary mt-2">Edit Profile</button>
            </div>
          )}

          {/* TRAININGS SECTION */}
          {activeTab === 'trainings' && (
            <div>
              <h4 className="mb-3">Available Trainings</h4>
              <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                  <thead className="table-dark">
                    <tr><th>Training Name</th><th>Trainer</th><th>Date</th><th>Duration</th><th>Description</th><th>Status</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {availableTrainings.map(t => (
                      <tr key={t.id}>
                        <td>{t.training_name}</td><td>{t.trainer_name}</td><td>{t.training_date}</td>
                        <td>{t.duration}</td><td>{t.description}</td>
                        <td>
                          <span className={`badge ${t.status === 'Registered' ? 'bg-success' : 'bg-secondary'}`}>
                            {t.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-primary" disabled={t.status === 'Registered'}>
                            {t.status === 'Registered' ? 'Enrolled' : 'Register'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* COMPANIES SECTION */}
          {activeTab === 'companies' && (
            <div>
              <h4 className="mb-3">Eligible Companies</h4>
              <div className="row g-4">
                {eligibleCompanies.map(c => (
                  <div className="col-md-6" key={c.id}>
                    <div className="card h-100 border-primary">
                      <div className="card-body">
                        <h5 className="card-title text-primary">{c.company_name}</h5>
                        <p className="card-text mb-1"><strong>Package:</strong> {c.package} LPA</p>
                        <p className="card-text mb-1"><strong>Min CGPA:</strong> {c.min_cgpa}</p>
                        <p className="card-text mb-1"><strong>Arrears Allowed:</strong> {c.arrear_allowed}</p>
                        <p className="card-text mb-3"><strong>Deadline:</strong> {c.deadline}</p>
                        <button className="btn btn-primary w-100">Apply Now</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STATUS SECTION */}
          {activeTab === 'status' && (
            <div>
              <h4 className="mb-3">Placement Status</h4>
              <div className="alert alert-info">
                <div className="row text-center">
                  <div className="col-md-4 mb-3 mb-md-0">
                    <h5 className="text-muted mb-1">Status</h5>
                    <h3 className={placementStatus.status === 'Placed' ? 'text-success' : 'text-warning'}>
                      {placementStatus.status}
                    </h3>
                  </div>
                  <div className="col-md-4 mb-3 mb-md-0 border-start border-end">
                    <h5 className="text-muted mb-1">Company</h5>
                    <h3>{placementStatus.company}</h3>
                  </div>
                  <div className="col-md-4">
                    <h5 className="text-muted mb-1">Companies Attended</h5>
                    <h3>{placementStatus.companiesAttended}</h3>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
