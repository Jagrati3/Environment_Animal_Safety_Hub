const express = require('express');
const path = require('path');
const app = express();

// CORS Security Headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Middleware to log all requests
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

// Static File Caching
app.use(express.static(path.join(__dirname, 'frontend'), {
    maxAge: '1d', // Cache for 1 day
    etag: true,
    lastModified: true
}));

// Disable directory listing
app.use((req, res, next) => {
    if (req.url.endsWith('/')) {
        return res.redirect('/index.html');
    }
    next();
});

// Category Management route
app.get('/category-management', (req, res) => {
    console.log('Category management requested');
    const filePath = path.join(__dirname, 'frontend/pages/admin/category-management.html');
    console.log('File path:', filePath);
    res.sendFile(filePath);
});

// Quality Control route
app.get('/quality-control', (req, res) => {
    console.log('Quality control requested');
    const filePath = path.join(__dirname, 'frontend/pages/admin/quality-control.html');
    console.log('File path:', filePath);
    res.sendFile(filePath);
});

// Contributor Recognition route
app.get('/contributor-recognition', (req, res) => {
    console.log('Contributor recognition requested');
    const filePath = path.join(__dirname, 'frontend/pages/admin/contributor-recognition.html');
    console.log('File path:', filePath);
    res.sendFile(filePath);
});

// Main site route - force index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

const PORT = 3000;

// 404 Error Handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Page not found', url: req.url });
});

// 500 Error Handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log('\n' + '='.repeat(60));
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log('='.repeat(60));
    console.log('📋 Available APIs:');
    console.log(`📁 Category Management: http://localhost:${PORT}/category-management`);
    console.log(`🔍 Quality Control: http://localhost:${PORT}/quality-control`);
    console.log(`🏆 Contributor Recognition: http://localhost:${PORT}/contributor-recognition`);
    console.log(`🏠 Main Site: http://localhost:${PORT}`);
    console.log('='.repeat(60));
    console.log('📊 Request Logs:');
    console.log('='.repeat(60));
});