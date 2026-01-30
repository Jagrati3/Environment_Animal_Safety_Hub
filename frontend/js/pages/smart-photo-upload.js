// Smart Photo Upload - JavaScript
let currentPhoto = null;
let cameraStream = null;

// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const previewSection = document.getElementById('previewSection');
const previewImage = document.getElementById('previewImage');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const analyzeButton = document.getElementById('analyzeButton');
const removeButton = document.getElementById('removeButton');
const analysisPanel = document.getElementById('analysisPanel');
const closeAnalysis = document.getElementById('closeAnalysis');

// Camera Elements
const cameraTab = document.getElementById('cameraTab');
const cameraStream_el = document.getElementById('cameraStream');
const cameraCanvas = document.getElementById('cameraCanvas');
const startCameraButton = document.getElementById('startCameraButton');
const captureButton = document.getElementById('captureButton');
const stopCameraButton = document.getElementById('stopCameraButton');
const capturedImage = document.getElementById('capturedImage');
const cameraPreview = document.getElementById('cameraPreview');
const usePhotoButton = document.getElementById('usePhotoButton');
const retakeButton = document.getElementById('retakeButton');

// Gallery
const galleryGrid = document.getElementById('galleryGrid');
const galleryTab = document.getElementById('galleryTab');

// Tab buttons
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// ========================
// Tab Switching
// ========================
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.dataset.tab;
        
        // Hide all tabs
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Deactivate all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Show selected tab
        document.getElementById(tabName + 'Tab').classList.add('active');
        button.classList.add('active');
    });
});

// ========================
// Upload Area
// ========================
uploadArea.addEventListener('click', () => fileInput.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileSelect(files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFileSelect(e.target.files[0]);
    }
});

function handleFileSelect(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
    }
    
    currentPhoto = file;
    
    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        fileName.textContent = file.name;
        fileSize.textContent = (file.size / 1024 / 1024).toFixed(2) + ' MB';
        
        uploadArea.style.display = 'none';
        previewSection.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

removeButton.addEventListener('click', () => {
    currentPhoto = null;
    previewImage.src = '';
    fileInput.value = '';
    uploadArea.style.display = 'block';
    previewSection.style.display = 'none';
});

// ========================
// AI Analysis
// ========================
analyzeButton.addEventListener('click', performAnalysis);
document.getElementById('retryAnalysisButton').addEventListener('click', performAnalysis);

async function performAnalysis() {
    if (!currentPhoto) return;
    
    analysisPanel.style.display = 'block';
    document.getElementById('loadingState').style.display = 'flex';
    document.getElementById('resultsState').style.display = 'none';
    document.getElementById('errorState').style.display = 'none';
    
    try {
        // Create FormData to send file to backend
        const formData = new FormData();
        formData.append('photo', currentPhoto);
        
        // Call backend API
        const response = await fetch('/api/photos/analyze', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Analysis failed');
        }
        
        const result = await response.json();
        
        if (result.success) {
            displayAnalysisResults(result);
            // Save to gallery
            saveToGallery(previewImage.src);
        } else {
            showError(result.message || 'Failed to analyze photo');
        }
        
    } catch (error) {
        console.error('Error:', error);
        showError(error.message || 'Failed to analyze photo. Please try again.');
    }
}

function displayAnalysisResults(result) {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('resultsState').style.display = 'block';
    
    // Display Species
    const speciesCards = document.getElementById('speciesCards');
    speciesCards.innerHTML = result.species.map(species => `
        <div class="species-card">
            <div class="species-name">${species.name}</div>
            <div class="species-confidence">
                <div class="confidence-bar">
                    <div class="confidence-fill" style="width: ${species.confidence}%"></div>
                </div>
                <div class="confidence-text">${species.confidence}%</div>
            </div>
        </div>
    `).join('');
    
    // Display Behavior
    const behaviorContent = document.getElementById('behaviorContent');
    behaviorContent.innerHTML = result.behavior.map(item => `
        <div class="behavior-item">
            <div class="item-label">${item.type}</div>
            <div class="item-value">${item.description}</div>
        </div>
    `).join('');
    
    // Display Environment Context
    const contextContent = document.getElementById('contextContent');
    contextContent.innerHTML = result.environment.map(item => `
        <div class="context-item">
            <div class="item-label">${item.type}</div>
            <div class="item-value">${item.value}</div>
        </div>
    `).join('');
    
    // Display Conservation Status
    const conservationContent = document.getElementById('conservationContent');
    conservationContent.innerHTML = result.conservation.map(item => `
        <div class="conservation-item">
            <div class="item-label">${item.status}</div>
            <div class="item-value">${item.description}</div>
        </div>
    `).join('');
}

function showError(message) {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('resultsState').style.display = 'none';
    document.getElementById('errorState').style.display = 'block';
    document.getElementById('errorMessage').textContent = message;
}

closeAnalysis.addEventListener('click', () => {
    analysisPanel.style.display = 'none';
});

// ========================
// Camera Functions
// ========================
startCameraButton.addEventListener('click', startCamera);
stopCameraButton.addEventListener('click', stopCamera);
captureButton.addEventListener('click', capturePhoto);
usePhotoButton.addEventListener('click', usePhoto);
retakeButton.addEventListener('click', retakePhoto);

async function startCamera() {
    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
        });
        
        cameraStream_el.srcObject = cameraStream;
        startCameraButton.style.display = 'none';
        captureButton.style.display = 'flex';
        stopCameraButton.style.display = 'flex';
        cameraPreview.style.display = 'none';
    } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Unable to access camera. Please check permissions.');
    }
}

function stopCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
    }
    cameraStream_el.srcObject = null;
    cameraStream = null;
    
    startCameraButton.style.display = 'flex';
    captureButton.style.display = 'none';
    stopCameraButton.style.display = 'none';
    cameraPreview.style.display = 'none';
}

function capturePhoto() {
    const context = cameraCanvas.getContext('2d');
    cameraCanvas.width = cameraStream_el.videoWidth;
    cameraCanvas.height = cameraStream_el.videoHeight;
    
    context.drawImage(cameraStream_el, 0, 0);
    capturedImage.src = cameraCanvas.toDataURL('image/jpeg');
    
    cameraPreview.style.display = 'block';
    captureButton.style.display = 'none';
}

function usePhoto() {
    // Convert canvas to blob
    cameraCanvas.toBlob(blob => {
        currentPhoto = new File([blob], 'captured-photo.jpg', { type: 'image/jpeg' });
        previewImage.src = cameraCanvas.toDataURL('image/jpeg');
        fileName.textContent = 'captured-photo.jpg';
        fileSize.textContent = (blob.size / 1024 / 1024).toFixed(2) + ' MB';
        
        uploadArea.style.display = 'none';
        previewSection.style.display = 'block';
        
        // Switch to upload tab
        document.querySelector('[data-tab="upload"]').click();
        stopCamera();
    }, 'image/jpeg', 0.95);
}

function retakePhoto() {
    capturedImage.src = '';
    cameraPreview.style.display = 'none';
    captureButton.style.display = 'flex';
    cameraStream_el.play();
}

// ========================
// Gallery Management
// ========================
function saveToGallery(photoData) {
    let gallery = JSON.parse(localStorage.getItem('photoGallery') || '[]');
    gallery.unshift({
        id: Date.now(),
        image: photoData,
        timestamp: new Date().toLocaleString()
    });
    localStorage.setItem('photoGallery', JSON.stringify(gallery));
    loadGallery();
}

function loadGallery() {
    const gallery = JSON.parse(localStorage.getItem('photoGallery') || '[]');
    
    if (gallery.length === 0) {
        galleryGrid.innerHTML = `
            <div class="gallery-empty">
                <i class="fa-solid fa-image"></i>
                <p>No photos uploaded yet</p>
            </div>
        `;
        return;
    }
    
    galleryGrid.innerHTML = gallery.map(item => `
        <div class="gallery-item" onclick="selectPhotoFromGallery(${item.id})">
            <img src="${item.image}" alt="Gallery photo">
            <div class="gallery-item-overlay">
                <i class="fa-solid fa-eye"></i>
            </div>
        </div>
    `).join('');
}

function selectPhotoFromGallery(id) {
    const gallery = JSON.parse(localStorage.getItem('photoGallery') || '[]');
    const photo = gallery.find(item => item.id === id);
    
    if (photo) {
        previewImage.src = photo.image;
        fileName.textContent = `Photo from ${photo.timestamp}`;
        fileSize.textContent = 'From Gallery';
        
        uploadArea.style.display = 'none';
        previewSection.style.display = 'block';
        
        // Switch to upload tab
        document.querySelector('[data-tab="upload"]').click();
        
        // Convert data URL back to File for analysis
        fetch(photo.image)
            .then(res => res.blob())
            .then(blob => {
                currentPhoto = new File([blob], 'gallery-photo.jpg', { type: 'image/jpeg' });
            });
    }
}

// Load gallery on page load
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
});

// ========================
// Download Report
// ========================
document.getElementById('downloadReportButton').addEventListener('click', downloadReport);

function downloadReport() {
    const report = generateReport();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(report));
    element.setAttribute('download', 'wildlife-analysis-report.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function generateReport() {
    const timestamp = new Date().toLocaleString();
    return `
WILDLIFE PHOTO ANALYSIS REPORT
================================
Generated: ${timestamp}

[Analysis Data]

This report contains the AI analysis of your uploaded wildlife photo.
    `;
}

// ========================
// Share Analysis
// ========================
document.getElementById('shareButton').addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({
            title: 'Wildlife Analysis Report',
            text: 'Check out my wildlife photo analysis!',
            url: window.location.href
        });
    } else {
        alert('Sharing not supported on this device');
    }
});

// ========================
// Contribute to Database
// ========================
document.getElementById('contributeButton').addEventListener('click', () => {
    alert('Thank you for contributing! Your photo and analysis have been added to our wildlife database.');
});

// ========================
// Counter Animation
// ========================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, 30);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger animation when page loads
document.addEventListener('DOMContentLoaded', animateCounters);

// ========================
// Mock API Response for Testing
// ========================
// Uncomment to use mock data instead of real API
/*
window.mockAnalysisResponse = {
    species: [
        { name: 'Bengal Tiger', confidence: 95 },
        { name: 'Striped Cat', confidence: 87 }
    ],
    behavior: [
        { type: 'Activity', description: 'Resting in shade' },
        { type: 'Temperament', description: 'Alert but calm' }
    ],
    environment: [
        { type: 'Habitat', value: 'Tropical Forest' },
        { type: 'Weather', value: 'Cloudy' }
    ],
    conservation: [
        { status: 'Endangered', description: 'Population declining' }
    ]
};
*/
