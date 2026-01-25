const express = require('express');
const path = require('path');
const helmet = require('helmet');
require('dotenv').config();
const connectDB = require('./backend/config/database');
const initializeDatabase = require('./backend/init-db');
const { rateLimits, sanitizeInput, mongoSanitizeMiddleware } = require('./backend/middleware/security');
const app = express();

// Connect to database
connectDB();
initializeDatabase();

// Security middleware
app.use(helmet());
app.use(rateLimits.general);
app.use(mongoSanitizeMiddleware);
app.use(sanitizeInput);

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes with validation
const { validate } = require('./backend/middleware/validation');

app.use('/api/quiz', require('./backend/routes/quiz'));
app.use('/api/animals', require('./backend/routes/animals'));
app.use('/api/users', require('./backend/routes/users'));
app.use('/api/reports', require('./backend/routes/reports'));
app.use('/api/contact', rateLimits.contact, require('./backend/routes/contact'));
app.use('/api/auth', rateLimits.auth, require('./backend/routes/auth'));
app.use('/api/events', require('./backend/routes/events'));

// Middleware to log all requests
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Disable directory listing
app.use((req, res, next) => {
    if (req.url.endsWith('/')) {
        return res.redirect('/index.html');
    }
    next();
});

// Category Management route
app.get('/category-management', (req, res, next) => {
    try {
        console.log('Category management requested');
        const filePath = path.join(__dirname, 'frontend/pages/admin/category-management.html');
        console.log('File path:', filePath);
        res.sendFile(filePath, (err) => {
            if (err) next(err);
        });
    } catch (error) {
        next(error);
    }
});

// Quality Control route
app.get('/quality-control', (req, res, next) => {
    try {
        console.log('Quality control requested');
        const filePath = path.join(__dirname, 'frontend/pages/admin/quality-control.html');
        console.log('File path:', filePath);
        res.sendFile(filePath, (err) => {
            if (err) next(err);
        });
    } catch (error) {
        next(error);
    }
});

// Contributor Recognition route
app.get('/contributor-recognition', (req, res, next) => {
    try {
        console.log('Contributor recognition requested');
        const filePath = path.join(__dirname, 'frontend/pages/admin/contributor-recognition.html');
        console.log('File path:', filePath);
        res.sendFile(filePath, (err) => {
            if (err) next(err);
        });
    } catch (error) {
        next(error);
    }
});

// Main site route - force index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

// 404 Handler - Must be AFTER all routes
const { handle404, handleErrors } = require('./backend/middleware/errorHandlers');
app.use(handle404);

// Global Error Handler - Must be LAST
app.use(handleErrors);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📁 Category Management: http://localhost:${PORT}/category-management`);
    console.log(`🔍 Quality Control: http://localhost:${PORT}/quality-control`);
    console.log(`🏆 Contributor Recognition: http://localhost:${PORT}/contributor-recognition`);
    console.log(`🏠 Main Site: http://localhost:${PORT}`);
    console.log('\n🚀 REST API Endpoints:');
    console.log(`📝 Reports: http://localhost:${PORT}/api/reports`);
    console.log(`📞 Contact: http://localhost:${PORT}/api/contact`);
    console.log(`🔐 Auth: http://localhost:${PORT}/api/auth`);
    console.log(`🎯 Quiz: http://localhost:${PORT}/api/quiz`);
    console.log(`🐾 Animals: http://localhost:${PORT}/api/animals`);
    console.log(`📅 Events: http://localhost:${PORT}/api/events`);
    console.log('='.repeat(60));
    console.log('📊 Request Logs:');
    console.log('='.repeat(60));
});