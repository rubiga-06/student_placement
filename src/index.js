const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// --- LOGIN ROUTE ---
app.post('/api/login', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        if (role === 'admin') {
            const [rows] = await db.query('SELECT * FROM admins WHERE username = ? AND password = ?', [username, password]);
            if (rows.length > 0) {
                return res.json({ success: true, role: 'admin', user: rows[0] });
            }
        } else {
            const [rows] = await db.query('SELECT * FROM students WHERE roll_no = ? AND password = ?', [username, password]);
            if (rows.length > 0) {
                return res.json({ success: true, role: 'student', user: rows[0] });
            }
        }
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- STUDENT MANAGEMENT (ADMIN) ---
app.get('/api/students', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM students');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/students', async (req, res) => {
    const { roll_no, name, dept, year, cgpa, arrear_status, email, phone, password } = req.body;
    try {
        await db.query(
            'INSERT INTO students (roll_no, name, dept, year, cgpa, arrear_status, email, phone, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [roll_no, name, dept, year, cgpa, arrear_status, email, phone, password]
        );
        res.json({ message: 'Student added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/students/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM students WHERE student_id = ?', [req.params.id]);
        res.json({ message: 'Student deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- COMPANY MANAGEMENT ---
app.get('/api/companies', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM companies');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/companies', async (req, res) => {
    const { company_name, min_cgpa, arrear_allowed, eligible_dept, package, year } = req.body;
    try {
        await db.query(
            'INSERT INTO companies (company_name, min_cgpa, arrear_allowed, eligible_dept, package, year) VALUES (?, ?, ?, ?, ?, ?)',
            [company_name, min_cgpa, arrear_allowed, eligible_dept, package, year]
        );
        res.json({ message: 'Company added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/companies/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM companies WHERE company_id = ?', [req.params.id]);
        res.json({ message: 'Company deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- TRAINING MANAGEMENT ---
app.get('/api/trainings', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM trainings');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/trainings', async (req, res) => {
    const { training_name, trainer_name, training_date, duration, eligible_dept, description } = req.body;
    try {
        await db.query(
            'INSERT INTO trainings (training_name, trainer_name, training_date, duration, eligible_dept, description) VALUES (?, ?, ?, ?, ?, ?)',
            [training_name, trainer_name, training_date, duration, eligible_dept, description]
        );
        res.json({ message: 'Training added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/trainings/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM trainings WHERE training_id = ?', [req.params.id]);
        res.json({ message: 'Training deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- APPLICATIONS & PLACEMENT STATUS ---
app.get('/api/applications/:studentId', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM job_applications WHERE student_id = ?', [req.params.studentId]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/applications', async (req, res) => {
    const { student_id, company_id, application_date, resume_link } = req.body;
    try {
        await db.query(
            'INSERT INTO job_applications (student_id, company_id, application_date, resume_link) VALUES (?, ?, ?, ?)',
            [student_id, company_id, application_date, resume_link]
        );
        res.json({ message: 'Application submitted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/placement-status/:rollNo', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT s.name, p.status, c.company_name 
            FROM students s 
            LEFT JOIN placements p ON s.student_id = p.student_id 
            LEFT JOIN companies c ON p.company_id = c.company_id 
            WHERE s.roll_no = ?`, [req.params.rollNo]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
