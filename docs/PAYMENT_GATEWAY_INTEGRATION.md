# Payment Gateway Integration & Donation Processing

## 🎯 Overview

Complete payment gateway integration for EWOC's donation system with **Stripe** and **PayPal** support, featuring real-time payment processing, recurring donations, one-click giving, and enhanced donation forms.

---

## ✨ Features Implemented

### 1. **Stripe Integration** 💳

#### Core Features:
- ✅ Credit/debit card processing with Stripe Elements
- ✅ Secure tokenization for recurring donations
- ✅ PCI-compliant payment handling
- ✅ Customer creation and management
- ✅ Payment method storage for one-click donations
- ✅ Real-time payment validation

#### Subscription Management:
- ✅ Create monthly/annual recurring subscriptions
- ✅ Update subscription amounts and intervals
- ✅ Cancel subscriptions (immediate or at period end)
- ✅ Automatic retry for failed payments

#### Refunds & Disputes:
- ✅ Full and partial refund processing
- ✅ Refund tracking and reporting
- ✅ Reason codes for refunds

#### Webhooks:
- ✅ `payment_intent.succeeded` - Successful payment
- ✅ `payment_intent.payment_failed` - Failed payment
- ✅ `customer.subscription.created` - New subscription
- ✅ `customer.subscription.updated` - Subscription changes
- ✅ `customer.subscription.deleted` - Cancelled subscription
- ✅ `charge.refunded` - Refund processed

---

### 2. **PayPal Integration** 🅿️

#### Core Features:
- ✅ PayPal Checkout integration
- ✅ Express checkout flow
- ✅ Order creation and capture
- ✅ Smart payment buttons

#### Subscriptions:
- ✅ Recurring PayPal subscriptions
- ✅ Billing plan management
- ✅ Subscription cancellation

#### IPN & Webhooks:
- ✅ Instant Payment Notification (IPN) handling
- ✅ Webhook verification
- ✅ Payment status updates
- ✅ Subscription event handling

---

### 3. **Enhanced Donation Forms** 📝

#### Multi-Step Form Flow:
1. **Step 1: Amount Selection**
   - Giving level presets ($25, $50, $100, $250, $500, $1000)
   - Custom amount input
   - Donation type selector (one-time, monthly, annual)
   - Real-time impact calculator

2. **Step 2: Donor Details**
   - Personal information form
   - Address collection
   - Donation purpose selection
   - Tribute/memorial giving with honoree notifications
   - Anonymous donation option

3. **Step 3: Payment**
   - Payment method selection (Stripe/PayPal)
   - Embedded Stripe Elements for card entry
   - PayPal Smart Buttons
   - Saved payment methods for returning donors
   - Donation summary display

4. **Step 4: Confirmation**
   - Transaction details
   - Receipt information
   - Impact statement
   - Social sharing options

#### Giving Level Presets:
```javascript
$25  - Feeds 5 animals for a day
$50  - Provides medical care for 1 animal
$100 - Supports 1 animal for a week (Most Popular)
$250 - Sponsors an endangered species
$500 - Funds habitat restoration
$1000 - Major conservation impact
```

#### Special Donation Types:
- **Tribute Giving**: Honor someone with a donation
- **Memorial Giving**: Remember a loved one
- **Recipient Notifications**: Email notifications to honorees/families
- **Anonymous Donations**: Keep donor identity private

---

## 📁 File Structure

```
backend/
├── config/
│   └── payment.js                 # Payment gateway configuration
├── services/
│   ├── stripeService.js          # Stripe payment service
│   └── paypalService.js          # PayPal payment service
├── routes/
│   └── payments.js               # Payment API routes & webhooks
├── models/
│   └── Donation.js               # Updated with payment fields
└── .env.example                  # Environment configuration template

frontend/
├── pages/
│   └── donation-form.html        # Enhanced donation form
├── js/
│   ├── payment-processor.js      # Payment processing logic
│   └── donation-form.js          # Form handler & validation
└── css/
    └── payment-form.css          # Payment form styles
```

---

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install stripe @paypal/checkout-server-sdk paypal-rest-sdk
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# PayPal
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_WEBHOOK_ID=...

NODE_ENV=development
```

### 3. Get API Keys

#### Stripe Setup:
1. Sign up at [stripe.com](https://stripe.com)
2. Go to **Developers → API Keys**
3. Copy your **Publishable** and **Secret** keys
4. Set up webhooks at **Developers → Webhooks**
5. Add endpoint: `https://yourdomain.com/api/payments/webhooks/stripe`
6. Copy the **Webhook Secret**

#### PayPal Setup:
1. Sign up at [developer.paypal.com](https://developer.paypal.com)
2. Create an app in the **Dashboard**
3. Copy your **Client ID** and **Secret**
4. Set up webhooks in **App Settings**
5. Add webhook: `https://yourdomain.com/api/payments/webhooks/paypal`

### 4. Update Frontend Keys

Edit [donation-form.js](c:\Users\ayaan shaikh\Documents\EWOC\ENVIRONMENTAL\frontend\js\donation-form.js):

```javascript
// Line 27: Replace with your Stripe publishable key
const stripeKey = 'pk_test_YOUR_ACTUAL_KEY';
```

Edit [donation-form.html](c:\Users\ayaan shaikh\Documents\EWOC\ENVIRONMENTAL\frontend\pages\donation-form.html):

```html
<!-- Line 10: Replace with your PayPal client ID -->
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=USD"></script>
```

### 5. Register Payment Routes

In your main server file (e.g., `server.js`):

```javascript
const paymentRoutes = require('./backend/routes/payments');
app.use('/api/payments', paymentRoutes);
```

### 6. Test Webhooks Locally

Use **ngrok** or **Stripe CLI** for local testing:

```bash
# Install Stripe CLI
stripe listen --forward-to localhost:5000/api/payments/webhooks/stripe

# Or use ngrok
ngrok http 5000
```

---

## 🔌 API Endpoints

### Stripe Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payments/stripe/create-payment-intent` | Create payment intent |
| POST | `/api/payments/stripe/create-customer` | Create customer |
| POST | `/api/payments/stripe/create-setup-intent` | Setup for saved cards |
| POST | `/api/payments/stripe/create-subscription` | Create subscription |
| POST | `/api/payments/stripe/cancel-subscription` | Cancel subscription |
| POST | `/api/payments/stripe/refund` | Process refund |
| GET | `/api/payments/stripe/payment-methods/:customerId` | List payment methods |

### PayPal Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payments/paypal/create-order` | Create PayPal order |
| POST | `/api/payments/paypal/capture-order` | Capture order |
| POST | `/api/payments/paypal/create-subscription` | Create subscription |
| POST | `/api/payments/paypal/cancel-subscription` | Cancel subscription |
| POST | `/api/payments/paypal/refund` | Process refund |

### Webhook Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payments/webhooks/stripe` | Stripe webhook handler |
| POST | `/api/payments/webhooks/paypal` | PayPal webhook handler |
| POST | `/api/payments/ipn/paypal` | PayPal IPN handler |

---

## 💻 Usage Examples

### One-Time Donation (Stripe)

```javascript
// Frontend
const result = await paymentProcessor.processOneTimeDonation(
    100,  // $100
    {
        donorId: 'DNR-2026-00123',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-1234'
    },
    {
        purpose: 'wildlife-rescue',
        campaignId: 'CAMP-001'
    }
);
```

### Recurring Donation (Stripe)

```javascript
const result = await paymentProcessor.setupRecurringDonation(
    50,      // $50
    'month', // monthly
    donorData,
    true     // save card
);
```

### One-Click Donation

```javascript
const result = await paymentProcessor.processOneClickDonation(
    75,              // $75
    'cus_ABC123',    // customer ID
    'pm_XYZ789',     // saved payment method
    { campaignId: 'CAMP-002' }
);
```

### PayPal Donation

```javascript
// PayPal handles this via Smart Buttons
paymentProcessor.initializePayPalButtons(
    'paypal-button-container',
    100,
    donorData,
    onSuccess,
    onError
);
```

---

## 🧪 Testing

### Test Cards (Stripe)

| Card Number | Type | Result |
|-------------|------|--------|
| 4242 4242 4242 4242 | Visa | Success |
| 4000 0000 0000 0002 | Visa | Decline |
| 4000 0000 0000 9995 | Visa | Insufficient funds |
| 5555 5555 5555 4444 | Mastercard | Success |

Use any future expiry date and any 3-digit CVC.

### Test PayPal

Use PayPal Sandbox accounts:
- Buyer account: Create at [developer.paypal.com](https://developer.paypal.com/developer/accounts)
- Seller account: Automatically provided with app

---

## 🔒 Security Features

- ✅ PCI DSS compliant (Stripe Elements)
- ✅ Tokenization - no card data stored
- ✅ Webhook signature verification
- ✅ HTTPS required in production
- ✅ Input validation and sanitization
- ✅ Rate limiting recommended
- ✅ CSRF protection

---

## 📊 Database Schema Updates

### Donation Model Additions:

```javascript
paymentGateway: {
    gateway: String,           // 'stripe' or 'paypal'
    customerId: String,        // Gateway customer ID
    paymentMethodId: String,   // Saved payment method
    subscriptionId: String     // For recurring donations
},

refundDetails: {
    refundId: String,
    refundAmount: Number,
    refundDate: Date,
    reason: String
}
```

---

## 📈 Analytics & Reporting

Track these metrics:
- Total donations by payment method
- Conversion rate by payment type
- Average donation amount
- Recurring vs one-time ratio
- Refund rate
- Payment failure rate
- Popular giving levels

---

## 🐛 Troubleshooting

### Common Issues:

**1. "Stripe is not defined"**
- Ensure Stripe.js is loaded: `<script src="https://js.stripe.com/v3/"></script>`

**2. "Invalid API key"**
- Check `.env` file has correct keys
- Restart server after updating `.env`

**3. "Webhook signature verification failed"**
- Verify webhook secret matches Stripe dashboard
- Check raw body is passed to webhook handler

**4. "PayPal buttons not rendering"**
- Verify PayPal SDK script is loaded
- Check client ID is correct
- Ensure container element exists

---

## 🚀 Deployment Checklist

- [ ] Replace test API keys with live keys
- [ ] Set `NODE_ENV=production` in `.env`
- [ ] Enable HTTPS on server
- [ ] Configure production webhook URLs
- [ ] Set up email notifications for receipts
- [ ] Enable logging and monitoring
- [ ] Test all payment flows in production
- [ ] Set up backup payment processing
- [ ] Configure automatic retry for failed payments
- [ ] Set up fraud detection rules

---

## 📚 Additional Resources

- [Stripe API Documentation](https://stripe.com/docs/api)
- [PayPal Checkout Integration](https://developer.paypal.com/docs/checkout/)
- [Stripe Elements Customization](https://stripe.com/docs/stripe-js)
- [PayPal Webhooks](https://developer.paypal.com/docs/api-basics/notifications/)

---

## 🎉 Success!

Your payment gateway integration is complete! Donors can now:
- ✅ Make one-time donations
- ✅ Set up recurring monthly/annual donations
- ✅ Use saved payment methods for one-click giving
- ✅ Choose between credit cards and PayPal
- ✅ Make tribute/memorial donations
- ✅ See real-time impact of their donations

**Next Steps:**
1. Install dependencies: `npm install`
2. Configure `.env` with your API keys
3. Start backend server
4. Test donation flow
5. Deploy to production

---

## 💡 Support

For issues or questions:
- Check the troubleshooting section
- Review API documentation
- Test with sandbox/test credentials first
- Monitor webhook logs for errors

---

**Built with ❤️ for EWOC - Environmental & Wildlife Conservation**
