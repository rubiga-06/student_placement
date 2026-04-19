import React, { useState, useEffect } from 'react';
import { fetchCompanies, fetchTrainings, fetchPlacementStatus, submitApplication } from './api';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [student, setStudent] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [trainings, setTrainings] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [status, setStatus] = useState({ status: 'Not Placed', company_name: '-' });

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = async () => {
    try {
      const allCompanies = await fetchCompanies();
      // Filter companies based on CGPA and Dept eligibility
      const eligible = allCompanies.filter(c => 
        student.cgpa >= c.min_cgpa && 
        (c.eligible_dept.toLowerCase() === 'all' || c.eligible_dept.includes(student.dept))
      );
      setCompanies(eligible);
      setTrainings(await fetchTrainings());
      
      const stat = await fetchPlacementStatus(student.roll_no);
      if (stat && !stat.notFound) setStatus(stat);
    } catch (err) { console.error(err); }
  };

  const handleApply = async (companyId) => {
    await submitApplication({
      student_id: student.student_id,
      company_id: companyId,
      application_date: new Date().toISOString().split('T')[0],
      resume_link: '#'
    });
    alert("Applied successfully!");
  };

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
                      <tr><th>Name</th><td>{student.name}</td></tr>
                      <tr><th>Roll No</th><td>{student.roll_no}</td></tr>
                      <tr><th>Department</th><td>{student.dept}</td></tr>
                      <tr><th>Year</th><td>{student.year}</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-6">
                  <table className="table table-bordered">
                    <tbody>
                      <tr><th>CGPA</th><td>{student.cgpa}</td></tr>
                      <tr><th>Arrear Status</th><td>{student.arrear_status}</td></tr>
                      <tr><th>Email</th><td>{student.email}</td></tr>
                      <tr><th>Phone</th><td>{student.phone}</td></tr>
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
                    {trainings.map(t => (
                      <tr key={t.training_id}>
                        <td>{t.training_name}</td><td>{t.trainer_name}</td><td>{t.training_date}</td>
                        <td>{t.duration}</td><td>{t.description}</td>
                        <td><span className="badge bg-primary">Available</span></td>
                        <td>
                          <button className="btn btn-sm btn-primary">Register</button>
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
                {companies.map(c => (
                  <div className="col-md-6" key={c.company_id}>
                    <div className="card h-100 border-primary">
                      <div className="card-body">
                        <h5 className="card-title text-primary">{c.company_name}</h5>
                        <p className="card-text mb-1"><strong>Package:</strong> {c.package} LPA</p>
                        <p className="card-text mb-1"><strong>Min CGPA:</strong> {c.min_cgpa}</p>
                        <p className="card-text mb-1"><strong>Arrears Allowed:</strong> {c.arrear_allowed}</p>
                        <p className="card-text mb-3"><strong>Year:</strong> {c.year}</p>
                        <button className="btn btn-primary w-100" onClick={() => handleApply(c.company_id)}>Apply Now</button>
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
                    <h3 className={status.status === 'Placed' ? 'text-success' : 'text-warning'}>
                      {status.status || 'Not Placed'}
                    </h3>
                  </div>
                  <div className="col-md-4 mb-3 mb-md-0 border-start border-end">
                    <h5 className="text-muted mb-1">Company</h5>
                    <h3>{status.company_name || '-'}</h3>
                  </div>
                  <div className="col-md-4">
                    <h5 className="text-muted mb-1">Roll No</h5>
                    <h3>{student.roll_no}</h3>
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
