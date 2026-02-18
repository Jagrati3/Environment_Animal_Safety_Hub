// Forest Fragmentation and Edge-Driven Invasions - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeFragmentationSimulator();
    initializeEdgeEffectCharts();
    initializeInvasionDynamics();
    initializeCaseStudyModals();
    initializeQuiz();

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.documentElement.setAttribute('data-theme',
                document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
            );
            updateThemeIcon();
        });
    }

    updateThemeIcon();
});

// Fragmentation Simulator
function initializeFragmentationSimulator() {
    const patchSizeSlider = document.getElementById('patchSize');
    const edgeDepthSlider = document.getElementById('edgeDepth');
    const invasivePressureSlider = document.getElementById('invasivePressure');

    const patchSizeValue = document.getElementById('patchSizeValue');
    const edgeDepthValue = document.getElementById('edgeDepthValue');
    const invasivePressureValue = document.getElementById('invasivePressureValue');

    const edgeRatioElement = document.getElementById('edgeRatio');
    const coreHabitatElement = document.getElementById('coreHabitat');
    const invasionRiskElement = document.getElementById('invasionRisk');

    const canvas = document.getElementById('fragmentationCanvas');
    const ctx = canvas.getContext('2d');

    function updateSimulator() {
        const patchSize = parseInt(patchSizeSlider.value);
        const edgeDepth = parseInt(edgeDepthSlider.value);
        const invasivePressure = parseInt(invasivePressureSlider.value);

        // Update display values
        patchSizeValue.textContent = `${patchSize} ha`;
        edgeDepthValue.textContent = `${edgeDepth}m`;
        invasivePressureValue.textContent = `${invasivePressure}%`;

        // Calculate fragmentation metrics
        const patchArea = patchSize * 10000; // Convert ha to m²
        const edgeArea = calculateEdgeArea(patchSize, edgeDepth);
        const edgeToAreaRatio = edgeArea / patchArea;
        const coreHabitatPercent = Math.max(0, ((patchArea - edgeArea) / patchArea) * 100);

        // Calculate invasion risk
        const invasionRisk = calculateInvasionRisk(edgeToAreaRatio, invasivePressure);

        // Update metrics display
        edgeRatioElement.textContent = edgeToAreaRatio.toFixed(3);
        coreHabitatElement.textContent = `${coreHabitatPercent.toFixed(1)}%`;
        invasionRiskElement.textContent = invasionRisk;
        invasionRiskElement.style.color = getRiskColor(invasionRisk);

        // Draw visualization
        drawFragmentationVisualization(ctx, patchSize, edgeDepth, invasivePressure);
    }

    // Event listeners
    patchSizeSlider.addEventListener('input', updateSimulator);
    edgeDepthSlider.addEventListener('input', updateSimulator);
    invasivePressureSlider.addEventListener('input', updateSimulator);

    // Initial update
    updateSimulator();
}

function calculateEdgeArea(patchSize, edgeDepth) {
    // Simplified calculation: assume square patch
    const sideLength = Math.sqrt(patchSize * 10000); // Convert ha to m, get side length
    const perimeter = 4 * sideLength;
    return perimeter * edgeDepth;
}

function calculateInvasionRisk(edgeRatio, invasivePressure) {
    const riskScore = (edgeRatio * 1000) + invasivePressure;

    if (riskScore < 50) return 'Low';
    if (riskScore < 150) return 'Moderate';
    if (riskScore < 300) return 'High';
    return 'Very High';
}

function getRiskColor(risk) {
    switch (risk) {
        case 'Low': return '#28a745';
        case 'Moderate': return '#ffc107';
        case 'High': return '#fd7e14';
        case 'Very High': return '#dc3545';
        default: return '#6c757d';
    }
}

function drawFragmentationVisualization(ctx, patchSize, edgeDepth, invasivePressure) {
    const canvas = ctx.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate dimensions
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxSize = Math.min(canvas.width, canvas.height) * 0.6;

    // Scale patch size for visualization (logarithmic scaling)
    const scaleFactor = Math.log(patchSize + 1) / Math.log(1001);
    const patchRadius = 30 + (scaleFactor * maxSize * 0.3);

    // Draw background grid
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }

    // Draw forest patch
    ctx.fillStyle = '#228b22';
    ctx.fillRect(centerX - patchRadius, centerY - patchRadius, patchRadius * 2, patchRadius * 2);

    // Draw edge zone
    const edgeThickness = Math.max(5, edgeDepth / 10);
    ctx.fillStyle = '#daa520';
    ctx.fillRect(centerX - patchRadius, centerY - patchRadius, patchRadius * 2, edgeThickness);
    ctx.fillRect(centerX - patchRadius, centerY + patchRadius - edgeThickness, patchRadius * 2, edgeThickness);
    ctx.fillRect(centerX - patchRadius, centerY - patchRadius, edgeThickness, patchRadius * 2);
    ctx.fillRect(centerX + patchRadius - edgeThickness, centerY - patchRadius, edgeThickness, patchRadius * 2);

    // Draw invasive species indicators
    if (invasivePressure > 20) {
        ctx.fillStyle = '#dc3545';
        const invasiveCount = Math.floor(invasivePressure / 20);
        for (let i = 0; i < invasiveCount; i++) {
            const angle = (i / invasiveCount) * Math.PI * 2;
            const distance = patchRadius * 0.7;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Draw core habitat indicator
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    const coreRadius = patchRadius - edgeThickness;
    ctx.strokeRect(centerX - coreRadius, centerY - coreRadius, coreRadius * 2, coreRadius * 2);
    ctx.setLineDash([]);
}

// Edge Effect Charts
function initializeEdgeEffectCharts() {
    const charts = [
        { id: 'temperatureChart', data: [25, 22, 20, 18, 25] },
        { id: 'humidityChart', data: [80, 75, 70, 65, 80] },
        { id: 'windChart', data: [2, 5, 8, 12, 2] },
        { id: 'lightChart', data: [20, 60, 85, 95, 20] }
    ];

    charts.forEach(chart => {
        drawEdgeEffectChart(chart.id, chart.data);
    });
}

function drawEdgeEffectChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;

    ctx.clearRect(0, 0, width, height);

    // Draw axes
    ctx.strokeStyle = '#6c757d';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw data points and line
    ctx.strokeStyle = '#2d5a27';
    ctx.lineWidth = 2;
    ctx.beginPath();

    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue;

    data.forEach((value, index) => {
        const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
        const y = height - padding - ((value - minValue) / range) * (height - 2 * padding);

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }

        // Draw point
        ctx.fillStyle = '#2d5a27';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.stroke();

    // Labels
    ctx.fillStyle = '#6c757d';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';

    const labels = ['Interior', 'Edge', 'Transition', 'Matrix', 'Interior'];
    labels.forEach((label, index) => {
        const x = padding + (index / (labels.length - 1)) * (width - 2 * padding);
        ctx.fillText(label, x, height - 5);
    });
}

// Invasion Dynamics Model
function initializeInvasionDynamics() {
    const nativeTolerance = document.getElementById('nativeTolerance');
    const nativeCompetition = document.getElementById('nativeCompetition');
    const invasiveTolerance = document.getElementById('invasiveTolerance');
    const invasiveCompetition = document.getElementById('invasiveCompetition');

    const nativeToleranceValue = document.getElementById('nativeEdgeTolerance');
    const nativeCompetitionValue = document.getElementById('nativeCompetitive');
    const invasiveToleranceValue = document.getElementById('invasiveEdgeTolerance');
    const invasiveCompetitionValue = document.getElementById('invasiveCompetitive');

    const nativePopulation = document.getElementById('nativePopulation');
    const invasivePopulation = document.getElementById('invasivePopulation');
    const edgeImpact = document.getElementById('edgeImpact');

    function updateInvasionModel() {
        const nativeTol = parseInt(nativeTolerance.value);
        const nativeComp = parseInt(nativeCompetition.value);
        const invasiveTol = parseInt(invasiveTolerance.value);
        const invasiveComp = parseInt(invasiveCompetition.value);

        // Update display values
        nativeToleranceValue.textContent = getToleranceLabel(nativeTol);
        nativeCompetitionValue.textContent = getCompetitionLabel(nativeComp);
        invasiveToleranceValue.textContent = getToleranceLabel(invasiveTol);
        invasiveCompetitionValue.textContent = getCompetitionLabel(invasiveComp);

        // Calculate population dynamics
        const edgeEffectStrength = 0.7; // Represents edge habitat proportion
        const nativeFitness = (nativeTol * 0.3 + nativeComp * 0.7) / 100;
        const invasiveFitness = (invasiveTol * 0.8 + invasiveComp * 0.2) / 100;

        const nativePop = (nativeFitness * (1 - edgeEffectStrength) + nativeTol/100 * edgeEffectStrength) * 100;
        const invasivePop = (invasiveFitness * edgeEffectStrength + invasiveComp/100 * (1 - edgeEffectStrength)) * 100;

        // Normalize to percentages
        const totalPop = nativePop + invasivePop;
        const nativePercent = (nativePop / totalPop) * 100;
        const invasivePercent = (invasivePop / totalPop) * 100;

        // Update display
        nativePopulation.textContent = `${nativePercent.toFixed(0)}%`;
        invasivePopulation.textContent = `${invasivePercent.toFixed(0)}%`;

        const impact = edgeEffectStrength > 0.5 ? 'High' : edgeEffectStrength > 0.3 ? 'Moderate' : 'Low';
        edgeImpact.textContent = impact;
        edgeImpact.style.color = impact === 'High' ? '#dc3545' : impact === 'Moderate' ? '#ffc107' : '#28a745';

        // Update competition chart
        drawCompetitionChart(nativePercent, invasivePercent);
    }

    function getToleranceLabel(value) {
        if (value < 30) return 'Low';
        if (value < 70) return 'Medium';
        return 'High';
    }

    function getCompetitionLabel(value) {
        if (value < 30) return 'Low';
        if (value < 70) return 'Medium';
        return 'High';
    }

    // Event listeners
    nativeTolerance.addEventListener('input', updateInvasionModel);
    nativeCompetition.addEventListener('input', updateInvasionModel);
    invasiveTolerance.addEventListener('input', updateInvasionModel);
    invasiveCompetition.addEventListener('input', updateInvasionModel);

    // Initial update
    updateInvasionModel();
}

function drawCompetitionChart(nativePercent, invasivePercent) {
    const canvas = document.getElementById('competitionChart');
    const ctx = canvas.getContext('2d');

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.3;

    ctx.clearRect(0, 0, width, height);

    // Draw pie chart
    const nativeAngle = (nativePercent / 100) * Math.PI * 2;
    const invasiveAngle = (invasivePercent / 100) * Math.PI * 2;

    // Native species slice
    ctx.fillStyle = '#228b22';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + nativeAngle);
    ctx.closePath();
    ctx.fill();

    // Invasive species slice
    ctx.fillStyle = '#dc3545';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, -Math.PI / 2 + nativeAngle, -Math.PI / 2 + nativeAngle + invasiveAngle);
    ctx.closePath();
    ctx.fill();

    // Labels
    ctx.fillStyle = '#2c3e50';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    // Native label
    const nativeLabelX = centerX + Math.cos(-Math.PI / 2 + nativeAngle / 2) * (radius + 30);
    const nativeLabelY = centerY + Math.sin(-Math.PI / 2 + nativeAngle / 2) * (radius + 30);
    ctx.fillText(`Native: ${nativePercent.toFixed(0)}%`, nativeLabelX, nativeLabelY);

    // Invasive label
    const invasiveLabelX = centerX + Math.cos(-Math.PI / 2 + nativeAngle + invasiveAngle / 2) * (radius + 30);
    const invasiveLabelY = centerY + Math.sin(-Math.PI / 2 + nativeAngle + invasiveAngle / 2) * (radius + 30);
    ctx.fillText(`Invasive: ${invasivePercent.toFixed(0)}%`, invasiveLabelX, invasiveLabelY);
}

// Case Study Modals
function initializeCaseStudyModals() {
    const modal = document.getElementById('caseStudyModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    const caseStudies = {
        amazon: {
            title: 'Amazon Rainforest Fragmentation',
            content: `
                <h4>The BR-163 Highway Impact</h4>
                <p>The BR-163 highway in the Brazilian Amazon has created over 15,000 km² of forest fragments, dramatically increasing edge habitats. Studies show that within 100 meters of forest edges, tree mortality increases by 30-50% due to altered microclimates.</p>

                <h4>Invasive Species Response</h4>
                <p>Edge habitats have become hotspots for invasive grasses like <em>Urochloa brizantha</em> and vines like <em>Merremia cissoides</em>. These species thrive in the increased light and altered soil conditions at edges, outcompeting native understory plants.</p>

                <h4>Long-term Consequences</h4>
                <p>Fragments smaller than 100 hectares lose interior forest conditions entirely, becoming completely dominated by edge-adapted species. This creates a positive feedback loop where invasive dominance further degrades habitat quality.</p>

                <div class="case-stats">
                    <div class="stat">
                        <span class="stat-number">15,000 km²</span>
                        <span class="stat-label">Fragmented Area</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">50%</span>
                        <span class="stat-label">Edge Tree Mortality</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">25+</span>
                        <span class="stat-label">Invasive Species</span>
                    </div>
                </div>
            `
        },
        urban: {
            title: 'Urban Forest Fragmentation',
            content: `
                <h4>Suburban Sprawl Effects</h4>
                <p>Urban development in the eastern United States has fragmented forests into patches averaging 50-200 hectares. Residential areas create abrupt edges with extreme microclimate changes.</p>

                <h4>Key Invasive Species</h4>
                <p><strong>Japanese Honeysuckle (<em>Lonicera japonica</em>)</strong>: Thrives in edge light conditions, forms dense thickets that smother native vegetation.</p>
                <p><strong>Garlic Mustard (<em>Alliaria petiolata</em>)</strong>: Colonizes disturbed edges, releases chemicals that inhibit native plant growth.</p>
                <p><strong>Tree-of-Heaven (<em>Ailanthus altissima</em>)</strong>: Exploits urban-adjacent edges, produces allelopathic compounds.</p>

                <h4>Management Challenges</h4>
                <p>Urban fragments are difficult to manage due to property ownership issues and constant disturbance from human activity. However, community-based invasive species removal programs have shown success in maintaining native biodiversity.</p>

                <div class="case-stats">
                    <div class="stat">
                        <span class="stat-number">50-200 ha</span>
                        <span class="stat-label">Average Patch Size</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">80%</span>
                        <span class="stat-label">Edge Dominance</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">15</span>
                        <span class="stat-label">Priority Invasives</span>
                    </div>
                </div>
            `
        },
        australia: {
            title: 'Australian Eucalypt Forest Fragmentation',
            content: `
                <h4>Agricultural Expansion Impact</h4>
                <p>Australia's agricultural intensification has fragmented eucalypt forests, creating conditions that favor invasive shrubs and alter fire regimes.</p>

                <h4>Fire Regime Changes</h4>
                <p>Invasive species like <em>Chrysanthemoides monilifera</em> (bitou bush) and <em>Acacia longifolia</em> (Sydney golden wattle) create continuous fuel loads that increase fire frequency and intensity, further degrading native forests.</p>

                <h4>Native Species Decline</h4>
                <p>Edge effects have led to the decline of fire-sensitive native species while favoring invasive plants that resprout vigorously after fires. This creates a feedback loop of increasing fragmentation and invasion.</p>

                <h4>Restoration Efforts</h4>
                <p>Australia has implemented large-scale restoration programs focusing on corridor creation and invasive species management. These efforts have shown that connecting fragments can restore native dominance even in heavily invaded landscapes.</p>

                <div class="case-stats">
                    <div class="stat">
                        <span class="stat-number">30%</span>
                        <span class="stat-label">Forest Loss</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">2x</span>
                        <span class="stat-label">Fire Frequency</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">500+</span>
                        <span class="stat-label">Invasive Plants</span>
                    </div>
                </div>
            `
        }
    };

    document.querySelectorAll('.case-study-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const caseKey = this.getAttribute('data-case');
            const caseStudy = caseStudies[caseKey];

            if (caseStudy) {
                modalTitle.textContent = caseStudy.title;
                modalBody.innerHTML = caseStudy.content;
                modal.classList.add('show');
            }
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}

// Quiz System
function initializeQuiz() {
    const quizData = [
        {
            question: "What is the primary mechanism by which forest fragmentation creates opportunities for invasive species?",
            options: [
                "Increased soil fertility at fragment centers",
                "Creation of edge habitats with altered microclimates",
                "Reduced competition from large native trees",
                "Enhanced water availability in fragments"
            ],
            correct: 1,
            explanation: "Edge habitats have different light, temperature, and humidity conditions that favor species adapted to disturbed environments, giving invasive species a competitive advantage."
        },
        {
            question: "Which of the following is NOT typically increased at forest edges?",
            options: [
                "Light penetration",
                "Temperature fluctuations",
                "Soil moisture content",
                "Wind speed"
            ],
            correct: 2,
            explanation: "Soil moisture typically decreases at forest edges due to increased evaporation from higher temperatures and wind exposure."
        },
        {
            question: "What is the edge-to-area ratio?",
            options: [
                "The proportion of forest that is interior habitat",
                "The ratio of edge length to total fragment area",
                "The number of invasive species per hectare",
                "The distance from edge to fragment center"
            ],
            correct: 1,
            explanation: "The edge-to-area ratio measures how much of a fragment is affected by edge conditions, with higher ratios indicating greater edge influence."
        },
        {
            question: "Why do invasive species often have an advantage in fragmented landscapes?",
            options: [
                "They are better adapted to interior forest conditions",
                "They typically have higher dispersal abilities",
                "They require large continuous habitats",
                "They are more sensitive to edge effects"
            ],
            correct: 1,
            explanation: "Many invasive species have traits like high dispersal ability, rapid growth, and tolerance of disturbed conditions that give them advantages in fragmented landscapes."
        },
        {
            question: "What is 'core habitat' in the context of forest fragmentation?",
            options: [
                "The most valuable timber in a forest",
                "Interior forest area unaffected by edge effects",
                "The center of a forest management unit",
                "Habitat preferred by invasive species"
            ],
            correct: 1,
            explanation: "Core habitat refers to the interior portion of forest fragments that maintains conditions similar to continuous forest, free from edge effects."
        },
        {
            question: "Which mitigation strategy focuses on connecting fragmented habitats?",
            options: [
                "Pesticide application",
                "Wildlife corridors",
                "Invasive species removal only",
                "Forest thinning"
            ],
            correct: 1,
            explanation: "Wildlife corridors connect fragmented habitats, allowing native species movement and reducing edge effects while potentially limiting invasive spread."
        },
        {
            question: "How does fragmentation affect pollination in forests?",
            options: [
                "Increases pollinator abundance",
                "Has no effect on pollination",
                "Reduces pollination services due to edge effects",
                "Improves pollination efficiency"
            ],
            correct: 2,
            explanation: "Edge effects can reduce pollinator populations and alter flowering phenology, leading to decreased pollination services in fragmented forests."
        },
        {
            question: "What is the minimum fragment size needed to maintain some interior forest conditions?",
            options: [
                "1 hectare",
                "10 hectares",
                "100 hectares",
                "1000 hectares"
            ],
            correct: 2,
            explanation: "Fragments of at least 100 hectares can maintain some interior conditions, though this varies by forest type and edge effect depth."
        },
        {
            question: "Which invasive species commonly exploits forest edges in North America?",
            options: [
                "Japanese knotweed",
                "Garlic mustard",
                "Kudzu",
                "All of the above"
            ],
            correct: 3,
            explanation: "All three species are known to exploit forest edges, though they have different specific habitat preferences and invasion strategies."
        },
        {
            question: "What is the long-term consequence of unchecked invasion in fragmented forests?",
            options: [
                "Increased native species diversity",
                "Formation of novel ecosystems",
                "Restoration of original forest conditions",
                "Enhanced ecosystem services"
            ],
            correct: 1,
            explanation: "Unchecked invasions can lead to novel ecosystems where invasive species dominate, creating stable but altered communities different from the original forest."
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let answers = [];

    const questionElement = document.getElementById('questionText');
    const optionsElement = document.getElementById('quizOptions');
    const progressFill = document.getElementById('progressFill');
    const currentQuestionSpan = document.getElementById('currentQuestion');
    const totalQuestionsSpan = document.getElementById('totalQuestions');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const quizResults = document.getElementById('quizResults');
    const finalScore = document.getElementById('finalScore');
    const scoreMessage = document.getElementById('scoreMessage');
    const retakeBtn = document.getElementById('retakeBtn');

    totalQuestionsSpan.textContent = quizData.length;

    function loadQuestion(index) {
        const question = quizData[index];
        questionElement.textContent = question.question;
        currentQuestionSpan.textContent = index + 1;
        progressFill.style.width = `${((index + 1) / quizData.length) * 100}%`;

        optionsElement.innerHTML = '';
        question.options.forEach((option, optionIndex) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectOption(optionIndex));
            optionsElement.appendChild(optionElement);
        });

        // Show selected answer if previously answered
        if (answers[index] !== undefined) {
            const selectedOption = optionsElement.children[answers[index]];
            selectedOption.classList.add('selected');
        }

        updateButtons();
    }

    function selectOption(optionIndex) {
        answers[currentQuestionIndex] = optionIndex;

        // Remove previous selection
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.classList.remove('selected');
        });

        // Add new selection
        event.target.classList.add('selected');
    }

    function updateButtons() {
        prevBtn.disabled = currentQuestionIndex === 0;
        nextBtn.disabled = answers[currentQuestionIndex] === undefined;

        if (currentQuestionIndex === quizData.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
    }

    function showResults() {
        score = answers.reduce((total, answer, index) => {
            return total + (answer === quizData[index].correct ? 1 : 0);
        }, 0);

        finalScore.textContent = score;
        scoreMessage.textContent = getScoreMessage(score);

        document.getElementById('quizQuestion').style.display = 'none';
        document.getElementById('quizControls').style.display = 'none';
        quizResults.style.display = 'block';
    }

    function getScoreMessage(score) {
        const percentage = (score / quizData.length) * 100;
        if (percentage >= 90) return "Excellent! You have a strong understanding of forest fragmentation and invasion dynamics.";
        if (percentage >= 80) return "Great job! You understand most concepts related to edge effects and invasive species.";
        if (percentage >= 70) return "Good work! You have a solid grasp of fragmentation principles.";
        if (percentage >= 60) return "Not bad! Review the edge effect concepts and try again.";
        return "Keep learning! Forest fragmentation is complex - review the material and retake the quiz.";
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < quizData.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
        }
    });

    submitBtn.addEventListener('click', showResults);

    retakeBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        answers = [];

        document.getElementById('quizQuestion').style.display = 'block';
        document.getElementById('quizControls').style.display = 'flex';
        quizResults.style.display = 'none';

        loadQuestion(0);
    });

    // Initialize quiz
    loadQuestion(0);
}

function updateThemeIcon() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');

    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}