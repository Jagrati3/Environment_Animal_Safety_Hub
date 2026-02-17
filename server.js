const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const helmet = require('helmet');
require('dotenv').config();
const connectDB = require('./backend/config/database');
const initializeDatabase = require('./backend/init-db');
const { rateLimits, sanitizeInput, mongoSanitizeMiddleware } = require('./backend/middleware/security');
const app = express();

// Connect to database
connectDB();
initializeDatabase();

// Middleware to log all requests
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

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
app.use('/api/medical-records', require('./backend/routes/medical-records'));
app.use('/api/foster', require('./backend/routes/foster'));
app.use('/api/volunteers', require('./backend/routes/volunteers'));
app.use('/api/donations', require('./backend/routes/donations'));
app.use('/api/payments', require('./backend/routes/payments'));
app.use('/api/photos', require('./backend/routes/photos'));
app.use('/api/species', require('./backend/routes/species'));
app.use('/api/carbon-offsets', require('./backend/routes/carbon-offsets'));
app.use('/api/eco-challenges', require('./backend/routes/eco-challenges'));


// Middleware: serve HTML files with automatic navbar/footer injection when missing
app.use(async (req, res, next) => {
    try {
        // Only handle GET requests for .html files or root
        if (req.method !== 'GET') return next();

        let urlPath = req.path;

        // Map root to index.html
        if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

        // Only process requests for .html files
        if (!urlPath.toLowerCase().endsWith('.html')) return next();

        const filePath = path.join(__dirname, 'frontend', decodeURIComponent(urlPath));

        // Check file existence
        let stat;
        try {
            stat = await fs.stat(filePath);
        } catch (err) {
            return next();
        }

        if (!stat.isFile()) return next();

        let content = await fs.readFile(filePath, 'utf8');

        // Ensure navbar placeholder exists
        if (!/id=["']navbar-container["']/.test(content)) {
            content = content.replace(/<body([^>]*)>/i, '<body$1>\n  <div id="navbar-container"></div>');
        }

        // Ensure footer placeholder exists
        if (!/id=["']footer-placeholder["']/.test(content)) {
            content = content.replace(/<\/body>/i, '  <div id="footer-placeholder"></div>\n</body>');
        }

        // Ensure component-loader script is included (uses relative path from frontend root)
        if (!/component-loader\.js/.test(content)) {
            // Insert before closing </body>
            const scriptTag = '\n  <script src="/js/components/component-loader.js"></script>\n';
            content = content.replace(/<\/body>/i, scriptTag + '</body>');
        }

        res.type('html').send(content);
    } catch (err) {
        next(err);
    }
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
    // console.log(`🏆 Contributor Recognition: http://localhost:${PORT}/contributor-recognition`);
    console.log(`🏠 Main Site: http://localhost:${PORT}`);
    console.log('\n🚀 REST API Endpoints:');
    console.log(`📝 Reports: http://localhost:${PORT}/api/reports`);
    console.log(`📞 Contact: http://localhost:${PORT}/api/contact`);
    console.log(`🔐 Auth: http://localhost:${PORT}/api/auth`);
    console.log(`🎯 Quiz: http://localhost:${PORT}/api/quiz`);
    console.log(`🐾 Animals: http://localhost:${PORT}/api/animals`);
    console.log(`📅 Events: http://localhost:${PORT}/api/events`);
    console.log(`🏠 Foster Management: http://localhost:${PORT}/api/foster`);
    console.log(`💊 Medical Records: http://localhost:${PORT}/api/medical-records`);
    console.log(`👥 Volunteer Management: http://localhost:${PORT}/api/volunteers`);
    console.log(`📸 Photo Analysis: http://localhost:${PORT}/api/photos`);
    console.log(`🦁 Species Profiles: http://localhost:${PORT}/api/species`);
    console.log('='.repeat(60));
    console.log('📊 Request Logs:');
    console.log('='.repeat(60));
});