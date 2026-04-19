import React, { useState } from 'react';

// Dummy Data
const initialStudents = [
  { id: 1, roll_no: '101', name: 'John Doe', dept: 'CSE', year: 2024, cgpa: 8.5, arrear_status: 'None', email: 'john@example.com', phone: '1234567890' },
  { id: 2, roll_no: '102', name: 'Jane Smith', dept: 'IT', year: 2024, cgpa: 9.1, arrear_status: 'Active', email: 'jane@example.com', phone: '0987654321' },
];

const initialCompanies = [
  { id: 1, company_name: 'TechCorp', min_cgpa: 7.5, arrear_allowed: 'No', eligible_dept: 'CSE, IT', package: 8.5, year: 2024 },
  { id: 2, company_name: 'DataSys', min_cgpa: 6.0, arrear_allowed: 'Yes', eligible_dept: 'All', package: 6.0, year: 2024 },
];

const initialTrainings = [
  { id: 1, training_name: 'Aptitude Mastery', trainer_name: 'Mr. Smith', training_date: '2023-10-15', duration: '2 Hours', eligible_dept: 'All', description: 'Quantitative aptitude and reasoning' },
  { id: 2, training_name: 'Advanced React', trainer_name: 'Ms. Alice', training_date: '2023-10-20', duration: '3 Days', eligible_dept: 'CSE, IT', description: 'React hooks, state management' },
];

const placementStatusData = [
  { roll_no: '101', name: 'John Doe', status: 'Placed', company: 'TechCorp' },
  { roll_no: '102', name: 'Jane Smith', status: 'Not Placed', company: '-' },
  { roll_no: '103', name: 'Bob Wilson', status: 'Placed', company: 'DataSys' },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('students');
  
  // States for data
  const [students, setStudents] = useState(initialStudents);
  const [companies, setCompanies] = useState(initialCompanies);
  const [trainings, setTrainings] = useState(initialTrainings);

  // States for search
  const [searchRoll, setSearchRoll] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearchPlacement = () => {
    const result = placementStatusData.find(s => s.roll_no === searchRoll);
    setSearchResult(result || { notFound: true });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>
      
      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'students' ? 'active' : ''}`} onClick={() => setActiveTab('students')}>Students</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'companies' ? 'active' : ''}`} onClick={() => setActiveTab('companies')}>Companies</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'trainings' ? 'active' : ''}`} onClick={() => setActiveTab('trainings')}>Trainings</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>Reports</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'placement' ? 'active' : ''}`} onClick={() => setActiveTab('placement')}>Placement Status</button>
        </li>
      </ul>

      {/* Content Area */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          
          {/* STUDENTS SECTION */}
          {activeTab === 'students' && (
            <div>
              <h4 className="mb-3">Manage Students</h4>
              <form className="row g-3 mb-4">
                <div className="col-md-2"><input type="text" className="form-control" placeholder="Roll No" /></div>
                <div className="col-md-3"><input type="text" className="form-control" placeholder="Name" /></div>
                <div className="col-md-2"><input type="text" className="form-control" placeholder="Dept" /></div>
                <div className="col-md-2"><input type="number" className="form-control" placeholder="Year" /></div>
                <div className="col-md-2"><input type="number" step="0.01" className="form-control" placeholder="CGPA" /></div>
                <div className="col-md-2"><input type="text" className="form-control" placeholder="Arrear Status" /></div>
                <div className="col-md-3"><input type="email" className="form-control" placeholder="Email" /></div>
                <div className="col-md-2"><input type="text" className="form-control" placeholder="Phone" /></div>
                <div className="col-md-3"><input type="password" className="form-control" placeholder="Password" /></div>
                <div className="col-md-2 d-flex align-items-end"><button type="button" className="btn btn-primary w-100">Add Student</button></div>
              </form>
              <div className="table-responsive">
                <table className="table table-striped table-hover table-sm align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Roll No</th><th>Name</th><th>Dept</th><th>Year</th><th>CGPA</th>
                      <th>Arrear Status</th><th>Email</th><th>Phone</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(s => (
                      <tr key={s.id}>
                        <td>{s.roll_no}</td><td>{s.name}</td><td>{s.dept}</td><td>{s.year}</td><td>{s.cgpa}</td>
                        <td>{s.arrear_status}</td><td>{s.email}</td><td>{s.phone}</td>
                        <td className="text-nowrap">
                          <button className="btn btn-sm btn-warning me-1">Edit</button>
                          <button className="btn btn-sm btn-danger">Del</button>
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
              <h4 className="mb-3">Manage Companies</h4>
              <form className="row g-3 mb-4">
                <div className="col-md-4"><input type="text" className="form-control" placeholder="Company Name" /></div>
                <div className="col-md-2"><input type="number" step="0.01" className="form-control" placeholder="Min CGPA" /></div>
                <div className="col-md-2">
                  <select className="form-select">
                    <option value="">Arrears Allowed?</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="col-md-4"><input type="text" className="form-control" placeholder="Eligible Dept (e.g. CSE, IT)" /></div>
                <div className="col-md-3"><input type="number" step="0.01" className="form-control" placeholder="Package (LPA)" /></div>
                <div className="col-md-2"><input type="number" className="form-control" placeholder="Year" /></div>
                <div className="col-md-2 d-flex align-items-end"><button type="button" className="btn btn-primary w-100">Add Company</button></div>
              </form>
              <div className="table-responsive">
                <table className="table table-striped table-hover table-sm align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Company Name</th><th>Min CGPA</th><th>Arrears Allowed</th>
                      <th>Eligible Dept</th><th>Package (LPA)</th><th>Year</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map(c => (
                      <tr key={c.id}>
                        <td>{c.company_name}</td><td>{c.min_cgpa}</td><td>{c.arrear_allowed}</td>
                        <td>{c.eligible_dept}</td><td>{c.package}</td><td>{c.year}</td>
                        <td><button className="btn btn-sm btn-danger">Del</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TRAININGS SECTION */}
          {activeTab === 'trainings' && (
            <div>
              <h4 className="mb-3">Manage Trainings</h4>
              <form className="row g-3 mb-4">
                <div className="col-md-3"><input type="text" className="form-control" placeholder="Training Name" /></div>
                <div className="col-md-3"><input type="text" className="form-control" placeholder="Trainer Name" /></div>
                <div className="col-md-2"><input type="date" className="form-control" /></div>
                <div className="col-md-2"><input type="text" className="form-control" placeholder="Duration (e.g. 2 Days)" /></div>
                <div className="col-md-2"><input type="text" className="form-control" placeholder="Eligible Dept" /></div>
                <div className="col-md-10"><input type="text" className="form-control" placeholder="Description" /></div>
                <div className="col-md-2 d-flex align-items-end"><button type="button" className="btn btn-primary w-100">Add Training</button></div>
              </form>
              <div className="table-responsive">
                <table className="table table-striped table-hover table-sm align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Training Name</th><th>Trainer Name</th><th>Date</th>
                      <th>Duration</th><th>Eligible Dept</th><th>Description</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainings.map(t => (
                      <tr key={t.id}>
                        <td>{t.training_name}</td><td>{t.trainer_name}</td><td>{t.training_date}</td>
                        <td>{t.duration}</td><td>{t.eligible_dept}</td><td>{t.description}</td>
                        <td><button className="btn btn-sm btn-danger">Del</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* REPORTS SECTION */}
          {activeTab === 'reports' && (
            <div>
              <h4 className="mb-3">Generate Reports</h4>
              <div className="d-flex gap-3 mb-4 flex-wrap">
                <button className="btn btn-outline-primary">Year Wise Report</button>
                <button className="btn btn-outline-success">Company Wise Report</button>
                <button className="btn btn-outline-info">Dept Wise Report</button>
                <button className="btn btn-outline-secondary">Eligible Students</button>
              </div>
              <div className="alert alert-light border">
                <h5>Sample Report Output</h5>
                <div className="table-responsive">
                  <table className="table table-sm table-bordered mt-2">
                    <thead className="table-light"><tr><th>Metric</th><th>Value</th></tr></thead>
                    <tbody>
                      <tr><td>Total Placed</td><td>120</td></tr>
                      <tr><td>Total Not Placed</td><td>45</td></tr>
                      <tr><td>Highest CTC</td><td>12 LPA</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PLACEMENT STATUS SECTION */}
          {activeTab === 'placement' && (
            <div>
              <h4 className="mb-3">Check Placement Status</h4>
              <div className="row mb-4">
                <div className="col-md-6 d-flex gap-2">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter Roll No (e.g. 101, 102)"
                    value={searchRoll}
                    onChange={(e) => setSearchRoll(e.target.value)}
                  />
                  <button className="btn btn-primary" onClick={handleSearchPlacement}>Search</button>
                </div>
              </div>
              {searchResult && (
                <div className={`alert ${searchResult.notFound ? 'alert-warning' : 'alert-info'}`}>
                  {searchResult.notFound ? (
                    <span>No student found with Roll No: {searchRoll}</span>
                  ) : (
                    <div>
                      <p className="mb-1"><strong>Name:</strong> {searchResult.name}</p>
                      <p className="mb-1"><strong>Status:</strong> {searchResult.status}</p>
                      <p className="mb-0"><strong>Company:</strong> {searchResult.company}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
