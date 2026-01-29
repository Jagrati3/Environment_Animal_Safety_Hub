// Community Reporting System JavaScript
// Full-stack integration with server-side persistence

// API Configuration
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api'
  : '/api';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeFormValidation();
  setupFileUpload();
  loadSavedReports();
});

// Show report form for specific type
function showReportForm(reportType) {
  const formSection = document.getElementById('report-form-section');
  const formTitle = document.getElementById('form-title');
  const formDescription = document.getElementById('form-description');

  // Set form title and description based on report type
  const reportTypes = {
    cruelty: {
      title: 'Report Animal Cruelty',
      description: 'Report suspected animal abuse, neglect, or mistreatment. Provide detailed information to help authorities investigate.'
    },
    injury: {
      title: 'Report Injured Animal',
      description: 'Report animals that appear to be injured, bleeding, or in distress. Include location details for rescue teams.'
    },
    stray: {
      title: 'Report Stray Animal',
      description: 'Report lost pets or feral animals that may need assistance. Include detailed descriptions to help reunite pets with owners.'
    },
    hoarding: {
      title: 'Report Animal Hoarding',
      description: 'Report situations where animals are kept in overcrowded or unsanitary conditions. These cases require careful intervention.'
    },
    illegal: {
      title: 'Report Illegal Activities',
      description: 'Report illegal animal breeding, fighting, or wildlife trafficking. Include as much evidence as safely possible.'
    },
    environment: {
      title: 'Report Environmental Hazard',
      description: 'Report environmental conditions that threaten animal habitats or wildlife. Include photos if safe to do so.'
    }
  };

  // Store the selected report type for submission
  window.currentReportType = reportType;

  if (reportTypes[reportType]) {
    formTitle.textContent = reportTypes[reportType].title;
    formDescription.textContent = reportTypes[reportType].description;

    // Pre-select urgency level based on report type
    const urgencySelect = document.getElementById('urgency-level');
    if (['cruelty', 'injury', 'hoarding', 'illegal'].includes(reportType)) {
      urgencySelect.value = 'high';
    } else {
      urgencySelect.value = 'medium';
    }
  }

  // Set current date
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('incident-date').value = today;

  // Show form with animation
  formSection.style.display = 'block';
  formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Focus on first field
  document.getElementById('reporter-name').focus();
}

// Hide report form
function hideReportForm() {
  const formSection = document.getElementById('report-form-section');
  formSection.style.display = 'none';

  // Reset form
  document.getElementById('report-form').reset();
  window.currentReportType = null;

  // Clear file uploads
  const fileInput = document.getElementById('photo-upload');
  fileInput.value = '';
  updateFilePreview([]);
}

// Submit report to server
async function submitReport(event) {
  event.preventDefault();

  // Validate form
  if (!validateForm()) {
    return;
  }

  // Show loading state
  const submitBtn = document.querySelector('#report-form button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
  submitBtn.disabled = true;

  // Collect form data for API
  const reportData = {
    incidentType: window.currentReportType || 'environment',
    reporter: {
      name: document.getElementById('reporter-name').value || 'Anonymous',
      email: document.getElementById('reporter-email').value || '',
      phone: document.getElementById('reporter-phone').value || '',
      contactPreference: document.getElementById('contact-preference').value || 'none'
    },
    location: {
      address: document.getElementById('incident-address').value,
      date: document.getElementById('incident-date').value,
      time: document.getElementById('incident-time').value || '',
      description: document.getElementById('location-description').value || ''
    },
    animals: {
      type: document.getElementById('animal-type').value,
      count: parseInt(document.getElementById('animal-count').value) || 1,
      description: document.getElementById('animal-description').value || ''
    },
    incident: {
      description: document.getElementById('incident-description').value,
      urgency: document.getElementById('urgency-level').value || 'medium',
      ongoing: document.getElementById('ongoing-situation').value || 'recent',
      additionalInfo: document.getElementById('additional-info').value || ''
    },
    evidence: {
      photos: [],
      videos: []
    }
  };

  try {
    // Submit to server
    const response = await fetch(`${API_BASE_URL}/reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reportData)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      // Save locally as backup
      saveReportLocally({
        ...reportData,
        serverId: result.data.id,
        status: result.data.status,
        createdAt: result.data.createdAt
      });

      // Show success message
      showSuccessMessage(result.data.id);

      // Hide form
      hideReportForm();
    } else {
      // Server returned an error
      throw new Error(result.message || 'Failed to submit report');
    }

  } catch (error) {
    console.error('Error submitting report:', error);
    
    // Check if it's a network error (server not available)
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      // Fallback to local storage when server is unavailable
      const localId = Date.now();
      const localReport = {
        ...reportData,
        id: localId,
        timestamp: new Date().toISOString(),
        status: 'pending_sync',
        syncedToServer: false
      };
      
      saveReportLocally(localReport);
      showOfflineSuccessMessage(localId);
      hideReportForm();
    } else {
      showErrorMessage(error.message || 'Failed to submit report. Please try again.');
    }
  } finally {
    // Reset button state
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
  }
}

// Validate form
function validateForm() {
  const requiredFields = [
    'incident-address',
    'incident-date',
    'animal-type',
    'incident-description'
  ];

  let isValid = true;
  let firstInvalidField = null;

  requiredFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();

    if (!value) {
      field.style.borderColor = '#e74c3c';
      if (!firstInvalidField) {
        firstInvalidField = field;
      }
      isValid = false;
    } else {
      field.style.borderColor = '#ddd';
    }
  });

  // Validate email if provided
  const emailField = document.getElementById('reporter-email');
  if (emailField.value && !isValidEmail(emailField.value)) {
    emailField.style.borderColor = '#e74c3c';
    if (!firstInvalidField) {
      firstInvalidField = emailField;
    }
    isValid = false;
  }

  if (!isValid) {
    firstInvalidField.focus();
    showErrorMessage('Please fill in all required fields marked with *');
    return false;
  }

  return true;
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Save report locally (backup/offline support)
function saveReportLocally(reportData) {
  const reports = JSON.parse(localStorage.getItem('animalReports') || '[]');
  reports.push({
    ...reportData,
    localTimestamp: new Date().toISOString()
  });
  localStorage.setItem('animalReports', JSON.stringify(reports));
}

// Load saved reports
function loadSavedReports() {
  const reports = JSON.parse(localStorage.getItem('animalReports') || '[]');
  console.log('Saved reports:', reports.length);
  
  // Try to sync any pending reports
  syncPendingReports();
}

// Sync pending reports when online
async function syncPendingReports() {
  const reports = JSON.parse(localStorage.getItem('animalReports') || '[]');
  const pendingReports = reports.filter(r => r.status === 'pending_sync' && !r.syncedToServer);

  for (const report of pendingReports) {
    try {
      const response = await fetch(`${API_BASE_URL}/reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(report)
      });

      if (response.ok) {
        const result = await response.json();
        // Update local record
        report.serverId = result.data.id;
        report.syncedToServer = true;
        report.status = 'submitted';
      }
    } catch (error) {
      console.log('Could not sync report:', report.id);
    }
  }

  // Save updated reports
  localStorage.setItem('animalReports', JSON.stringify(reports));
}

// Show success message
function showSuccessMessage(reportId) {
  const message = document.createElement('div');
  message.className = 'success-message';
  message.innerHTML = `
    <div class="success-content">
      <i class="fas fa-check-circle"></i>
      <h3>Report Submitted Successfully!</h3>
      <p>Your report has been submitted with ID:</p>
      <p class="report-id"><strong>${reportId}</strong></p>
      <p>You can use this ID to track your report status.</p>
      <p class="contact-note">You will receive updates via your preferred contact method.</p>
      <button onclick="this.parentElement.parentElement.remove()">Close</button>
    </div>
  `;

  message.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  `;

  const successContent = message.querySelector('.success-content');
  successContent.style.cssText = `
    background: white;
    padding: 40px;
    border-radius: 12px;
    text-align: center;
    max-width: 500px;
    margin: 20px;
  `;

  successContent.querySelector('i').style.cssText = `
    font-size: 4rem;
    color: #27ae60;
    margin-bottom: 20px;
  `;

  successContent.querySelector('h3').style.cssText = `
    color: #2c3e50;
    margin-bottom: 15px;
    font-size: 1.5rem;
  `;

  const reportIdEl = successContent.querySelector('.report-id');
  if (reportIdEl) {
    reportIdEl.style.cssText = `
      background: #f8f9fa;
      padding: 10px 20px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 0.9rem;
      word-break: break-all;
    `;
  }

  successContent.querySelector('button').style.cssText = `
    background: #27ae60;
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 20px;
  `;

  document.body.appendChild(message);
}

// Show offline success message
function showOfflineSuccessMessage(localId) {
  const message = document.createElement('div');
  message.className = 'success-message';
  message.innerHTML = `
    <div class="success-content">
      <i class="fas fa-cloud-upload-alt"></i>
      <h3>Report Saved Locally</h3>
      <p>Your report has been saved locally with ID: <strong>${localId}</strong></p>
      <p class="offline-note">The server is currently unavailable. Your report will be automatically submitted when the connection is restored.</p>
      <button onclick="this.parentElement.parentElement.remove()">Close</button>
    </div>
  `;

  message.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  `;

  const successContent = message.querySelector('.success-content');
  successContent.style.cssText = `
    background: white;
    padding: 40px;
    border-radius: 12px;
    text-align: center;
    max-width: 500px;
    margin: 20px;
  `;

  successContent.querySelector('i').style.cssText = `
    font-size: 4rem;
    color: #f39c12;
    margin-bottom: 20px;
  `;

  successContent.querySelector('h3').style.cssText = `
    color: #2c3e50;
    margin-bottom: 15px;
    font-size: 1.5rem;
  `;

  const offlineNote = successContent.querySelector('.offline-note');
  if (offlineNote) {
    offlineNote.style.cssText = `
      background: #fff3cd;
      padding: 15px;
      border-radius: 8px;
      color: #856404;
      margin: 15px 0;
    `;
  }

  successContent.querySelector('button').style.cssText = `
    background: #f39c12;
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 20px;
  `;

  document.body.appendChild(message);
}

// Show error message
function showErrorMessage(message) {
  // Remove existing error messages
  const existingErrors = document.querySelectorAll('.error-message');
  existingErrors.forEach(el => el.remove());

  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.innerHTML = `
    <i class="fas fa-exclamation-triangle"></i>
    <span>${message}</span>
  `;

  errorDiv.style.cssText = `
    background: #e74c3c;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
  `;

  const form = document.getElementById('report-form');
  form.insertBefore(errorDiv, form.firstChild);

  // Remove after 5 seconds
  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}

// Initialize form validation
function initializeFormValidation() {
  // Real-time validation
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.hasAttribute('required') && !this.value.trim()) {
        this.style.borderColor = '#e74c3c';
      } else {
        this.style.borderColor = '#ddd';
      }
    });

    input.addEventListener('input', function() {
      if (this.style.borderColor === 'rgb(231, 76, 60)') {
        this.style.borderColor = '#ddd';
      }
    });
  });

  // Phone number formatting
  const phoneInput = document.getElementById('reporter-phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 10) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      }
      e.target.value = value;
    });
  }
}

// File upload handling
function setupFileUpload() {
  const fileInput = document.getElementById('photo-upload');
  if (!fileInput) return;

  const maxFileSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4', 'video/quicktime'];

  fileInput.addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    let validFiles = [];
    let errors = [];

    files.forEach(file => {
      if (file.size > maxFileSize) {
        errors.push(`${file.name}: File too large (max 10MB)`);
      } else if (!allowedTypes.includes(file.type)) {
        errors.push(`${file.name}: Invalid file type`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      showErrorMessage('File upload errors:<br>' + errors.join('<br>'));
    }

    if (validFiles.length > 5) {
      showErrorMessage('Maximum 5 files allowed');
      validFiles = validFiles.slice(0, 5);
    }

    updateFilePreview(validFiles);
  });
}

// Update file preview
function updateFilePreview(files) {
  // Remove existing preview
  const existingPreview = document.querySelector('.file-preview');
  if (existingPreview) {
    existingPreview.remove();
  }

  if (files.length === 0) return;

  const previewDiv = document.createElement('div');
  previewDiv.className = 'file-preview';
  previewDiv.innerHTML = `
    <h4>Selected Files (${files.length})</h4>
    <div class="file-list">
      ${files.map(file => `
        <div class="file-item">
          <i class="fas ${file.type.startsWith('image/') ? 'fa-image' : 'fa-video'}"></i>
          <span>${file.name}</span>
          <span>(${formatFileSize(file.size)})</span>
        </div>
      `).join('')}
    </div>
  `;

  previewDiv.style.cssText = `
    margin-top: 15px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #ddd;
  `;

  const fileInput = document.getElementById('photo-upload');
  fileInput.parentElement.appendChild(previewDiv);
}

// Format file size
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Emergency contact information
const emergencyContacts = {
  national: {
    cruelty: '1-877-267-3653',
    poison: '(888) 426-4435',
    wildlife: '1-800-HELP-WILD'
  },
  local: {
    // This would be populated based on user's location
    animalControl: 'Local animal control number',
    emergencyVet: 'Emergency veterinary clinic'
  }
};

// Add click handlers for emergency banner
document.addEventListener('DOMContentLoaded', function() {
  const emergencyNumbers = document.querySelectorAll('.emergency-numbers span');
  emergencyNumbers.forEach(span => {
    span.style.cursor = 'pointer';
    span.addEventListener('click', function() {
      const number = this.textContent.match(/[\d\-\(\)\s]+/);
      if (number) {
        alert(`Calling: ${number[0].trim()}`);
      }
    });
  });
});

// Add form enhancement features
document.addEventListener('DOMContentLoaded', function() {
  // Add keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      const submitBtn = document.querySelector('#report-form button[type="submit"]');
      if (submitBtn && submitBtn.offsetParent !== null) {
        submitBtn.click();
      }
    }

    // Escape to close form
    if (e.key === 'Escape') {
      const formSection = document.getElementById('report-form-section');
      if (formSection && formSection.style.display === 'block') {
        hideReportForm();
      }
    }
  });

  // Add form progress indicator
  addFormProgressIndicator();
});

// Add form progress indicator
function addFormProgressIndicator() {
  const formSections = document.querySelectorAll('.form-section');
  if (formSections.length === 0) return;

  const totalSections = formSections.length;
  let completedSections = 0;

  const progressDiv = document.createElement('div');
  progressDiv.className = 'form-progress';
  progressDiv.innerHTML = `
    <div class="progress-text">Form Progress: <span id="progress-count">0</span>/${totalSections} sections</div>
    <div class="progress-bar">
      <div class="progress-fill" id="progress-fill"></div>
    </div>
  `;

  progressDiv.style.cssText = `
    background: white;
    padding: 15px 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  `;

  const progressBar = progressDiv.querySelector('.progress-bar');
  progressBar.style.cssText = `
    width: 100%;
    height: 8px;
    background: #e9ecef;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 10px;
  `;

  const progressFill = progressDiv.querySelector('.progress-fill');
  progressFill.style.cssText = `
    height: 100%;
    background: linear-gradient(90deg, #3498db, #2980b9);
    width: 0%;
    transition: width 0.3s ease;
  `;

  const formContainer = document.querySelector('.form-container');
  if (formContainer) {
    formContainer.insertBefore(progressDiv, formContainer.firstChild);

    // Update progress when form fields change
    const inputs = document.querySelectorAll('#report-form input, #report-form select, #report-form textarea');
    inputs.forEach(input => {
      input.addEventListener('input', updateFormProgress);
      input.addEventListener('change', updateFormProgress);
    });
  }

  function updateFormProgress() {
    completedSections = 0;

    formSections.forEach(section => {
      const sectionInputs = section.querySelectorAll('input[required], select[required], textarea[required]');
      const sectionCompleted = Array.from(sectionInputs).every(input => input.value.trim() !== '');

      if (sectionCompleted) {
        completedSections++;
      }
    });

    const progressPercent = (completedSections / totalSections) * 100;
    const progressCount = document.getElementById('progress-count');
    const progressFillEl = document.getElementById('progress-fill');
    if (progressCount) progressCount.textContent = completedSections;
    if (progressFillEl) progressFillEl.style.width = progressPercent + '%';
  }
}

// Track report status
async function trackReportStatus(reportId) {
  try {
    const response = await fetch(`${API_BASE_URL}/reports/${reportId}/status`);
    const result = await response.json();

    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Error tracking report:', error);
    return null;
  }
}

// Export functions for potential use in other scripts
window.communityReporting = {
  showReportForm,
  hideReportForm,
  submitReport,
  trackReportStatus,
  emergencyContacts
};
