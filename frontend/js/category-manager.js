// Sample data
let categories = [
    { id: 1, name: 'Web Development', parent: null, description: 'Web-based projects', icon: 'fa-code', projects: [], createdAt: '2024-01-15' },
    { id: 2, name: 'Mobile Apps', parent: null, description: 'Mobile applications', icon: 'fa-mobile-alt', projects: [], createdAt: '2024-01-20' },
    { id: 3, name: 'Frontend', parent: 1, description: 'Frontend development', icon: 'fa-desktop', projects: [], createdAt: '2024-01-25' },
    { id: 4, name: 'Backend', parent: 1, description: 'Backend development', icon: 'fa-server', projects: [], createdAt: '2024-02-01' },
    { id: 5, name: 'React', parent: 3, description: 'React projects', icon: 'fa-react', projects: [], createdAt: '2024-02-05' },
    { id: 6, name: 'Node.js', parent: 4, description: 'Node.js projects', icon: 'fa-node-js', projects: [], createdAt: '2024-02-10' }
];

let projects = [
    { id: 1, name: 'EcoLife Website', category: 1, techStack: ['HTML', 'CSS', 'JavaScript'], createdAt: '2024-01-20' },
    { id: 2, name: 'Animal Tracker App', category: 2, techStack: ['React Native', 'Firebase'], createdAt: '2024-01-25' },
    { id: 3, name: 'Plant Care Dashboard', category: 3, techStack: ['React', 'TypeScript'], createdAt: '2024-02-01' },
    { id: 4, name: 'API Server', category: 4, techStack: ['Node.js', 'Express', 'MongoDB'], createdAt: '2024-02-05' },
    { id: 5, name: 'E-commerce Platform', category: 5, techStack: ['React', 'Redux', 'Node.js'], createdAt: '2024-02-10' },
    { id: 6, name: 'Weather App', category: 2, techStack: ['Flutter', 'Dart'], createdAt: '2024-02-15' },
    { id: 7, name: 'Task Manager', category: 6, techStack: ['Node.js', 'Express', 'MongoDB'], createdAt: '2024-02-20' }
];

let activities = [];
let charts = {};
let editingCategoryId = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateDashboard();
    updateParentOptions();
    setupIconSelector();
    renderCategories();
    initializeCharts();
});

// Tab switching
function showTab(tabName) {
    // Update active tab
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    // Show active content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
    });
    
    const activeTab = document.getElementById(tabName);
    activeTab.classList.add('active');
    activeTab.style.display = 'block';
    
    // Update data for specific tabs
    if (tabName === 'dashboard') {
        updateDashboard();
        updateDistributionChart();
    }
    if (tabName === 'categories') renderCategories();
    if (tabName === 'hierarchy') renderHierarchy();
    if (tabName === 'bulk') renderBulkOptions();
    if (tabName === 'analytics') updateAnalytics();
}

// Dashboard functions
function updateDashboard() {
    document.getElementById('totalCategories').textContent = categories.length;
    document.getElementById('duplicateCount').textContent = findDuplicateCategories().length;
    document.getElementById('projectCount').textContent = projects.length;
    document.getElementById('uncategorizedCount').textContent = projects.filter(p => !p.category).length;
    
    renderRecentActivities();
}

function renderRecentActivities() {
    const container = document.getElementById('recentActivities');
    const recentActivities = activities.slice(-5).reverse();
    
    if (recentActivities.length === 0) {
        container.innerHTML = '<div class="message">No recent activities</div>';
        return;
    }
    
    container.innerHTML = recentActivities.map(activity => `
        <div class="activity-item">
            <div>
                <strong>${activity.action}</strong>
                <div style="font-size: 0.85rem; color: #666;">${activity.details || ''}</div>
            </div>
            <small>${formatTime(activity.timestamp)}</small>
        </div>
    `).join('');
}

function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

// Category management
function setupIconSelector() {
    document.querySelectorAll('.icon-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.icon-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            document.getElementById('selectedIcon').value = this.dataset.icon;
        });
    });
}

function addCategory() {
    const name = document.getElementById('categoryName').value.trim();
    const parent = document.getElementById('parentCategory').value || null;
    const description = document.getElementById('categoryDescription').value.trim();
    const icon = document.getElementById('selectedIcon').value;

    if (!name) {
        showMessage('Please enter a category name', 'error');
        return;
    }

    // Check for duplicates (case insensitive)
    if (categories.some(cat => cat.name.toLowerCase() === name.toLowerCase())) {
        showMessage('Category already exists!', 'error');
        return;
    }

    const newCategory = {
        id: Date.now(),
        name,
        parent: parent ? parseInt(parent) : null,
        description,
        icon,
        projects: [],
        createdAt: new Date().toISOString()
    };

    categories.push(newCategory);
    addActivity(`Added category: ${name}`, `Created new category "${name}"`);
    
    // Clear form
    document.getElementById('categoryName').value = '';
    document.getElementById('categoryDescription').value = '';
    
    renderCategories();
    updateParentOptions();
    updateDashboard();
    showMessage('Category added successfully!', 'success');
}

function renderCategories() {
    const container = document.getElementById('categoryList');
    const searchTerm = document.getElementById('searchCategory')?.value.toLowerCase() || '';
    
    const filteredCategories = categories.filter(cat => 
        cat.name.toLowerCase().includes(searchTerm) ||
        cat.description.toLowerCase().includes(searchTerm)
    );
    
    if (filteredCategories.length === 0) {
        container.innerHTML = '<div class="message">No categories found</div>';
        return;
    }
    
    container.innerHTML = filteredCategories.map(category => {
        const parentName = category.parent ? categories.find(c => c.id === category.parent)?.name || 'None' : 'Root';
        const projectCount = projects.filter(p => p.category === category.id).length;
        
        return `
            <div class="category-card">
                <div class="category-header">
                    <div class="category-icon">
                        <i class="fas ${category.icon}"></i>
                    </div>
                    <div class="category-name">${category.name}</div>
                    <div class="category-actions">
                        <button class="btn btn-small btn-secondary" onclick="editCategory(${category.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-small btn-danger" onclick="deleteCategory(${category.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <p class="category-description">${category.description}</p>
                <div class="category-meta">
                    <div>
                        <small><i class="fas fa-folder"></i> Parent: ${parentName}</small>
                        <br>
                        <small><i class="fas fa-calendar"></i> Created: ${new Date(category.createdAt).toLocaleDateString()}</small>
                    </div>
                    <div class="category-projects">
                        <i class="fas fa-project-diagram"></i> ${projectCount} projects
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function searchCategories() {
    renderCategories();
}

function updateParentOptions() {
    const select = document.getElementById('parentCategory');
    select.innerHTML = '<option value="">None (Root Category)</option>' +
        categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
}

function deleteCategory(id) {
    if (!confirm('Are you sure you want to delete this category? Any sub-categories will also be deleted.')) {
        return;
    }

    const category = categories.find(c => c.id === id);
    if (!category) return;

    // Check if category has projects
    const categoryProjects = projects.filter(p => p.category === id);
    if (categoryProjects.length > 0) {
        if (!confirm(`This category has ${categoryProjects.length} projects. Do you want to proceed with deletion?`)) {
            return;
        }
    }

    // Delete category and its sub-categories
    const deleteCategoryAndChildren = (categoryId) => {
        // Find all child categories
        const children = categories.filter(cat => cat.parent === categoryId);
        
        // Recursively delete children
        children.forEach(child => deleteCategoryAndChildren(child.id));
        
        // Remove category
        categories = categories.filter(cat => cat.id !== categoryId);
        
        // Unassign projects from this category
        projects.forEach(project => {
            if (project.category === categoryId) {
                project.category = null;
            }
        });
    };

    deleteCategoryAndChildren(id);
    
    addActivity(`Deleted category: ${category.name}`, `Removed category and its sub-categories`);
    renderCategories();
    updateParentOptions();
    updateDashboard();
    showMessage('Category deleted successfully!', 'success');
}

// Edit category modal
function editCategory(id) {
    const category = categories.find(c => c.id === id);
    if (!category) return;

    editingCategoryId = id;
    
    document.getElementById('editCategoryName').value = category.name;
    document.getElementById('editCategoryDescription').value = category.description;
    
    // Update parent options (exclude self and children)
    const parentSelect = document.getElementById('editParentCategory');
    parentSelect.innerHTML = '<option value="">None (Root Category)</option>' +
        categories
            .filter(cat => cat.id !== id && !isChildOf(id, cat.id))
            .map(cat => `<option value="${cat.id}" ${category.parent === cat.id ? 'selected' : ''}>${cat.name}</option>`)
            .join('');
    
    document.getElementById('editModal').classList.add('show');
}

function isChildOf(parentId, childId) {
    const getChildrenIds = (id) => {
        const children = categories.filter(cat => cat.parent === id);
        return children.map(child => child.id).concat(
            children.flatMap(child => getChildrenIds(child.id))
        );
    };
    
    return getChildrenIds(parentId).includes(childId);
}

function saveCategory() {
    const name = document.getElementById('editCategoryName').value.trim();
    const description = document.getElementById('editCategoryDescription').value.trim();
    const parent = document.getElementById('editParentCategory').value || null;

    if (!name) {
        showMessage('Category name is required!', 'error');
        return;
    }

    const existingCategory = categories.find(cat => 
        cat.id !== editingCategoryId && 
        cat.name.toLowerCase() === name.toLowerCase()
    );
    
    if (existingCategory) {
        showMessage('Category name already exists!', 'error');
        return;
    }

    const categoryIndex = categories.findIndex(cat => cat.id === editingCategoryId);
    if (categoryIndex !== -1) {
        const oldCategory = categories[categoryIndex];
        categories[categoryIndex] = {
            ...categories[categoryIndex],
            name,
            description,
            parent: parent ? parseInt(parent) : null
        };
        
        addActivity(`Updated category: ${oldCategory.name}`, `Changed to "${name}"`);
        closeModal();
        renderCategories();
        updateParentOptions();
        showMessage('Category updated successfully!', 'success');
    }
}

function closeModal() {
    document.getElementById('editModal').classList.remove('show');
    editingCategoryId = null;
}

function clearForm() {
    document.getElementById('categoryName').value = '';
    document.getElementById('categoryDescription').value = '';
    document.querySelector('.icon-option.active').classList.remove('active');
    document.querySelector('.icon-option[data-icon="fa-folder"]').classList.add('active');
    document.getElementById('selectedIcon').value = 'fa-folder';
}

// Validation functions
function findDuplicates() {
    const duplicates = findDuplicateCategories();
    const container = document.getElementById('validationResults');
    
    if (duplicates.length === 0) {
        container.innerHTML = '<div class="message message-success">No duplicate categories found!</div>';
    } else {
        container.innerHTML = `
            <div class="message message-warning">
                <i class="fas fa-exclamation-triangle"></i>
                <div>
                    <h4>Duplicate Categories Found:</h4>
                    ${duplicates.map(dup => `
                        <p><strong>${dup.name}</strong> (${dup.count} occurrences)</p>
                    `).join('')}
                    <button class="btn btn-warning" onclick="mergeDuplicates()" style="margin-top: 10px;">
                        <i class="fas fa-compress-alt"></i> Merge All Duplicates
                    </button>
                </div>
            </div>
        `;
    }
}

function findDuplicateCategories() {
    const nameCount = {};
    categories.forEach(cat => {
        const name = cat.name.toLowerCase();
        nameCount[name] = (nameCount[name] || 0) + 1;
    });
    
    return Object.entries(nameCount)
        .filter(([name, count]) => count > 1)
        .map(([name, count]) => ({ name, count }));
}

function validateCategories() {
    const issues = [];
    
    // Check for empty names
    categories.forEach(cat => {
        if (!cat.name.trim()) {
            issues.push(`Category ${cat.id} has empty name`);
        }
    });
    
    // Check for invalid parent references
    categories.forEach(cat => {
        if (cat.parent && !categories.find(c => c.id === cat.parent)) {
            issues.push(`Category "${cat.name}" has invalid parent (ID: ${cat.parent})`);
        }
    });
    
    // Check for circular references
    categories.forEach(cat => {
        if (cat.parent && isCircular(cat.id, cat.parent)) {
            issues.push(`Circular reference detected in category "${cat.name}"`);
        }
    });

    const container = document.getElementById('validationResults');
    if (issues.length === 0) {
        container.innerHTML = '<div class="message message-success">All categories are valid!</div>';
    } else {
        container.innerHTML = `
            <div class="message message-warning">
                <i class="fas fa-exclamation-triangle"></i>
                <div>
                    <h4>Validation Issues:</h4>
                    ${issues.map(issue => `<p>${issue}</p>`).join('')}
                </div>
            </div>
        `;
    }
}

function isCircular(childId, parentId, visited = new Set()) {
    if (visited.has(childId)) return false;
    visited.add(childId);
    
    if (childId === parentId) return true;
    
    const child = categories.find(c => c.id === childId);
    if (!child || !child.parent) return false;
    
    return isCircular(child.parent, parentId, visited);
}

function mergeDuplicates() {
    const duplicates = findDuplicateCategories();
    if (duplicates.length === 0) {
        showMessage('No duplicates to merge!', 'warning');
        return;
    }

    let mergedCount = 0;
    duplicates.forEach(dup => {
        const duplicateCategories = categories.filter(cat => 
            cat.name.toLowerCase() === dup.name.toLowerCase()
        );
        
        if (duplicateCategories.length > 1) {
            const mainCategory = duplicateCategories[0];
            const toRemove = duplicateCategories.slice(1);
            
            // Move projects to main category
            toRemove.forEach(cat => {
                projects.forEach(project => {
                    if (project.category === cat.id) {
                        project.category = mainCategory.id;
                    }
                });
            });
            
            // Update child categories' parent references
            categories.forEach(cat => {
                if (toRemove.some(removedCat => removedCat.id === cat.parent)) {
                    cat.parent = mainCategory.id;
                }
            });
            
            // Remove duplicate categories
            categories = categories.filter(cat => !toRemove.includes(cat));
            mergedCount += toRemove.length;
        }
    });

    addActivity(`Merged ${mergedCount} duplicate categories`);
    renderCategories();
    updateParentOptions();
    updateDashboard();
    showMessage(`Merged ${mergedCount} duplicate categories successfully!`, 'success');
}

function cleanupEmptyCategories() {
    const emptyCategories = categories.filter(cat => 
        projects.filter(p => p.category === cat.id).length === 0 &&
        !categories.some(child => child.parent === cat.id)
    );
    
    if (emptyCategories.length === 0) {
        showMessage('No empty categories found!', 'info');
        return;
    }
    
    if (!confirm(`Delete ${emptyCategories.length} empty categories?`)) {
        return;
    }
    
    categories = categories.filter(cat => !emptyCategories.includes(cat));
    
    addActivity(`Cleaned up ${emptyCategories.length} empty categories`);
    renderCategories();
    updateParentOptions();
    updateDashboard();
    showMessage(`Cleaned up ${emptyCategories.length} empty categories!`, 'success');
}

// Hierarchy functions
function renderHierarchy() {
    const container = document.getElementById('hierarchyTree');
    const rootCategories = categories.filter(cat => !cat.parent);
    
    container.innerHTML = rootCategories.map(cat => renderCategoryTree(cat)).join('');
}

function renderCategoryTree(category, level = 0) {
    const children = categories.filter(cat => cat.parent === category.id);
    const projectCount = projects.filter(p => p.category === category.id).length;
    const hasChildren = children.length > 0;
    
    return `
        <div class="tree-node ${hasChildren ? 'has-children' : ''}" style="margin-left: ${level * 30}px;">
            ${hasChildren ? `
                <button class="tree-toggle" onclick="toggleTree(this)">
                    <i class="fas fa-chevron-right"></i>
                </button>
            ` : ''}
            <div class="category-card" style="margin-left: ${hasChildren ? '40px' : '0'};">
                <div class="category-header">
                    <div class="category-icon">
                        <i class="fas ${category.icon}"></i>
                    </div>
                    <div class="category-name">${category.name}</div>
                    <div class="category-projects">
                        ${projectCount} projects
                    </div>
                </div>
                <p class="category-description">${category.description}</p>
                <div class="category-actions">
                    <button class="btn btn-small btn-secondary" onclick="addSubCategory(${category.id})">
                        <i class="fas fa-plus"></i> Add Child
                    </button>
                </div>
            </div>
            <div class="tree-children" style="display: none;">
                ${children.map(child => renderCategoryTree(child, level + 1)).join('')}
            </div>
        </div>
    `;
}

function toggleTree(button) {
    const children = button.parentElement.querySelector('.tree-children');
    const icon = button.querySelector('i');
    
    if (children.style.display === 'none') {
        children.style.display = 'block';
        icon.classList.remove('fa-chevron-right');
        icon.classList.add('fa-chevron-down');
        button.parentElement.classList.add('active');
    } else {
        children.style.display = 'none';
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-right');
        button.parentElement.classList.remove('active');
    }
}

function expandAll() {
    document.querySelectorAll('.tree-toggle').forEach(button => {
        const children = button.parentElement.querySelector('.tree-children');
        const icon = button.querySelector('i');
        if (children.style.display === 'none') {
            children.style.display = 'block';
            icon.classList.remove('fa-chevron-right');
            icon.classList.add('fa-chevron-down');
            button.parentElement.classList.add('active');
        }
    });
}

function collapseAll() {
    document.querySelectorAll('.tree-toggle').forEach(button => {
        const children = button.parentElement.querySelector('.tree-children');
        const icon = button.querySelector('i');
        if (children.style.display === 'block') {
            children.style.display = 'none';
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-right');
            button.parentElement.classList.remove('active');
        }
    });
}

function addSubCategory(parentId) {
    const parent = categories.find(c => c.id === parentId);
    if (!parent) return;
    
    const name = prompt(`Enter name for sub-category under "${parent.name}":`);
    if (!name) return;
    
    const newCategory = {
        id: Date.now(),
        name,
        parent: parentId,
        description: `Sub-category of ${parent.name}`,
        icon: 'fa-folder',
        projects: [],
        createdAt: new Date().toISOString()
    };
    
    categories.push(newCategory);
    addActivity(`Added sub-category: ${name}`, `Under "${parent.name}"`);
    
    renderHierarchy();
    updateParentOptions();
    showMessage('Sub-category added successfully!', 'success');
}

// Bulk operations
function renderBulkOptions() {
    const projectSelect = document.getElementById('bulkProjects');
    const categorySelect = document.getElementById('bulkCategory');
    
    projectSelect.innerHTML = projects.map(project => 
        `<option value="${project.id}">${project.name} (${project.techStack.join(', ')})</option>`
    ).join('');
    
    categorySelect.innerHTML = categories.map(cat => 
        `<option value="${cat.id}">${cat.name}</option>`
    ).join('');
}

function selectAllProjects() {
    const select = document.getElementById('bulkProjects');
    Array.from(select.options).forEach(option => option.selected = true);
}

function deselectAllProjects() {
    const select = document.getElementById('bulkProjects');
    Array.from(select.options).forEach(option => option.selected = false);
}

function bulkAssignCategory() {
    const selectedProjects = Array.from(document.getElementById('bulkProjects').selectedOptions)
        .map(option => parseInt(option.value));
    const categoryId = parseInt(document.getElementById('bulkCategory').value);
    
    if (selectedProjects.length === 0 || !categoryId) {
        showMessage('Please select projects and category!', 'error');
        return;
    }

    const category = categories.find(c => c.id === categoryId);
    if (!category) {
        showMessage('Invalid category selected!', 'error');
        return;
    }

    let updatedCount = 0;
    selectedProjects.forEach(projectId => {
        const project = projects.find(p => p.id === projectId);
        if (project) {
            project.category = categoryId;
            updatedCount++;
        }
    });

    addActivity(`Bulk assigned ${updatedCount} projects`, `To category "${category.name}"`);
    showMessage(`Assigned ${updatedCount} projects to "${category.name}"!`, 'success');
    document.getElementById('bulkResults').innerHTML = `
        <div class="message message-success">
            Successfully assigned ${updatedCount} projects to "${category.name}"
        </div>
    `;
}

function autoCategorizeByTech() {
    const techCategoryMap = {
        'React': 'Frontend',
        'Vue': 'Frontend',
        'Angular': 'Frontend',
        'Node.js': 'Backend',
        'Express': 'Backend',
        'Python': 'Backend',
        'React Native': 'Mobile Apps',
        'Flutter': 'Mobile Apps',
        'Swift': 'Mobile Apps',
        'HTML': 'Web Development',
        'CSS': 'Web Development',
        'JavaScript': 'Web Development'
    };

    let categorized = 0;
    projects.forEach(project => {
        if (!project.category) {
            for (const tech of project.techStack) {
                if (techCategoryMap[tech]) {
                    const category = categories.find(cat => cat.name === techCategoryMap[tech]);
                    if (category) {
                        project.category = category.id;
                        categorized++;
                        break;
                    }
                }
            }
        }
    });

    addActivity(`Auto-categorized ${categorized} projects`, 'Based on tech stack');
    document.getElementById('bulkResults').innerHTML = `
        <div class="message message-success">
            Auto-categorized ${categorized} projects based on tech stack!
        </div>
    `;
    updateDashboard();
}

function suggestCategories() {
    const suggestions = [];
    const techStacks = [...new Set(projects.flatMap(p => p.techStack))];
    
    techStacks.forEach(tech => {
        if (!categories.some(cat => 
            cat.name.toLowerCase().includes(tech.toLowerCase()) ||
            cat.description.toLowerCase().includes(tech.toLowerCase())
        )) {
            suggestions.push(tech);
        }
    });

    if (suggestions.length === 0) {
        document.getElementById('bulkResults').innerHTML = `
            <div class="message message-info">
                No new category suggestions found
            </div>
        `;
        return;
    }

    document.getElementById('bulkResults').innerHTML = `
        <div class="message message-warning">
            <h4>Suggested Categories:</h4>
            <div style="margin-top: 10px;">
                ${suggestions.map(suggestion => `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; padding: 10px; background: #f8f9fa; border-radius: 6px;">
                        <span>${suggestion}</span>
                        <button class="btn btn-small btn-primary" onclick="quickAddCategory('${suggestion}')">
                            <i class="fas fa-plus"></i> Add
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function quickAddCategory(name) {
    const newCategory = {
        id: Date.now(),
        name,
        parent: null,
        description: `Auto-suggested category for ${name} projects`,
        icon: 'fa-code',
        projects: [],
        createdAt: new Date().toISOString()
    };

    categories.push(newCategory);
    addActivity(`Added suggested category: ${name}`);
    suggestCategories(); // Refresh suggestions
    updateParentOptions();
    showMessage(`Category "${name}" added!`, 'success');
}

function fixOrphanedProjects() {
    const orphanedProjects = projects.filter(project => 
        project.category && !categories.find(cat => cat.id === project.category)
    );
    
    if (orphanedProjects.length === 0) {
        document.getElementById('bulkResults').innerHTML = `
            <div class="message message-success">
                No orphaned projects found!
            </div>
        `;
        return;
    }
    
    orphanedProjects.forEach(project => {
        project.category = null;
    });
    
    addActivity(`Fixed ${orphanedProjects.length} orphaned projects`);
    document.getElementById('bulkResults').innerHTML = `
        <div class="message message-success">
            Fixed ${orphanedProjects.length} orphaned projects (removed invalid category references)
        </div>
    `;
    updateDashboard();
}

// Analytics functions
function updateAnalytics() {
    updateTopCategories();
    updateGrowthChart();
    updateProjectDistribution();
}

function updateTopCategories() {
    const container = document.getElementById('topCategories');
    const categoryStats = categories.map(cat => ({
        name: cat.name,
        projectCount: projects.filter(p => p.category === cat.id).length,
        subCategoryCount: categories.filter(c => c.parent === cat.id).length
    })).sort((a, b) => b.projectCount - a.projectCount).slice(0, 10);
    
    container.innerHTML = categoryStats.map(stat => `
        <div class="top-item">
            <div>
                <strong>${stat.name}</strong>
                <div style="font-size: 0.85rem; color: #666;">
                    ${stat.subCategoryCount} sub-categories
                </div>
            </div>
            <div class="category-projects">${stat.projectCount}</div>
        </div>
    `).join('');
}

function updateProjectDistribution() {
    const container = document.getElementById('projectDistribution');
    const categoryStats = categories.map(cat => ({
        name: cat.name,
        projectCount: projects.filter(p => p.category === cat.id).length
    })).sort((a, b) => b.projectCount - a.projectCount);
    
    const maxCount = Math.max(...categoryStats.map(stat => stat.projectCount), 1);
    
    container.innerHTML = categoryStats.map(stat => `
        <div class="distribution-item">
            <span style="min-width: 150px;">${stat.name}</span>
            <div class="distribution-bar">
                <div class="distribution-fill" style="width: ${(stat.projectCount / maxCount) * 100}%"></div>
            </div>
            <span style="font-weight: 600;">${stat.projectCount}</span>
        </div>
    `).join('');
}

// Chart functions
function initializeCharts() {
    // Distribution chart
    const distCtx = document.getElementById('distributionChart').getContext('2d');
    charts.distribution = new Chart(distCtx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    '#2e7d32', '#4caf50', '#8bc34a', '#cddc39',
                    '#ffeb3b', '#ffc107', '#ff9800', '#ff5722',
                    '#795548', '#607d8b'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                }
            }
        }
    });
    
    // Growth chart
    const growthCtx = document.getElementById('growthCanvas').getContext('2d');
    charts.growth = new Chart(growthCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Categories',
                data: [],
                borderColor: '#2e7d32',
                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
    
    updateDistributionChart();
    updateGrowthChart();
}

function updateDistributionChart() {
    if (!charts.distribution) return;
    
    const categoryCounts = categories.map(cat => 
        projects.filter(p => p.category === cat.id).length
    );
    
    charts.distribution.data.labels = categories.map(cat => cat.name);
    charts.distribution.data.datasets[0].data = categoryCounts;
    charts.distribution.update();
}

function updateGrowthChart() {
    if (!charts.growth) return;
    
    // Simulate growth data (in real app, you'd get this from your database)
    const dates = [];
    const counts = [];
    let count = 0;
    
    // Generate 12 months of data
    for (let i = 11; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        dates.push(date.toLocaleDateString('en-US', { month: 'short' }));
        
        // Simulate growth
        count += Math.floor(Math.random() * 3) + 1;
        counts.push(count);
    }
    
    charts.growth.data.labels = dates;
    charts.growth.data.datasets[0].data = counts;
    charts.growth.update();
}

function filterAnalytics() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    // In a real app, you would filter your data based on dates
    showMessage(`Filtering analytics from ${startDate} to ${endDate}`, 'info');
}

// Utility functions
function addActivity(action, details = '') {
    activities.push({
        action,
        details,
        timestamp: new Date().toISOString()
    });
    
    // Keep only last 50 activities
    if (activities.length > 50) {
        activities = activities.slice(-50);
    }
}

function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${getMessageIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    const container = document.getElementById('validationResults') || 
                      document.getElementById('bulkResults') ||
                      document.querySelector('.tab-content.active');
    
    if (container) {
        container.insertBefore(messageDiv, container.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

function getMessageIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'times-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Export/Import (for demo purposes)
function exportData() {
    const data = {
        categories,
        projects,
        activities,
        exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `category-management-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showMessage('Data exported successfully!', 'success');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (confirm('This will replace all current data. Continue?')) {
                categories = data.categories || [];
                projects = data.projects || [];
                activities = data.activities || [];
                
                updateDashboard();
                renderCategories();
                updateParentOptions();
                showMessage('Data imported successfully!', 'success');
                addActivity('Imported data from file');
            }
        } catch (error) {
            showMessage('Invalid file format!', 'error');
        }
    };
    reader.readAsText(file);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        showTab('categories');
    }
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        showTab('dashboard');
    }
    if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        exportData();
    }
});