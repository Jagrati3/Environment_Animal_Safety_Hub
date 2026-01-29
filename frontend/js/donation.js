// Donation/Crowdfunding Feature JavaScript

// Sample campaign data
const campaigns = [
    {
        id: 1,
        title: "Winter Blankets for Shelter Dogs",
        description: "Help us buy warm blankets for dogs at local shelters during winter months. Every blanket keeps a furry friend warm and comfortable.",
        image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        targetAmount: 500,
        currentAmount: 320,
        donors: ["Sarah M.", "John D.", "Emma L.", "Mike T."]
    },
    {
        id: 2,
        title: "Tree Plantation Drive",
        description: "Support our mission to plant 1000 native trees in deforested areas. Each tree absorbs CO2 and provides habitat for wildlife.",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        targetAmount: 2000,
        currentAmount: 1200,
        donors: ["Green Earth Org", "Local School", "City Council", "Eco Club"]
    },
    {
        id: 3,
        title: "Marine Cleanup Initiative",
        description: "Fund equipment for volunteers to clean beaches and coastal areas, protecting marine life from plastic pollution.",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        targetAmount: 1500,
        currentAmount: 850,
        donors: ["Ocean Protectors", "Surf Club", "Local Business"]
    }
];

// DOM elements
let donationModal, donationForm, donationAmountInput, donationCampaignSelect;

document.addEventListener('DOMContentLoaded', function() {
    initializeDonationFeature();
});

function initializeDonationFeature() {
    // Create donation section HTML
    createDonationSection();
    
    // Initialize modal
    donationModal = document.getElementById('donation-modal');
    
    // Initialize form elements
    donationForm = document.getElementById('donation-form');
    donationAmountInput = document.getElementById('donation-amount');
    donationCampaignSelect = document.getElementById('donation-campaign');
    
    // Set up event listeners
    setupEventListeners();
    
    // Render campaigns
    renderCampaigns();
    
    // Populate campaign dropdown
    populateCampaignDropdown();
}

function createDonationSection() {
    // Check if donation section already exists
    if (document.querySelector('.donation-section')) return;
    
    // Find a suitable place to insert the donation section (after the hero section)
    const heroSection = document.querySelector('#home') || document.querySelector('section');
    if (!heroSection) return;
    
    const donationSection = document.createElement('section');
    donationSection.className = 'donation-section';
    donationSection.id = 'donation';
    donationSection.innerHTML = `
        <div class="donation-container">
            <div class="donation-header">
                <span class="section-tag">
                    <i class="fa-solid fa-heart"></i> Eco-Fund
                </span>
                <h2>Support Environmental Causes</h2>
                <p>Help verified environmental NGOs, local shelters, and community-led green initiatives through our secure donation platform.</p>
            </div>
            
            <div class="campaigns-grid" id="campaigns-container">
                <!-- Campaigns will be rendered here -->
            </div>
            
            <div class="donation-form" id="donation-form-container">
                <h3>Make a Donation</h3>
                <form id="donation-form">
                    <div class="form-group">
                        <label for="donation-campaign">Select Campaign</label>
                        <select id="donation-campaign" required>
                            <option value="">Choose a campaign...</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="donation-amount">Donation Amount ($)</label>
                        <div class="amount-buttons">
                            <button type="button" class="amount-button" data-amount="10">$10</button>
                            <button type="button" class="amount-button" data-amount="25">$25</button>
                            <button type="button" class="amount-button" data-amount="50">$50</button>
                            <button type="button" class="amount-button" data-amount="100">$100</button>
                        </div>
                        <input type="number" id="donation-amount" placeholder="Enter custom amount" min="1" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="donor-name">Your Name (optional)</label>
                        <input type="text" id="donor-name" placeholder="Enter your name for donor wall">
                    </div>
                    
                    <button type="submit" class="donation-btn">
                        <i class="fa-solid fa-heart"></i> Donate Securely
                    </button>
                </form>
            </div>
        </div>
        
        <div class="modal" id="donation-modal">
            <div class="modal-content">
                <span class="close-modal" id="close-donation-modal">&times;</span>
                <div class="donation-success">
                    <i class="fa-solid fa-check-circle"></i>
                </div>
                <h3>Thank You for Your Donation!</h3>
                <p class="donation-thanks" id="donation-thanks">Your contribution makes a real difference!</p>
                <p>Your donation helps protect our environment and support important causes.</p>
            </div>
        </div>
    `;
    
    heroSection.parentNode.insertBefore(donationSection, heroSection.nextSibling);
}

function setupEventListeners() {
    // Close modal button
    document.getElementById('close-donation-modal').addEventListener('click', () => {
        donationModal.classList.remove('active');
    });
    
    // Modal backdrop click
    donationModal.addEventListener('click', (e) => {
        if (e.target === donationModal) {
            donationModal.classList.remove('active');
        }
    });
    
    // Amount buttons
    document.querySelectorAll('.amount-button').forEach(button => {
        button.addEventListener('click', function() {
            const amount = this.getAttribute('data-amount');
            donationAmountInput.value = amount;
            
            // Update active state
            document.querySelectorAll('.amount-button').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Form submission
    donationForm.addEventListener('submit', handleDonationSubmit);
}

function renderCampaigns() {
    const container = document.getElementById('campaigns-container');
    container.innerHTML = '';
    
    campaigns.forEach(campaign => {
        const progressPercent = Math.min(100, (campaign.currentAmount / campaign.targetAmount) * 100);
        
        const campaignElement = document.createElement('div');
        campaignElement.className = 'campaign-card';
        campaignElement.innerHTML = `
            <div class="campaign-image">
                <img src="${campaign.image}" alt="${campaign.title}">
            </div>
            <div class="campaign-content">
                <h3 class="campaign-title">${campaign.title}</h3>
                <p class="campaign-description">${campaign.description}</p>
                
                <div class="funding-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressPercent}%"></div>
                    </div>
                    <div class="progress-text">
                        <span>$${campaign.currentAmount} raised</span>
                        <span>Goal: $${campaign.targetAmount}</span>
                    </div>
                </div>
                
                <div class="campaign-stats">
                    <div class="stat-item">
                        <span class="stat-number">${campaign.donors.length}</span>
                        <span class="stat-label">Donors</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${Math.round(progressPercent)}%</span>
                        <span class="stat-label">Complete</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">$${campaign.targetAmount - campaign.currentAmount}</span>
                        <span class="stat-label">Remaining</span>
                    </div>
                </div>
                
                <div class="donor-wall">
                    <h4>Recent Donors</h4>
                    <div class="donor-list">
                        ${campaign.donors.slice(0, 5).map(donor => 
                            `<span class="donor-item">${donor}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(campaignElement);
    });
}

function populateCampaignDropdown() {
    const select = document.getElementById('donation-campaign');
    
    campaigns.forEach(campaign => {
        const option = document.createElement('option');
        option.value = campaign.id;
        option.textContent = campaign.title;
        select.appendChild(option);
    });
}

function handleDonationSubmit(e) {
    e.preventDefault();
    
    const campaignId = parseInt(donationCampaignSelect.value);
    const amount = parseFloat(donationAmountInput.value);
    const donorName = document.getElementById('donor-name').value.trim();
    
    if (!campaignId || !amount || amount <= 0) {
        alert('Please select a campaign and enter a valid donation amount.');
        return;
    }
    
    // Find the selected campaign
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) {
        alert('Invalid campaign selected.');
        return;
    }
    
    // Simulate payment processing
    simulatePaymentProcessing(campaign, amount, donorName);
}

function simulatePaymentProcessing(campaign, amount, donorName) {
    // Show loading state
    const submitBtn = donationForm.querySelector('.donation-btn');
    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
    
    // Simulate API call delay
    setTimeout(() => {
        // Update campaign data
        campaign.currentAmount += amount;
        if (donorName) {
            campaign.donors.push(donorName);
        }
        
        // Update UI
        renderCampaigns();
        
        // Show success modal
        showDonationSuccess(campaign, amount, donorName);
        
        // Reset form
        donationForm.reset();
        document.querySelectorAll('.amount-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }, 2000);
}

function showDonationSuccess(campaign, amount, donorName) {
    document.getElementById('donation-thanks').innerHTML = `
        Thank you <strong>${donorName || 'Anonymous'}</strong> for donating <strong>$${amount}</strong> to <strong>${campaign.title}</strong>!
    `;
    donationModal.classList.add('active');
}

// Export functions for global use if needed
window.initializeDonationFeature = initializeDonationFeature;