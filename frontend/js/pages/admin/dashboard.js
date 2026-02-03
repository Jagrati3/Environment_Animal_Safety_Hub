/**
 * Admin Dashboard - Main JavaScript
 * Handles authentication, CRUD operations, and UI interactions
 */

// ============================================
// State Management
// ============================================

const state = {
    isAuthenticated: false,
    currentUser: null,
    currentSection: 'overview',
    quizzes: [],
    reports: [],
    content: [],
    feedback: [],
    currentTab: 'plant-care'
};

// ============================================
// Authentication
// ============================================

const AUTH = {
    // Demo credentials (in production, use proper backend authentication)
    credentials: {
        username: 'admin',
        password: 'admin123'
    },

    init() {
        // Check if user is already logged in
        const savedAuth = localStorage.getItem('adminAuth');
        if (savedAuth) {
            const authData = JSON.parse(savedAuth);
            const expiryDate = new Date(authData.expiry);

            if (expiryDate > new Date()) {
                this.login(authData.username, true);
                return;
            } else {
                localStorage.removeItem('adminAuth');
            }
        }

        // Setup login form
        const loginForm = document.getElementById('loginForm');
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('adminPassword');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('adminUsername').value;
            const password = document.getElementById('adminPassword').value;
            const remember = document.getElementById('rememberMe').checked;

            if (username === this.credentials.username && password === this.credentials.password) {
                this.login(username, remember);
            } else {
                showToast('Invalid credentials. Try: admin / admin123', 'error');
            }
        });

        togglePassword.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            togglePassword.querySelector('i').classList.toggle('fa-eye');
            togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
        });
    },

    login(username, remember) {
        state.isAuthenticated = true;
        state.currentUser = username;

        if (remember) {
            const expiry = new Date();
            expiry.setDate(expiry.getDate() + 7);
            localStorage.setItem('adminAuth', JSON.stringify({
                username,
                expiry: expiry.toISOString()
            }));
        }

        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('dashboardScreen').classList.remove('hidden');
        document.getElementById('adminName').textContent = username;

        showToast('Welcome back, ' + username + '!');
        Dashboard.init();
    },

    logout() {
        state.isAuthenticated = false;
        state.currentUser = null;
        localStorage.removeItem('adminAuth');

        document.getElementById('dashboardScreen').classList.add('hidden');
        document.getElementById('loginScreen').classList.remove('hidden');

        showToast('Logged out successfully');
    }
};

// ============================================
// Dashboard Core
// ============================================

const Dashboard = {
    init() {
        this.setupNavigation();
        this.setupLogout();
        this.loadData();
        this.updateStats();
        this.loadRecentActivity();
    },

    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.querySelector('.sidebar');

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const section = item.dataset.section;
                this.switchSection(section);

                // Update active nav item
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');

                // Close sidebar on mobile
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                }
            });
        });

        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });
        }
    },

    setupLogout() {
        document.getElementById('logoutBtn').addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                AUTH.logout();
            }
        });
    },

    switchSection(section) {
        state.currentSection = section;

        // Hide all sections
        document.querySelectorAll('.content-section').forEach(sec => {
            sec.classList.remove('active');
        });

        // Show selected section
        document.getElementById(section).classList.add('active');

        // Update header title
        const titles = {
            'overview': 'Dashboard Overview',
            'quiz-manager': 'Quiz Manager',
            'report-viewer': 'Report Viewer',
            'content-editor': 'Content Editor',
            'feedback-manager': 'Feedback Manager',
            'settings': 'Settings'
        };
        document.getElementById('sectionTitle').textContent = titles[section];

        // Load section-specific data
        if (section === 'quiz-manager') {
            QuizManager.render();
        } else if (section === 'report-viewer') {
            ReportViewer.render();
        } else if (section === 'content-editor') {
            ContentEditor.render();
        }
        else if (section === 'feedback-manager') {
            FeedbackManager.render();
        }
    },

    loadData() {
        // Load quizzes from localStorage or use sample data
        const savedQuizzes = localStorage.getItem('adminQuizzes');
        state.quizzes = savedQuizzes ? JSON.parse(savedQuizzes) : this.getSampleQuizzes();

        // Load reports
        const savedReports = localStorage.getItem('adminReports');
        state.reports = savedReports ? JSON.parse(savedReports) : this.getSampleReports();

        // Load content
        const savedContent = localStorage.getItem('adminContent');
        state.content = savedContent ? JSON.parse(savedContent) : this.getSampleContent();

        // Load feedback (ONLY from real source)
        const savedFeedback = localStorage.getItem('adminFeedback');
        state.feedback = savedFeedback ? JSON.parse(savedFeedback) : [];
    },

    updateStats() {
        document.getElementById('totalQuizzes').textContent = state.quizzes.length;
        document.getElementById('totalReports').textContent =
            state.reports.filter(r => r.status === 'pending').length;
        document.getElementById('totalContent').textContent = state.content.length;
        document.getElementById('totalUsers').textContent = '1,234'; // Mock data
    },

    loadRecentActivity() {
        const activityList = document.getElementById('activityList');
        const activities = [
            { icon: 'fa-question-circle', text: 'New quiz added: Climate Change Basics', time: '2 hours ago' },
            { icon: 'fa-flag', text: 'Report resolved: Waste dumping on Main St', time: '5 hours ago' },
            { icon: 'fa-edit', text: 'Content updated: Plant Care Tips', time: '1 day ago' },
            { icon: 'fa-user', text: 'New user registered', time: '2 days ago' },
            { icon: 'fa-chart-line', text: 'Monthly report generated', time: '3 days ago' }
        ];

        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas ${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <p>${activity.text}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');
    },

    getSampleQuizzes() {
        return [
            {
                id: 1,
                question: 'What percentage of plastic waste is actually recycled globally?',
                category: 'waste',
                options: ['Less than 10%', 'Around 25%', 'About 50%', 'More than 75%'],
                correctAnswer: 0,
                explanation: 'Only about 9% of all plastic waste ever produced has been recycled.'
            },
            {
                id: 2,
                question: 'Which gas is primarily responsible for global warming?',
                category: 'climate',
                options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Helium'],
                correctAnswer: 2,
                explanation: 'Carbon dioxide (CO2) is the primary greenhouse gas emitted through human activities.'
            },
            {
                id: 3,
                question: 'How often should you water most indoor plants?',
                category: 'plant',
                options: ['Daily', 'When soil is dry', 'Once a week', 'Twice a month'],
                correctAnswer: 1,
                explanation: 'Most indoor plants should be watered when the top inch of soil feels dry to the touch.'
            }
        ];
    },

    getSampleReports() {
        return [
            {
                id: 1,
                type: 'waste',
                description: 'Illegal dumping of construction waste',
                location: '123 Main Street, Downtown',
                reporter: 'John Doe',
                email: 'john@example.com',
                date: '2026-01-18',
                status: 'pending',
                priority: 'high'
            },
            {
                id: 2,
                type: 'animal',
                description: 'Injured bird found in park',
                location: 'Central Park, North Entrance',
                reporter: 'Jane Smith',
                email: 'jane@example.com',
                date: '2026-01-17',
                status: 'in-progress',
                priority: 'medium'
            },
            {
                id: 3,
                type: 'pollution',
                description: 'Chemical smell near river',
                location: 'Riverside Avenue',
                reporter: 'Mike Johnson',
                email: 'mike@example.com',
                date: '2026-01-15',
                status: 'resolved',
                priority: 'high'
            }
        ];
    },

    getSampleContent() {
        return [
            {
                id: 1,
                title: 'Essential Watering Tips for Beginners',
                category: 'plant-care',
                body: 'Learn the fundamentals of proper plant watering. Check soil moisture before watering, use room temperature water, and ensure proper drainage.',
                tags: ['beginner', 'watering', 'tips'],
                author: 'Admin',
                date: '2026-01-15'
            },
            {
                id: 2,
                title: 'Understanding Climate Change Impact',
                category: 'climate',
                body: 'Climate change affects ecosystems worldwide. Rising temperatures, extreme weather events, and sea level rise are key indicators.',
                tags: ['climate', 'awareness', 'education'],
                author: 'Admin',
                date: '2026-01-14'
            },
            {
                id: 3,
                title: 'Effective Waste Segregation Methods',
                category: 'waste',
                body: 'Proper waste segregation is crucial for recycling. Separate organic, recyclable, and hazardous waste at source.',
                tags: ['waste', 'recycling', 'tips'],
                author: 'Admin',
                date: '2026-01-13'
            }
        ];
    },

    getSampleFeedback() {
        return [
            {
                id: 1,
                name: 'Amit Sharma',
                email: 'amit@example.com',
                message: 'Great initiative! The quizzes are very informative.',
                date: '2026-01-20',
                status: 'unread'
            },
            {
                id: 2,
                name: 'Neha Verma',
                email: 'neha@example.com',
                message: 'Please add more content on animal rescue and helplines.',
                date: '2026-01-19',
                status: 'read'
            },
            {
                id: 3,
                name: 'Anonymous',
                email: '-',
                message: 'The site UI is clean and easy to use. Keep it up!',
                date: '2026-01-18',
                status: 'unread'
            }
        ];
    },

    saveData() {
        localStorage.setItem('adminQuizzes', JSON.stringify(state.quizzes));
        localStorage.setItem('adminReports', JSON.stringify(state.reports));
        localStorage.setItem('adminContent', JSON.stringify(state.content));
        localStorage.setItem('adminFeedback', JSON.stringify(state.feedback));
        this.updateStats();
    }
};

// ============================================
// Quiz Manager
// ============================================

const QuizManager = {
    init() {
        document.getElementById('addQuizBtn').addEventListener('click', () => {
            this.openModal();
        });

        document.getElementById('closeQuizModal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('cancelQuizBtn').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('quizForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveQuiz();
        });

        // Filters
        document.getElementById('quizCategory').addEventListener('change', () => {
            this.render();
        });

        document.getElementById('quizSearch').addEventListener('input', () => {
            this.render();
        });
    },

    render() {
        const category = document.getElementById('quizCategory').value;
        const search = document.getElementById('quizSearch').value.toLowerCase();

        let filtered = state.quizzes;

        if (category !== 'all') {
            filtered = filtered.filter(q => q.category === category);
        }

        if (search) {
            filtered = filtered.filter(q =>
                q.question.toLowerCase().includes(search) ||
                q.options.some(opt => opt.toLowerCase().includes(search))
            );
        }

        const quizList = document.getElementById('quizList');

        if (filtered.length === 0) {
            quizList.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
                    <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>No quizzes found</p>
                </div>
            `;
            return;
        }

        quizList.innerHTML = filtered.map(quiz => `
            <div class="quiz-item">
                <div class="quiz-item-header">
                    <span class="quiz-category-badge">${this.getCategoryName(quiz.category)}</span>
                    <div class="quiz-actions">
                        <button class="btn-icon" onclick="QuizManager.editQuiz(${quiz.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon delete" onclick="QuizManager.deleteQuiz(${quiz.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="quiz-question">${quiz.question}</div>
                <div class="quiz-options">
                    ${quiz.options.map((option, index) => `
                        <div class="quiz-option ${index === quiz.correctAnswer ? 'correct' : ''}">
                            <span class="quiz-option-label">${String.fromCharCode(65 + index)}</span>
                            <span>${option}</span>
                        </div>
                    `).join('')}
                </div>
                ${quiz.explanation ? `<p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem;"><strong>Explanation:</strong> ${quiz.explanation}</p>` : ''}
            </div>
        `).join('');
    },

    getCategoryName(category) {
        const names = {
            'environment': 'Environment',
            'climate': 'Climate Change',
            'waste': 'Waste Management',
            'plant': 'Plant Care',
            'animal': 'Animal Safety'
        };
        return names[category] || category;
    },

    openModal(quiz = null) {
        const modal = document.getElementById('quizModal');
        const form = document.getElementById('quizForm');

        if (quiz) {
            document.getElementById('quizModalTitle').textContent = 'Edit Quiz';
            document.getElementById('quizId').value = quiz.id;
            document.getElementById('quizQuestion').value = quiz.question;
            document.getElementById('quizCategorySelect').value = quiz.category;
            document.getElementById('option1').value = quiz.options[0];
            document.getElementById('option2').value = quiz.options[1];
            document.getElementById('option3').value = quiz.options[2];
            document.getElementById('option4').value = quiz.options[3];
            document.querySelector(`input[name="correctAnswer"][value="${quiz.correctAnswer}"]`).checked = true;
            document.getElementById('quizExplanation').value = quiz.explanation || '';
        } else {
            document.getElementById('quizModalTitle').textContent = 'Add New Quiz';
            form.reset();
            document.getElementById('quizId').value = '';
        }

        modal.classList.add('show');
    },

    closeModal() {
        document.getElementById('quizModal').classList.remove('show');
    },

    saveQuiz() {
        const id = document.getElementById('quizId').value;
        const question = document.getElementById('quizQuestion').value;
        const category = document.getElementById('quizCategorySelect').value;
        const options = [
            document.getElementById('option1').value,
            document.getElementById('option2').value,
            document.getElementById('option3').value,
            document.getElementById('option4').value
        ];
        const correctAnswer = parseInt(document.querySelector('input[name="correctAnswer"]:checked').value);
        const explanation = document.getElementById('quizExplanation').value;

        const quiz = {
            id: id ? parseInt(id) : Date.now(),
            question,
            category,
            options,
            correctAnswer,
            explanation
        };

        if (id) {
            const index = state.quizzes.findIndex(q => q.id === parseInt(id));
            state.quizzes[index] = quiz;
            showToast('Quiz updated successfully!');
        } else {
            state.quizzes.push(quiz);
            showToast('Quiz added successfully!');
        }

        Dashboard.saveData();
        this.closeModal();
        this.render();
    },

    editQuiz(id) {
        const quiz = state.quizzes.find(q => q.id === id);
        if (quiz) {
            this.openModal(quiz);
        }
    },

    deleteQuiz(id) {
        if (confirm('Are you sure you want to delete this quiz?')) {
            state.quizzes = state.quizzes.filter(q => q.id !== id);
            Dashboard.saveData();
            this.render();
            showToast('Quiz deleted successfully!');
        }
    }
};

// ============================================
// Report Viewer
// ============================================

const ReportViewer = {
    init() {
        document.getElementById('reportStatus').addEventListener('change', () => {
            this.render();
        });

        document.getElementById('reportType').addEventListener('change', () => {
            this.render();
        });

        document.getElementById('closeReportModal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('closeReportDetailsBtn').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('updateReportStatusBtn').addEventListener('click', () => {
            this.updateStatus();
        });
    },

    render() {
        const statusFilter = document.getElementById('reportStatus').value;
        const typeFilter = document.getElementById('reportType').value;

        let filtered = state.reports;

        if (statusFilter !== 'all') {
            filtered = filtered.filter(r => r.status === statusFilter);
        }

        if (typeFilter !== 'all') {
            filtered = filtered.filter(r => r.type === typeFilter);
        }

        const tbody = document.getElementById('reportsTableBody');

        if (filtered.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 3rem; color: var(--text-muted);">
                        <i class="fas fa-inbox" style="font-size: 3rem; display: block; margin-bottom: 1rem;"></i>
                        No reports found
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = filtered.map(report => `
            <tr>
                <td>#${report.id}</td>
                <td>${this.getTypeName(report.type)}</td>
                <td>${report.description.substring(0, 50)}...</td>
                <td>${report.location}</td>
                <td>${report.reporter}</td>
                <td>${report.date}</td>
                <td><span class="status-badge ${report.status}">${report.status}</span></td>
                <td>
                    <div class="report-actions">
                        <button class="btn-icon" onclick="ReportViewer.viewReport(${report.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon delete" onclick="ReportViewer.deleteReport(${report.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    },

    getTypeName(type) {
        const names = {
            'waste': 'Waste Dumping',
            'animal': 'Animal Issue',
            'pollution': 'Pollution',
            'other': 'Other'
        };
        return names[type] || type;
    },

    viewReport(id) {
        const report = state.reports.find(r => r.id === id);
        if (!report) return;

        const details = document.getElementById('reportDetails');
        details.innerHTML = `
            <div class="detail-row">
                <div class="detail-label">Report ID</div>
                <div class="detail-value">#${report.id}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Type</div>
                <div class="detail-value">${this.getTypeName(report.type)}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Description</div>
                <div class="detail-value">${report.description}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Location</div>
                <div class="detail-value">${report.location}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Reporter</div>
                <div class="detail-value">${report.reporter} (${report.email})</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Date Reported</div>
                <div class="detail-value">${report.date}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Current Status</div>
                <div class="detail-value">
                    <select id="reportStatusSelect" style="padding: 0.5rem; background: var(--bg-darker); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary);">
                        <option value="pending" ${report.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="in-progress" ${report.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                        <option value="resolved" ${report.status === 'resolved' ? 'selected' : ''}>Resolved</option>
                    </select>
                </div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Priority</div>
                <div class="detail-value">${report.priority}</div>
            </div>
        `;

        details.dataset.reportId = report.id;
        document.getElementById('reportModal').classList.add('show');
    },

    closeModal() {
        document.getElementById('reportModal').classList.remove('show');
    },

    updateStatus() {
        const reportId = parseInt(document.getElementById('reportDetails').dataset.reportId);
        const newStatus = document.getElementById('reportStatusSelect').value;

        const report = state.reports.find(r => r.id === reportId);
        if (report) {
            report.status = newStatus;
            Dashboard.saveData();
            this.closeModal();
            this.render();
            showToast('Report status updated successfully!');
        }
    },

    deleteReport(id) {
        if (confirm('Are you sure you want to delete this report?')) {
            state.reports = state.reports.filter(r => r.id !== id);
            Dashboard.saveData();
            this.render();
            showToast('Report deleted successfully!');
        }
    }
};

// ============================================
// Content Editor
// ============================================

const ContentEditor = {
    init() {
        document.getElementById('addContentBtn').addEventListener('click', () => {
            this.openModal();
        });

        document.getElementById('closeContentModal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('cancelContentBtn').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('contentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveContent();
        });

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.currentTab = btn.dataset.tab;
                this.render();
            });
        });
    },

    render() {
        const filtered = state.content.filter(c => c.category === state.currentTab);

        const contentList = document.getElementById('contentList');

        if (filtered.length === 0) {
            contentList.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
                    <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>No content items found for this category</p>
                </div>
            `;
            return;
        }

        contentList.innerHTML = filtered.map(content => `
            <div class="content-item">
                <div class="content-item-header">
                    <div>
                        <h3 class="content-title">${content.title}</h3>
                        <div class="content-meta">
                            <span><i class="fas fa-user"></i> ${content.author}</span>
                            <span><i class="fas fa-calendar"></i> ${content.date}</span>
                        </div>
                    </div>
                    <div class="quiz-actions">
                        <button class="btn-icon" onclick="ContentEditor.editContent(${content.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon delete" onclick="ContentEditor.deleteContent(${content.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="content-body">${content.body}</div>
                <div class="content-tags">
                    ${content.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
    },

    openModal(content = null) {
        const modal = document.getElementById('contentModal');
        const form = document.getElementById('contentForm');

        if (content) {
            document.getElementById('contentModalTitle').textContent = 'Edit Content';
            document.getElementById('contentId').value = content.id;
            document.getElementById('contentTitle').value = content.title;
            document.getElementById('contentCategorySelect').value = content.category;
            document.getElementById('contentBody').value = content.body;
            document.getElementById('contentTags').value = content.tags.join(', ');
        } else {
            document.getElementById('contentModalTitle').textContent = 'Add New Content';
            form.reset();
            document.getElementById('contentId').value = '';
            document.getElementById('contentCategorySelect').value = state.currentTab;
        }

        modal.classList.add('show');
    },

    closeModal() {
        document.getElementById('contentModal').classList.remove('show');
    },

    saveContent() {
        const id = document.getElementById('contentId').value;
        const title = document.getElementById('contentTitle').value;
        const category = document.getElementById('contentCategorySelect').value;
        const body = document.getElementById('contentBody').value;
        const tags = document.getElementById('contentTags').value
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag);

        const content = {
            id: id ? parseInt(id) : Date.now(),
            title,
            category,
            body,
            tags,
            author: state.currentUser || 'Admin',
            date: new Date().toISOString().split('T')[0]
        };

        if (id) {
            const index = state.content.findIndex(c => c.id === parseInt(id));
            state.content[index] = content;
            showToast('Content updated successfully!');
        } else {
            state.content.push(content);
            showToast('Content added successfully!');
        }

        Dashboard.saveData();
        this.closeModal();
        this.render();
    },

    editContent(id) {
        const content = state.content.find(c => c.id === id);
        if (content) {
            this.openModal(content);
        }
    },

    deleteContent(id) {
        if (confirm('Are you sure you want to delete this content?')) {
            state.content = state.content.filter(c => c.id !== id);
            Dashboard.saveData();
            this.render();
            showToast('Content deleted successfully!');
        }
    }
};

// ============================================
// Feedback Manager
// ============================================

const FeedbackManager = {
    render() {
        const tbody = document.getElementById('feedbackTableBody');

        if (!state.feedback.length) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">
                        No feedback submitted yet
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = state.feedback.map((fb, index) => `
            <tr class="${fb.status === 'unread' ? 'unread-row' : ''}">
                <td>${index + 1}</td>
                <td>${fb.name}</td>
                <td>${fb.email}</td>
                <td>${fb.message.substring(0, 60)}${fb.message.length > 60 ? '...' : ''}</td>
                <td>${fb.date}</td>
                <td>
                    <span class="status-badge ${fb.status}">
                        ${fb.status}
                    </span>
                </td>
                <td>
                    <button class="btn-icon" onclick="FeedbackManager.toggleStatus(${fb.id})">
                        <i class="fas fa-envelope-open"></i>
                    </button>
                    <button class="btn-icon delete" onclick="FeedbackManager.deleteFeedback(${fb.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    },

    toggleStatus(id) {
        const feedback = state.feedback.find(f => f.id === id);
        if (!feedback) return;

        feedback.status = feedback.status === 'unread' ? 'read' : 'unread';
        Dashboard.saveData();
        this.render();
        showToast('Feedback status updated');
    },

    deleteFeedback(id) {
        if (confirm('Delete this feedback?')) {
            state.feedback = state.feedback.filter(f => f.id !== id);
            Dashboard.saveData();
            this.render();
            showToast('Feedback deleted');
        }
    }
};

// ============================================
// Settings
// ============================================

const Settings = {
    init() {
        document.getElementById('accountSettingsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Account settings updated!');
        });

        document.getElementById('passwordChangeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const current = document.getElementById('currentPassword').value;
            const newPass = document.getElementById('newPassword').value;
            const confirm = document.getElementById('confirmPassword').value;

            if (newPass !== confirm) {
                showToast('Passwords do not match!', 'error');
                return;
            }

            showToast('Password changed successfully!');
            e.target.reset();
        });

        document.getElementById('exportDataBtn').addEventListener('click', () => {
            this.exportData();
        });

        document.getElementById('importDataBtn').addEventListener('click', () => {
            showToast('Import functionality coming soon!');
        });

        document.getElementById('clearCacheBtn').addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all cached data?')) {
                localStorage.clear();
                showToast('Cache cleared successfully!');
                setTimeout(() => location.reload(), 1500);
            }
        });
    },

    exportData() {
       const data = {
            quizzes: state.quizzes,
            reports: state.reports,
            content: state.content,
            feedback: state.feedback,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `admin-data-export-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);

        showToast('Data exported successfully!');
    }
};

// ============================================
// Toast Notifications
// ============================================

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    toastMessage.textContent = message;

    if (type === 'error') {
        toast.style.background = 'var(--danger-gradient)';
        toast.querySelector('i').className = 'fas fa-exclamation-circle';
    } else {
        toast.style.background = 'var(--success-gradient)';
        toast.querySelector('i').className = 'fas fa-check-circle';
    }

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================
// Initialize Application
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    AUTH.init();
    QuizManager.init();
    ReportViewer.init();
    ContentEditor.init();
    Settings.init();
    FeedbackManager.render();
});
