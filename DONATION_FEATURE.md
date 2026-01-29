# Eco-Fund: Crowdfunding for Environmental Projects

## Overview
The "Eco-Fund" feature integrates a secure donation platform that allows users to financially support verified environmental NGOs, local shelters, or community-led green initiatives directly through the website.

## Features Implemented

### 1. Campaign Showcase
- Displays various environmental campaigns with progress bars
- Shows funding goals, current amounts raised, and donor lists
- Responsive cards for easy browsing

### 2. Secure Donation Process
- User-friendly donation form with preset amount buttons
- Custom donation amount option
- Optional donor recognition

### 3. Payment Integration Ready
- Designed to integrate with Stripe or PayPal APIs
- Secure transaction handling

### 4. Progress Tracking
- Visual progress bars showing funds raised vs. targets
- Percentage completion indicators
- Remaining amount displays

### 5. Donor Recognition
- Optional donor wall for contributors
- Anonymous donation option

## Technical Implementation

### Files Created:
- `frontend/css/components/donation.css` - Styling for donation components
- `frontend/js/donation.js` - JavaScript functionality for donation features
- `frontend/pages/donation.html` - Dedicated donation page
- Updated `frontend/components/navbar.html` - Added Eco-Fund link to navigation
- Updated `frontend/index.html` - Integrated donation section into homepage

### How to Extend:
1. **Payment Gateway Integration**: Connect to Stripe/PayPal APIs by implementing the payment processing functions in `donation.js`
2. **Backend Integration**: Connect to a backend service to store campaign data and donation records
3. **Verification System**: Implement NGO/organization verification system

## Benefits

### For Users:
- Easy financial contribution to environmental causes
- Transparency in fund usage
- Flexible donation amounts

### For Platform:
- Additional revenue stream for maintenance
- Increased user engagement
- Community building around environmental causes

## Security Considerations
- Payment processing happens through secure third-party gateways
- No sensitive financial data stored on our servers
- SSL encryption for all transactions

## Future Enhancements
- Recurring donation options
- Campaign creator dashboards
- Social sharing of donations
- Tax receipt generation
- Multi-language support for international donations