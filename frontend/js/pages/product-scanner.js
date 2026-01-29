document.addEventListener('DOMContentLoaded', () => {
    let html5QrcodeScanner = null;
    
    // Initialize scanner
    initScanner();
    
    // Setup manual input
    document.getElementById('manualSubmit').addEventListener('click', () => {
        const barcode = document.getElementById('manualBarcode').value.trim();
        if (barcode) {
            if (html5QrcodeScanner && html5QrcodeScanner.getState() === Html5QrcodeScannerState.SCANNING) {
                html5QrcodeScanner.stop().then(() => {
                    fetchProductData(barcode);
                }).catch(err => {
                    console.error("Failed to stop scanner", err);
                    fetchProductData(barcode);
                });
            } else {
                fetchProductData(barcode);
            }
        } else {
            alert("Please enter a barcode");
        }
    });

    // Also allow Enter key on manual input
    document.getElementById('manualBarcode').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('manualSubmit').click();
        }
    });
});

function initScanner() {
    const onScanSuccess = (decodedText, decodedResult) => {
        console.log(`Barcode scanned: ${decodedText}`);
        
        // Stop scanner temporarily
        if (html5QrcodeScanner) {
            html5QrcodeScanner.pause();
        }
        
        // Process the scanned barcode
        fetchProductData(decodedText);
    };

    const onScanFailure = (error) => {
        // Mostly ignore errors - scanner will keep trying
        console.debug("Scan error (usually safe to ignore):", error);
    };

    // Clear any existing scanner
    const readerDiv = document.getElementById("reader");
    readerDiv.innerHTML = "";
    
    // Initialize new scanner
    html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { 
            fps: 10, 
            qrbox: { width: 250, height: 150 },
            formatsToSupport: [
                Html5QrcodeSupportedFormats.EAN_13,
                Html5QrcodeSupportedFormats.EAN_8,
                Html5QrcodeSupportedFormats.UPC_A,
                Html5QrcodeSupportedFormats.UPC_E,
                Html5QrcodeSupportedFormats.CODE_128,
                Html5QrcodeSupportedFormats.QR_CODE
            ]
        },
        false // verbose
    );
    
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
}

async function fetchProductData(barcode) {
    const loader = document.getElementById('loadingSpinner');
    const resultSection = document.getElementById('resultSection');

    // Validate barcode (basic check)
    if (!barcode || barcode.length < 8) {
        alert("Invalid barcode. Please scan a valid product barcode.");
        if (html5QrcodeScanner) {
            html5QrcodeScanner.resume();
        }
        return;
    }

    // Show loader
    loader.style.display = 'block';
    resultSection.style.display = 'none';

    try {
        // Fetch from Open Food Facts API
        const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
        const data = await response.json();

        if (data.status === 1) {
            displayProduct(data.product);
        } else {
            alert("Product not found in our database. Please try another product.");
            // Resume scanner if product not found
            if (html5QrcodeScanner) {
                html5QrcodeScanner.resume();
            }
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error connecting to database. Please check your internet connection.");
        // Resume scanner on error
        if (html5QrcodeScanner) {
            html5QrcodeScanner.resume();
        }
    } finally {
        loader.style.display = 'none';
    }
}

function displayProduct(product) {
    const resultSection = document.getElementById('resultSection');

    // Basic Info
    document.getElementById('productName').textContent = product.product_name || "Unknown Product";
    document.getElementById('productBrand').textContent = product.brands || "Unknown Brand";
    document.getElementById('productImage').src = product.image_url || 'https://via.placeholder.com/300?text=No+Image';
    document.getElementById('productImage').onerror = function() {
        this.src = 'https://via.placeholder.com/300?text=No+Image';
    };

    // Scores
    const scoresContainer = document.getElementById('scoresContainer');
    scoresContainer.innerHTML = '';

    if (product.ecoscore_grade) {
        scoresContainer.innerHTML += createScoreBadge('Eco-Score', product.ecoscore_grade.toUpperCase(), 'eco');
    }

    if (product.nutriscore_grade) {
        scoresContainer.innerHTML += createScoreBadge('Nutri-Score', product.nutriscore_grade.toUpperCase(), 'nutri');
    }

    // If no scores, show message
    if (scoresContainer.innerHTML === '') {
        scoresContainer.innerHTML = '<p class="no-data">No rating data available</p>';
    }

    // Tags (Vegan, Organic, etc.)
    const tagsContainer = document.getElementById('tagsContainer');
    tagsContainer.innerHTML = '';

    const labels = product.labels_tags || [];
    const ingredients = product.ingredients_analysis_tags || [];

    // Helper to check tags
    const hasTag = (arr, term) => arr.some(t => t && t.toLowerCase().includes(term));

    if (hasTag(labels, 'organic')) tagsContainer.innerHTML += `<span class="tag organic"><i class="fas fa-leaf"></i> Organic</span>`;
    if (hasTag(labels, 'vegan') || hasTag(ingredients, 'vegan')) tagsContainer.innerHTML += `<span class="tag vegan"><i class="fas fa-seedling"></i> Vegan</span>`;
    if (hasTag(labels, 'fair-trade')) tagsContainer.innerHTML += `<span class="tag"><i class="fas fa-hand-holding-heart"></i> Fair Trade</span>`;

    // Palm Oil Check
    if (hasTag(ingredients, 'palm-oil') || (product.ingredients_text && product.ingredients_text.toLowerCase().includes('palm'))) {
        tagsContainer.innerHTML += `<span class="tag warning"><i class="fas fa-exclamation-triangle"></i> Contains Palm Oil</span>`;
    } else if (hasTag(ingredients, 'palm-oil-free')) {
        tagsContainer.innerHTML += `<span class="tag palm-oil-free"><i class="fas fa-check"></i> Palm Oil Free</span>`;
    }

    // If no tags, show message
    if (tagsContainer.innerHTML === '') {
        tagsContainer.innerHTML = '<p class="no-data">No special labels detected</p>';
    }

    // Metrics (Packaging, Origin)
    const metricsGrid = document.getElementById('metricsGrid');
    metricsGrid.innerHTML = '';

    if (product.packaging) {
        metricsGrid.innerHTML += createMetricItem('fas fa-box', 'Packaging', product.packaging.split(',')[0]);
    }
    if (product.origins) {
        metricsGrid.innerHTML += createMetricItem('fas fa-globe', 'Origin', product.origins);
    }
    if (product.carbon_footprint_100g) {
        metricsGrid.innerHTML += createMetricItem('fas fa-smog', 'Carbon / 100g', product.carbon_footprint_100g + 'g');
    }
    if (product.quantity) {
        metricsGrid.innerHTML += createMetricItem('fas fa-weight', 'Quantity', product.quantity);
    }

    // If no metrics, show message
    if (metricsGrid.innerHTML === '') {
        metricsGrid.innerHTML = '<p class="no-data">No additional metrics available</p>';
    }

    // Alternatives
    const alternativesSection = document.getElementById('alternativesSection');
    const alternativesList = document.getElementById('alternativesList');

    // Show alternatives if eco score is not A or B
    const ecoScore = product.ecoscore_grade ? product.ecoscore_grade.toLowerCase() : null;
    const categories = product.categories_tags;

    if ((!ecoScore || ecoScore === 'c' || ecoScore === 'd' || ecoScore === 'e') && categories && categories.length > 0) {
        fetchAlternatives(categories[0], product.code);
        alternativesSection.style.display = 'block';
    } else {
        alternativesSection.style.display = 'none';
    }

    // Show result section
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

function createScoreBadge(label, grade, type) {
    const gradeColor = {
        'A': '#2ecc71',
        'B': '#82e0aa',
        'C': '#f1c40f',
        'D': '#e67e22',
        'E': '#e74c3c'
    };
    const color = gradeColor[grade] || '#666';

    return `
    <div class="score-badge" style="border-color: ${color}; color: ${color}; background-color: ${color}15;">
        <i class="fas fa-star"></i> ${label}: ${grade}
    </div>
    `;
}

function createMetricItem(icon, label, value) {
    if (!value) return '';
    // Truncate long values
    if (value.length > 30) value = value.substring(0, 30) + '...';
    return `
    <div class="metric-item">
        <i class="${icon} metric-icon"></i>
        <span class="metric-label">${label}</span>
        <span class="metric-value">${value}</span>
    </div>
    `;
}

async function fetchAlternatives(categoryTag, currentProductCode) {
    const list = document.getElementById('alternativesList');
    list.innerHTML = '<p>Loading alternatives...</p>';

    try {
        // Fetch products in same category with EcoScore A or B, excluding current product
        const response = await fetch(`https://world.openfoodfacts.org/api/v2/search?categories_tags=${categoryTag}&ecoscore_grade=a,b&page_size=4&fields=product_name,image_url,code,brands,ecoscore_grade`);
        const data = await response.json();

        if (data.products && data.products.length > 0) {
            // Filter out current product and limit to 3 alternatives
            const alternatives = data.products
                .filter(p => p.code !== currentProductCode)
                .slice(0, 3);
            
            if (alternatives.length > 0) {
                list.innerHTML = alternatives.map(p => `
                    <div class="alt-card" onclick="fetchProductData('${p.code}')" style="cursor: pointer;">
                        <img src="${p.image_url || 'https://via.placeholder.com/150'}" 
                             class="alt-image" 
                             alt="${p.product_name}"
                             onerror="this.src='https://via.placeholder.com/150'">
                        <div class="alt-name">${p.product_name || 'Alternative Product'}</div>
                        <div class="alt-brand">${p.brands || ''}</div>
                        <div class="alt-score" style="color: #2ecc71; font-weight: bold;">
                            Eco-Score: ${(p.ecoscore_grade || 'A').toUpperCase()}
                        </div>
                    </div>
                `).join('');
            } else {
                list.innerHTML = '<p>No better alternatives found in this category.</p>';
            }
        } else {
            list.innerHTML = '<p>No better alternatives found in this category.</p>';
        }
    } catch (e) {
        console.error("Error fetching alternatives", e);
        list.innerHTML = '<p>Could not load alternatives. Please try again later.</p>';
    }
}

// Resume scanning button (can be called from HTML if needed)
function resumeScanning() {
    if (html5QrcodeScanner) {
        html5QrcodeScanner.resume();
    }
}