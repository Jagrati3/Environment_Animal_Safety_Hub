/**
 * AR Climate Visualizer - "Future Lens"
 * WebAR Implementation for Climate Change Visualization
 * 
 * Features:
 * - Camera-based AR experience
 * - Multiple climate effect filters (Sea Level Rise, Smog, Deforestation, Heat)
 * - Real-time effect overlays
 * - Screenshot capture and social sharing
 */

class ARClimateVisualizer {
    constructor() {
        this.currentFilter = 'sea-level';
        this.filterIntensity = 50;
        this.isARActive = false;
        this.stream = null;
        this.animationFrame = null;

        // Filter settings
        this.filterSettings = {
            'sea-level': { level: 1, maxLevel: 3 },
            'smog': { level: 200, maxLevel: 500 },
            'deforestation': { level: 50, maxLevel: 100 },
            'heat': { level: 2, maxLevel: 4 }
        };

        this.initializeElements();
        this.bindEvents();
        this.initializeParticles();
    }

    initializeElements() {
        // Modal elements
        this.arModal = document.getElementById('arModal');
        this.arVideo = document.getElementById('arVideo');
        this.arCanvas = document.getElementById('arCanvas');
        this.arLoading = document.getElementById('arLoading');
        this.arPermissionDenied = document.getElementById('arPermissionDenied');

        // Controls
        this.filterIndicator = document.getElementById('filterIndicator');
        this.intensitySlider = document.getElementById('intensitySlider');

        // Buttons
        this.launchARBtn = document.getElementById('launchARBtn');
        this.closeARBtn = document.getElementById('closeARModal');
        this.captureBtn = document.getElementById('captureBtn');
        this.switchFilterBtn = document.getElementById('switchFilterBtn');
        this.shareBtn = document.getElementById('shareBtn');
        this.retryPermissionBtn = document.getElementById('retryPermission');

        // Filter cards and sliders
        this.filterCards = document.querySelectorAll('.filter-card');
        this.filterSelectBtns = document.querySelectorAll('.filter-select-btn');

        // Filter control sliders
        this.seaLevelSlider = document.getElementById('seaLevelSlider');
        this.smogLevelSlider = document.getElementById('smogLevelSlider');
        this.deforestationSlider = document.getElementById('deforestationSlider');
        this.heatSlider = document.getElementById('heatSlider');

        // Info panel
        this.scenarioYear = document.getElementById('scenarioYear');
        this.globalImpact = document.getElementById('globalImpact');
        this.actionNeeded = document.getElementById('actionNeeded');
    }

    bindEvents() {
        // Launch AR button
        if (this.launchARBtn) {
            this.launchARBtn.addEventListener('click', () => this.launchAR());
        }

        // Close modal
        if (this.closeARBtn) {
            this.closeARBtn.addEventListener('click', () => this.closeAR());
        }

        // Retry permission
        if (this.retryPermissionBtn) {
            this.retryPermissionBtn.addEventListener('click', () => this.launchAR());
        }

        // Intensity slider
        if (this.intensitySlider) {
            this.intensitySlider.addEventListener('input', (e) => {
                this.filterIntensity = parseInt(e.target.value);
            });
        }

        // Capture screenshot
        if (this.captureBtn) {
            this.captureBtn.addEventListener('click', () => this.captureScreenshot());
        }

        // Switch filter in AR mode
        if (this.switchFilterBtn) {
            this.switchFilterBtn.addEventListener('click', () => this.cycleFilters());
        }

        // Share button
        if (this.shareBtn) {
            this.shareBtn.addEventListener('click', () => this.shareExperience());
        }

        // Filter card selection
        this.filterSelectBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const filter = btn.dataset.filter;
                this.selectFilter(filter);
            });
        });

        // Filter card click
        this.filterCards.forEach(card => {
            card.addEventListener('click', () => {
                const filter = card.dataset.filter;
                this.selectFilter(filter);
            });
        });

        // Individual filter sliders
        if (this.seaLevelSlider) {
            this.seaLevelSlider.addEventListener('input', (e) => {
                this.filterSettings['sea-level'].level = parseInt(e.target.value);
                document.getElementById('seaLevelValue').textContent = e.target.value;
            });
        }

        if (this.smogLevelSlider) {
            this.smogLevelSlider.addEventListener('input', (e) => {
                this.filterSettings['smog'].level = parseInt(e.target.value);
                document.getElementById('smogLevelValue').textContent = e.target.value;
            });
        }

        if (this.deforestationSlider) {
            this.deforestationSlider.addEventListener('input', (e) => {
                this.filterSettings['deforestation'].level = parseInt(e.target.value);
                document.getElementById('deforestationValue').textContent = e.target.value;
            });
        }

        if (this.heatSlider) {
            this.heatSlider.addEventListener('input', (e) => {
                this.filterSettings['heat'].level = parseInt(e.target.value);
                document.getElementById('heatValue').textContent = e.target.value;
            });
        }

        // Social share buttons
        this.bindSocialShareButtons();

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isARActive) {
                this.closeAR();
            }
        });
    }

    selectFilter(filter) {
        this.currentFilter = filter;

        // Update card selection states
        this.filterCards.forEach(card => {
            if (card.dataset.filter === filter) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });

        // Update filter indicator if AR is active
        this.updateFilterIndicator();

        // Show notification
        this.showNotification(`Selected: ${this.getFilterName(filter)}`);
    }

    getFilterName(filter) {
        const names = {
            'sea-level': 'Sea Level Rise',
            'smog': 'Air Pollution & Smog',
            'deforestation': 'Deforestation',
            'heat': 'Extreme Heat'
        };
        return names[filter] || filter;
    }

    getFilterIcon(filter) {
        const icons = {
            'sea-level': 'fa-water',
            'smog': 'fa-smog',
            'deforestation': 'fa-tree',
            'heat': 'fa-temperature-high'
        };
        return icons[filter] || 'fa-filter';
    }

    updateFilterIndicator() {
        if (!this.filterIndicator) return;

        const icon = this.getFilterIcon(this.currentFilter);
        const settings = this.filterSettings[this.currentFilter];
        let label = '';

        switch (this.currentFilter) {
            case 'sea-level':
                label = `Sea Level Rise: ${settings.level}m`;
                break;
            case 'smog':
                label = `AQI Level: ${settings.level}`;
                break;
            case 'deforestation':
                label = `Forest Loss: ${settings.level}%`;
                break;
            case 'heat':
                label = `Temperature: +${settings.level}°C`;
                break;
        }

        this.filterIndicator.innerHTML = `
      <i class="fas ${icon}"></i>
      <span>${label}</span>
    `;

        // Update info panel
        this.updateInfoPanel();
    }

    updateInfoPanel() {
        if (!this.scenarioYear) return;

        const settings = this.filterSettings[this.currentFilter];
        let year, impact, action;

        switch (this.currentFilter) {
            case 'sea-level':
                year = 2050 + (settings.level * 20);
                impact = settings.level >= 2 ? 'Critical' : 'Severe';
                action = settings.level >= 2 ? 'Immediate' : 'Urgent';
                break;
            case 'smog':
                year = settings.level > 300 ? 2040 : 2060;
                impact = settings.level > 300 ? 'Hazardous' : 'Dangerous';
                action = settings.level > 300 ? 'Immediate' : 'Urgent';
                break;
            case 'deforestation':
                year = 2030 + settings.level;
                impact = settings.level >= 75 ? 'Catastrophic' : 'Severe';
                action = settings.level >= 75 ? 'Immediate' : 'Urgent';
                break;
            case 'heat':
                year = 2040 + (settings.level * 15);
                impact = settings.level >= 3 ? 'Extreme' : 'Severe';
                action = settings.level >= 3 ? 'Immediate' : 'Urgent';
                break;
        }

        this.scenarioYear.textContent = year;
        this.globalImpact.textContent = impact;
        this.globalImpact.className = `info-value ${impact === 'Critical' || impact === 'Catastrophic' || impact === 'Extreme' || impact === 'Hazardous' ? 'critical' : 'warning'}`;
        this.actionNeeded.textContent = action;
        this.actionNeeded.className = `info-value ${action === 'Immediate' ? 'critical' : 'warning'}`;
    }

    async launchAR() {
        this.arModal.classList.add('active');
        this.arLoading.style.display = 'flex';
        this.arPermissionDenied.style.display = 'none';

        try {
            // Request camera access
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment', // Use back camera on mobile
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                }
            });

            this.arVideo.srcObject = this.stream;
            await this.arVideo.play();

            // Setup canvas for overlays
            this.setupCanvas();

            // Hide loading
            this.arLoading.style.display = 'none';

            // Start rendering effects
            this.isARActive = true;
            this.updateFilterIndicator();
            this.renderAREffects();

        } catch (error) {
            console.error('Camera access error:', error);
            this.arLoading.style.display = 'none';
            this.arPermissionDenied.style.display = 'flex';
        }
    }

    setupCanvas() {
        this.arCanvas.width = this.arVideo.videoWidth || window.innerWidth;
        this.arCanvas.height = this.arVideo.videoHeight || window.innerHeight;
        this.ctx = this.arCanvas.getContext('2d');
    }

    renderAREffects() {
        if (!this.isARActive) return;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.arCanvas.width, this.arCanvas.height);

        // Apply current filter effect
        const intensity = this.filterIntensity / 100;

        switch (this.currentFilter) {
            case 'sea-level':
                this.renderSeaLevelEffect(intensity);
                break;
            case 'smog':
                this.renderSmogEffect(intensity);
                break;
            case 'deforestation':
                this.renderDeforestationEffect(intensity);
                break;
            case 'heat':
                this.renderHeatEffect(intensity);
                break;
        }

        // Render AR frame overlay
        this.renderARFrame();

        // Continue animation loop
        this.animationFrame = requestAnimationFrame(() => this.renderAREffects());
    }

    renderSeaLevelEffect(intensity) {
        const settings = this.filterSettings['sea-level'];
        const waterHeight = (this.arCanvas.height * (0.2 + (settings.level * 0.15))) * intensity;
        const waveAmplitude = 10 + (settings.level * 5);
        const waveFrequency = 0.02;
        const time = Date.now() * 0.002;

        // Create wave pattern
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.arCanvas.height);

        for (let x = 0; x <= this.arCanvas.width; x += 5) {
            const y = this.arCanvas.height - waterHeight +
                Math.sin(x * waveFrequency + time) * waveAmplitude +
                Math.sin(x * waveFrequency * 2 + time * 1.5) * (waveAmplitude / 2);
            this.ctx.lineTo(x, y);
        }

        this.ctx.lineTo(this.arCanvas.width, this.arCanvas.height);
        this.ctx.closePath();

        // Water gradient
        const gradient = this.ctx.createLinearGradient(0, this.arCanvas.height - waterHeight, 0, this.arCanvas.height);
        gradient.addColorStop(0, `rgba(0, 150, 200, ${0.4 * intensity})`);
        gradient.addColorStop(0.5, `rgba(0, 100, 180, ${0.6 * intensity})`);
        gradient.addColorStop(1, `rgba(0, 50, 120, ${0.8 * intensity})`);

        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        // Add foam/highlights at water surface
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * intensity})`;
        this.ctx.lineWidth = 3;
        this.ctx.stroke();

        // Add underwater caustics effect
        this.renderCaustics(waterHeight, intensity);
    }

    renderCaustics(waterHeight, intensity) {
        const time = Date.now() * 0.001;
        const causticsCount = 20;

        this.ctx.save();
        this.ctx.globalCompositeOperation = 'overlay';

        for (let i = 0; i < causticsCount; i++) {
            const x = (Math.sin(time + i) * 0.5 + 0.5) * this.arCanvas.width;
            const y = this.arCanvas.height - waterHeight * 0.7 + Math.sin(time * 2 + i * 0.5) * 50;
            const size = 30 + Math.sin(time + i) * 20;

            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, size);
            gradient.addColorStop(0, `rgba(100, 200, 255, ${0.2 * intensity})`);
            gradient.addColorStop(1, 'transparent');

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }

        this.ctx.restore();
    }

    renderSmogEffect(intensity) {
        const settings = this.filterSettings['smog'];
        const aqiRatio = settings.level / settings.maxLevel;
        const opacity = (0.3 + aqiRatio * 0.5) * intensity;

        // Base smog layer
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.arCanvas.height);
        gradient.addColorStop(0, `rgba(120, 100, 80, ${opacity * 0.3})`);
        gradient.addColorStop(0.5, `rgba(100, 80, 60, ${opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(80, 60, 40, ${opacity * 0.4})`);

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.arCanvas.width, this.arCanvas.height);

        // Add particle clouds
        this.renderSmogParticles(intensity, aqiRatio);

        // Add color tint based on AQI
        let tint;
        if (settings.level > 300) {
            tint = `rgba(150, 50, 50, ${opacity * 0.3})`; // Hazardous - reddish
        } else if (settings.level > 200) {
            tint = `rgba(150, 100, 50, ${opacity * 0.3})`; // Unhealthy - orange
        } else {
            tint = `rgba(150, 150, 50, ${opacity * 0.2})`; // Moderate - yellowish
        }

        this.ctx.fillStyle = tint;
        this.ctx.fillRect(0, 0, this.arCanvas.width, this.arCanvas.height);
    }

    renderSmogParticles(intensity, aqiRatio) {
        const time = Date.now() * 0.0005;
        const particleCount = Math.floor(30 + aqiRatio * 50);

        for (let i = 0; i < particleCount; i++) {
            const x = (Math.sin(time + i * 0.5) * 0.5 + 0.5) * this.arCanvas.width * 1.5 - this.arCanvas.width * 0.25;
            const y = (Math.cos(time * 0.7 + i * 0.3) * 0.5 + 0.5) * this.arCanvas.height;
            const size = 80 + Math.sin(time + i) * 40;

            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, size);
            gradient.addColorStop(0, `rgba(140, 120, 100, ${0.15 * intensity})`);
            gradient.addColorStop(1, 'transparent');

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    renderDeforestationEffect(intensity) {
        const settings = this.filterSettings['deforestation'];
        const lossRatio = settings.level / 100;

        // Sepia/brown tint for barren effect
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.arCanvas.height);
        gradient.addColorStop(0, `rgba(139, 90, 43, ${0.2 * intensity * lossRatio})`);
        gradient.addColorStop(0.5, `rgba(160, 100, 45, ${0.25 * intensity * lossRatio})`);
        gradient.addColorStop(1, `rgba(120, 80, 40, ${0.3 * intensity * lossRatio})`);

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.arCanvas.width, this.arCanvas.height);

        // Add dead tree silhouettes
        this.renderDeadTrees(intensity, lossRatio);

        // Add dust particles
        this.renderDustParticles(intensity, lossRatio);
    }

    renderDeadTrees(intensity, lossRatio) {
        const treeCount = Math.floor(5 + lossRatio * 10);
        this.ctx.save();
        this.ctx.globalAlpha = 0.3 * intensity * lossRatio;
        this.ctx.fillStyle = '#3d2817';
        this.ctx.strokeStyle = '#2a1a0f';
        this.ctx.lineWidth = 3;

        for (let i = 0; i < treeCount; i++) {
            const x = (i / treeCount) * this.arCanvas.width + (Math.sin(i * 1.5) * 50);
            const baseY = this.arCanvas.height;
            const trunkHeight = 100 + Math.random() * 150;
            const trunkWidth = 15 + Math.random() * 10;

            // Draw trunk (dead tree stump)
            this.ctx.beginPath();
            this.ctx.moveTo(x - trunkWidth / 2, baseY);
            this.ctx.lineTo(x - trunkWidth / 3, baseY - trunkHeight);
            this.ctx.lineTo(x + trunkWidth / 3, baseY - trunkHeight);
            this.ctx.lineTo(x + trunkWidth / 2, baseY);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();

            // Draw broken branches
            const branchCount = 2 + Math.floor(Math.random() * 3);
            for (let j = 0; j < branchCount; j++) {
                const branchY = baseY - trunkHeight * (0.3 + j * 0.2);
                const branchLength = 30 + Math.random() * 50;
                const direction = j % 2 === 0 ? 1 : -1;

                this.ctx.beginPath();
                this.ctx.moveTo(x, branchY);
                this.ctx.lineTo(x + branchLength * direction, branchY - 20 - Math.random() * 30);
                this.ctx.lineWidth = 5 - j;
                this.ctx.stroke();
            }
        }

        this.ctx.restore();
    }

    renderDustParticles(intensity, lossRatio) {
        const time = Date.now() * 0.001;
        const particleCount = Math.floor(20 + lossRatio * 30);

        for (let i = 0; i < particleCount; i++) {
            const x = ((time * 50 + i * 100) % (this.arCanvas.width + 100)) - 50;
            const y = this.arCanvas.height * 0.5 + Math.sin(time + i) * this.arCanvas.height * 0.3;
            const size = 3 + Math.random() * 5;

            this.ctx.fillStyle = `rgba(180, 150, 120, ${0.4 * intensity * lossRatio})`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    renderHeatEffect(intensity) {
        const settings = this.filterSettings['heat'];
        const heatRatio = settings.level / settings.maxLevel;
        const time = Date.now() * 0.001;

        // Heat shimmer/distortion effect simulation
        // Add reddish-orange tint
        const gradient = this.ctx.createRadialGradient(
            this.arCanvas.width / 2, this.arCanvas.height / 2, 0,
            this.arCanvas.width / 2, this.arCanvas.height / 2, this.arCanvas.width
        );
        gradient.addColorStop(0, `rgba(255, 100, 50, ${0.1 * intensity * heatRatio})`);
        gradient.addColorStop(0.5, `rgba(255, 150, 80, ${0.15 * intensity * heatRatio})`);
        gradient.addColorStop(1, `rgba(255, 80, 30, ${0.2 * intensity * heatRatio})`);

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.arCanvas.width, this.arCanvas.height);

        // Add heat wave lines
        this.renderHeatWaves(intensity, heatRatio, time);

        // Add sun glare effect
        this.renderSunGlare(intensity, heatRatio);
    }

    renderHeatWaves(intensity, heatRatio, time) {
        const waveCount = 10 + Math.floor(heatRatio * 10);

        this.ctx.save();
        this.ctx.globalAlpha = 0.15 * intensity * heatRatio;
        this.ctx.strokeStyle = 'rgba(255, 200, 150, 0.5)';
        this.ctx.lineWidth = 2;

        for (let i = 0; i < waveCount; i++) {
            const y = (i / waveCount) * this.arCanvas.height;
            const amplitude = 5 + heatRatio * 10;
            const frequency = 0.02 + Math.sin(time + i) * 0.01;

            this.ctx.beginPath();
            for (let x = 0; x <= this.arCanvas.width; x += 10) {
                const waveY = y + Math.sin(x * frequency + time * 3 + i) * amplitude;
                if (x === 0) {
                    this.ctx.moveTo(x, waveY);
                } else {
                    this.ctx.lineTo(x, waveY);
                }
            }
            this.ctx.stroke();
        }

        this.ctx.restore();
    }

    renderSunGlare(intensity, heatRatio) {
        const time = Date.now() * 0.0005;
        const centerX = this.arCanvas.width * 0.8;
        const centerY = this.arCanvas.height * 0.15;
        const size = 150 + Math.sin(time) * 30;

        const gradient = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, size);
        gradient.addColorStop(0, `rgba(255, 255, 200, ${0.6 * intensity * heatRatio})`);
        gradient.addColorStop(0.3, `rgba(255, 200, 100, ${0.3 * intensity * heatRatio})`);
        gradient.addColorStop(1, 'transparent');

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, size, 0, Math.PI * 2);
        this.ctx.fill();
    }

    renderARFrame() {
        // Add scanning corners
        const cornerSize = 60;
        const cornerThickness = 4;
        const margin = 30;

        this.ctx.strokeStyle = 'rgba(0, 212, 170, 0.8)';
        this.ctx.lineWidth = cornerThickness;
        this.ctx.lineCap = 'round';

        // Top-left
        this.ctx.beginPath();
        this.ctx.moveTo(margin, margin + cornerSize);
        this.ctx.lineTo(margin, margin);
        this.ctx.lineTo(margin + cornerSize, margin);
        this.ctx.stroke();

        // Top-right
        this.ctx.beginPath();
        this.ctx.moveTo(this.arCanvas.width - margin - cornerSize, margin);
        this.ctx.lineTo(this.arCanvas.width - margin, margin);
        this.ctx.lineTo(this.arCanvas.width - margin, margin + cornerSize);
        this.ctx.stroke();

        // Bottom-left
        this.ctx.beginPath();
        this.ctx.moveTo(margin, this.arCanvas.height - margin - cornerSize);
        this.ctx.lineTo(margin, this.arCanvas.height - margin);
        this.ctx.lineTo(margin + cornerSize, this.arCanvas.height - margin);
        this.ctx.stroke();

        // Bottom-right
        this.ctx.beginPath();
        this.ctx.moveTo(this.arCanvas.width - margin - cornerSize, this.arCanvas.height - margin);
        this.ctx.lineTo(this.arCanvas.width - margin, this.arCanvas.height - margin);
        this.ctx.lineTo(this.arCanvas.width - margin, this.arCanvas.height - margin - cornerSize);
        this.ctx.stroke();
    }

    closeAR() {
        this.isARActive = false;

        // Cancel animation frame
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }

        // Stop camera stream
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }

        // Clear video source
        if (this.arVideo) {
            this.arVideo.srcObject = null;
        }

        // Hide modal
        this.arModal.classList.remove('active');
    }

    cycleFilters() {
        const filters = ['sea-level', 'smog', 'deforestation', 'heat'];
        const currentIndex = filters.indexOf(this.currentFilter);
        const nextIndex = (currentIndex + 1) % filters.length;
        this.selectFilter(filters[nextIndex]);
    }

    captureScreenshot() {
        // Create a temporary canvas combining video and effects
        const captureCanvas = document.createElement('canvas');
        captureCanvas.width = this.arCanvas.width;
        captureCanvas.height = this.arCanvas.height;
        const captureCtx = captureCanvas.getContext('2d');

        // Draw video frame
        captureCtx.drawImage(this.arVideo, 0, 0, captureCanvas.width, captureCanvas.height);

        // Draw AR overlay
        captureCtx.drawImage(this.arCanvas, 0, 0);

        // Add watermark
        captureCtx.font = 'bold 24px Poppins, sans-serif';
        captureCtx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        captureCtx.textAlign = 'left';
        captureCtx.fillText('🌍 Future Lens - Climate Visualizer', 20, captureCanvas.height - 20);

        // Convert to image and download
        const link = document.createElement('a');
        link.download = `future-lens-${this.currentFilter}-${Date.now()}.png`;
        link.href = captureCanvas.toDataURL('image/png');
        link.click();

        this.showNotification('Screenshot captured!');
    }

    shareExperience() {
        const shareData = {
            title: 'Future Lens - AR Climate Visualizer',
            text: `I just experienced what climate change could do to our world using Future Lens AR. See the impact of ${this.getFilterName(this.currentFilter)} for yourself!`,
            url: window.location.href
        };

        if (navigator.share) {
            navigator.share(shareData)
                .then(() => this.showNotification('Thanks for sharing!'))
                .catch((error) => console.log('Error sharing:', error));
        } else {
            // Fallback - copy link to clipboard
            navigator.clipboard.writeText(window.location.href)
                .then(() => this.showNotification('Link copied to clipboard!'))
                .catch(() => this.showNotification('Unable to share'));
        }
    }

    bindSocialShareButtons() {
        const pageUrl = encodeURIComponent(window.location.href);
        const shareText = encodeURIComponent('Experience the future impact of climate change with Future Lens AR!');

        document.getElementById('shareTwitter')?.addEventListener('click', () => {
            window.open(`https://twitter.com/intent/tweet?url=${pageUrl}&text=${shareText}`, '_blank');
        });

        document.getElementById('shareFacebook')?.addEventListener('click', () => {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`, '_blank');
        });

        document.getElementById('shareLinkedin')?.addEventListener('click', () => {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`, '_blank');
        });

        document.getElementById('shareWhatsapp')?.addEventListener('click', () => {
            window.open(`https://wa.me/?text=${shareText}%20${pageUrl}`, '_blank');
        });
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'ar-notification';
        notification.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>${message}</span>
    `;

        // Add styles
        notification.style.cssText = `
      position: fixed;
      top: 100px;
      left: 50%;
      transform: translateX(-50%) translateY(-20px);
      background: rgba(0, 212, 170, 0.95);
      color: white;
      padding: 15px 25px;
      border-radius: 50px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 600;
      z-index: 10001;
      opacity: 0;
      transition: all 0.3s ease;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(-50%) translateY(0)';
        });

        // Remove after delay
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    initializeParticles() {
        const container = document.getElementById('heroParticles');
        if (!container) return;

        // Add floating particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
        position: absolute;
        width: ${5 + Math.random() * 10}px;
        height: ${5 + Math.random() * 10}px;
        background: radial-gradient(circle, rgba(0, 212, 170, 0.6), transparent);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particle-float ${10 + Math.random() * 10}s ease-in-out infinite;
        animation-delay: ${-Math.random() * 10}s;
      `;
            container.appendChild(particle);
        }

        // Add keyframes for particle animation
        if (!document.getElementById('particle-keyframes')) {
            const style = document.createElement('style');
            style.id = 'particle-keyframes';
            style.textContent = `
        @keyframes particle-float {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          25% { transform: translate(20px, -30px) scale(1.2); opacity: 0.8; }
          50% { transform: translate(-10px, -60px) scale(0.8); opacity: 0.4; }
          75% { transform: translate(30px, -30px) scale(1.1); opacity: 0.7; }
        }
      `;
            document.head.appendChild(style);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.arVisualizer = new ARClimateVisualizer();
});

// Handle page visibility changes (pause AR when page is hidden)
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.arVisualizer?.isARActive) {
        window.arVisualizer.closeAR();
    }
});
