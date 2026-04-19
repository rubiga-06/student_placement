const API_URL = 'http://localhost:5000/api';

export const login = async (credentials) => {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    return res.json();
};

export const fetchStudents = async () => {
    const res = await fetch(`${API_URL}/students`);
    return res.json();
};

export const addStudent = async (student) => {
    const res = await fetch(`${API_URL}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
    });
    return res.json();
};

export const deleteStudent = async (id) => {
    const res = await fetch(`${API_URL}/students/${id}`, { method: 'DELETE' });
    return res.json();
};

export const fetchCompanies = async () => {
    const res = await fetch(`${API_URL}/companies`);
    return res.json();
};

export const addCompany = async (company) => {
    const res = await fetch(`${API_URL}/companies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(company)
    });
    return res.json();
};

export const deleteCompany = async (id) => {
    const res = await fetch(`${API_URL}/companies/${id}`, { method: 'DELETE' });
    return res.json();
};

export const fetchTrainings = async () => {
    const res = await fetch(`${API_URL}/trainings`);
    return res.json();
};

export const addTraining = async (training) => {
    const res = await fetch(`${API_URL}/trainings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(training)
    });
    return res.json();
};

export const deleteTraining = async (id) => {
    const res = await fetch(`${API_URL}/trainings/${id}`, { method: 'DELETE' });
    return res.json();
};

export const fetchPlacementStatus = async (rollNo) => {
    const res = await fetch(`${API_URL}/placement-status/${rollNo}`);
    return res.json();
};

export const submitApplication = async (application) => {
    const res = await fetch(`${API_URL}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(application)
    });
    return res.json();
};
