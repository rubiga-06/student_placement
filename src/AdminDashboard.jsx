import React, { useState, useEffect } from 'react';
import { 
  fetchStudents, addStudent, deleteStudent, 
  fetchCompanies, addCompany, deleteCompany, 
  fetchTrainings, addTraining, deleteTraining,
  fetchPlacementStatus 
} from './api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('students');
  
  // States for data
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [trainings, setTrainings] = useState([]);

  // Form States
  const [studentForm, setStudentForm] = useState({ roll_no: '', name: '', dept: '', year: '', cgpa: '', arrear_status: '', email: '', phone: '', password: '' });
  const [companyForm, setCompanyForm] = useState({ company_name: '', min_cgpa: '', arrear_allowed: '', eligible_dept: '', package: '', year: '' });
  const [trainingForm, setTrainingForm] = useState({ training_name: '', trainer_name: '', training_date: '', duration: '', eligible_dept: '', description: '' });

  // States for search
  const [searchRoll, setSearchRoll] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setStudents(await fetchStudents());
      setCompanies(await fetchCompanies());
      setTrainings(await fetchTrainings());
    } catch (err) { console.error("Load failed", err); }
  };

  const handleAddStudent = async () => {
    await addStudent(studentForm);
    setStudentForm({ roll_no: '', name: '', dept: '', year: '', cgpa: '', arrear_status: '', email: '', phone: '', password: '' });
    loadAllData();
  };

  const handleDeleteStudent = async (id) => {
    await deleteStudent(id);
    loadAllData();
  };

  const handleAddCompany = async () => {
    await addCompany(companyForm);
    setCompanyForm({ company_name: '', min_cgpa: '', arrear_allowed: '', eligible_dept: '', package: '', year: '' });
    loadAllData();
  };

  const handleDeleteCompany = async (id) => {
    await deleteCompany(id);
    loadAllData();
  };

  const handleAddTraining = async () => {
    await addTraining(trainingForm);
    setTrainingForm({ training_name: '', trainer_name: '', training_date: '', duration: '', eligible_dept: '', description: '' });
    loadAllData();
  };

  const handleDeleteTraining = async (id) => {
    await deleteTraining(id);
    loadAllData();
  };

  const handleSearchPlacement = async () => {
    try {
      const result = await fetchPlacementStatus(searchRoll);
      setSearchResult(result);
    } catch (err) {
      setSearchResult({ notFound: true });
    }
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
              <form className="row g-3 mb-4" onSubmit={(e) => { e.preventDefault(); handleAddStudent(); }}>
                <div className="col-md-2"><input type="text" className="form-control" placeholder="Roll No" value={studentForm.roll_no} onChange={(e) => setStudentForm({...studentForm, roll_no: e.target.value})} /></div>
                <div className="col-md-3"><input type="text" className="form-control" placeholder="Name" value={studentForm.name} onChange={(e) => setStudentForm({...studentForm, name: e.target.value})} /></div>
                <div className="col-md-2"><input type="text" className="form-control" placeholder="Dept" value={studentForm.dept} onChange={(e) => setStudentForm({...studentForm, dept: e.target.value})} /></div>
                <div className="col-md-2"><input type="number" className="form-control" placeholder="Year" value={studentForm.year} onChange={(e) => setStudentForm({...studentForm, year: e.target.value})} /></div>
                <div className="col-md-2"><input type="number" step="0.01" className="form-control" placeholder="CGPA" value={studentForm.cgpa} onChange={(e) => setStudentForm({...studentForm, cgpa: e.target.value})} /></div>
                <div className="col-md-2"><input type="text" className="form-control" placeholder="Arrear Status" value={studentForm.arrear_status} onChange={(e) => setStudentForm({...studentForm, arrear_status: e.target.value})} /></div>
                <div className="col-md-3"><input type="email" className="form-control" placeholder="Email" value={studentForm.email} onChange={(e) => setStudentForm({...studentForm, email: e.target.value})} /></div>
                <div className="col-md-2"><input type="text" className="form-control" placeholder="Phone" value={studentForm.phone} onChange={(e) => setStudentForm({...studentForm, phone: e.target.value})} /></div>
                <div className="col-md-3"><input type="password" className="form-control" placeholder="Password" value={studentForm.password} onChange={(e) => setStudentForm({...studentForm, password: e.target.value})} /></div>
                <div className="col-md-2 d-flex align-items-end"><button type="submit" className="btn btn-primary w-100">Add Student</button></div>
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
                      <tr key={s.student_id}>
                        <td>{s.roll_no}</td><td>{s.name}</td><td>{s.dept}</td><td>{s.year}</td><td>{s.cgpa}</td>
                        <td>{s.arrear_status}</td><td>{s.email}</td><td>{s.phone}</td>
                        <td className="text-nowrap">
                          <button className="btn btn-sm btn-danger" onClick={() => handleDeleteStudent(s.student_id)}>Del</button>
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
              <form className="row g-3 mb-4" onSubmit={(e) => { e.preventDefault(); handleAddCompany(); }}>
                <div className="col-md-4"><input type="text" className="form-control" placeholder="Company Name" value={companyForm.company_name} onChange={(e) => setCompanyForm({...companyForm, company_name: e.target.value})} /></div>
                <div className="col-md-2"><input type="number" step="0.01" className="form-control" placeholder="Min CGPA" value={companyForm.min_cgpa} onChange={(e) => setCompanyForm({...companyForm, min_cgpa: e.target.value})} /></div>
                <div className="col-md-2">
                  <select className="form-select" value={companyForm.arrear_allowed} onChange={(e) => setCompanyForm({...companyForm, arrear_allowed: e.target.value})}>
                    <option value="">Arrears Allowed?</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="col-md-4"><input type="text" className="form-control" placeholder="Eligible Dept" value={companyForm.eligible_dept} onChange={(e) => setCompanyForm({...companyForm, eligible_dept: e.target.value})} /></div>
                <div className="col-md-3"><input type="number" step="0.01" className="form-control" placeholder="Package (LPA)" value={companyForm.package} onChange={(e) => setCompanyForm({...companyForm, package: e.target.value})} /></div>
                <div className="col-md-2"><input type="number" className="form-control" placeholder="Year" value={companyForm.year} onChange={(e) => setCompanyForm({...companyForm, year: e.target.value})} /></div>
                <div className="col-md-2 d-flex align-items-end"><button type="submit" className="btn btn-primary w-100">Add Company</button></div>
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
                      <tr key={c.company_id}>
                        <td>{c.company_name}</td><td>{c.min_cgpa}</td><td>{c.arrear_allowed}</td>
                        <td>{c.eligible_dept}</td><td>{c.package}</td><td>{c.year}</td>
                        <td><button className="btn btn-sm btn-danger" onClick={() => handleDeleteCompany(c.company_id)}>Del</button></td>
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
              <form className="row g-3 mb-4" onSubmit={(e) => { e.preventDefault(); handleAddTraining(); }}>
                <div className="col-md-3"><input type="text" className="form-control" placeholder="Training Name" value={trainingForm.training_name} onChange={(e) => setTrainingForm({...trainingForm, training_name: e.target.value})} /></div>
                <div className="col-md-3"><input type="text" className="form-control" placeholder="Trainer Name" value={trainingForm.trainer_name} onChange={(e) => setTrainingForm({...trainingForm, trainer_name: e.target.value})} /></div>
                <div className="col-md-2"><input type="date" className="form-control" value={trainingForm.training_date} onChange={(e) => setTrainingForm({...trainingForm, training_date: e.target.value})} /></div>
                <div className="col-md-2"><input type="text" className="form-control" placeholder="Duration" value={trainingForm.duration} onChange={(e) => setTrainingForm({...trainingForm, duration: e.target.value})} /></div>
                <div className="col-md-2"><input type="text" className="form-control" placeholder="Eligible Dept" value={trainingForm.eligible_dept} onChange={(e) => setTrainingForm({...trainingForm, eligible_dept: e.target.value})} /></div>
                <div className="col-md-10"><input type="text" className="form-control" placeholder="Description" value={trainingForm.description} onChange={(e) => setTrainingForm({...trainingForm, description: e.target.value})} /></div>
                <div className="col-md-2 d-flex align-items-end"><button type="submit" className="btn btn-primary w-100">Add Training</button></div>
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
                      <tr key={t.training_id}>
                        <td>{t.training_name}</td><td>{t.trainer_name}</td><td>{t.training_date}</td>
                        <td>{t.duration}</td><td>{t.eligible_dept}</td><td>{t.description}</td>
                        <td><button className="btn btn-sm btn-danger" onClick={() => handleDeleteTraining(t.training_id)}>Del</button></td>
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
