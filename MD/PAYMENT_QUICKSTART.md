# Payment Gateway Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies (1 min)

```bash
cd backend
npm install
```

The following packages are now included:
- `stripe` - Stripe payment processing
- `@paypal/checkout-server-sdk` - PayPal checkout
- `paypal-rest-sdk` - PayPal REST API

### Step 2: Get Your API Keys (2 min)

#### Option A: Test Mode (Recommended for testing)

**Stripe Test Keys:**
1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy your test keys (they start with `pk_test_` and `sk_test_`)

**PayPal Sandbox:**
1. Go to https://developer.paypal.com/developer/applications
2. Create a sandbox app
3. Copy your sandbox Client ID and Secret

#### Option B: Live Mode (Production)

⚠️ **Only use live keys in production!**

**Stripe Live Keys:**
1. Activate your Stripe account
2. Go to https://dashboard.stripe.com/apikeys
3. Copy your live keys (start with `pk_live_` and `sk_live_`)

**PayPal Live:**
1. Complete business verification
2. Switch to live mode in developer dashboard
3. Create a live app

### Step 3: Configure Environment (1 min)

Create `.env` file in `backend/` directory:

```bash
cp .env.example .env
```

Edit `.env` and add your keys:

```env
# Stripe (Test Mode)
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE

# PayPal (Sandbox)
PAYPAL_CLIENT_ID=YOUR_CLIENT_ID_HERE
PAYPAL_CLIENT_SECRET=YOUR_SECRET_HERE
PAYPAL_WEBHOOK_ID=YOUR_WEBHOOK_ID_HERE

NODE_ENV=development
PORT=5000
```

### Step 4: Update Frontend Keys (30 sec)

**File: `frontend/js/donation-form.js`**

```javascript
// Line 27 - Replace with your Stripe publishable key
const stripeKey = 'pk_test_YOUR_ACTUAL_STRIPE_KEY';
```

**File: `frontend/pages/donation-form.html`**

```html
<!-- Line 10 - Replace with your PayPal client ID -->
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD"></script>
```

### Step 5: Start the Server (30 sec)

```bash
# From backend directory
npm start

# Or with nodemon for development
npm run dev
```

Server should start on `http://localhost:5000`

---

## ✅ Test Your Integration

### Test One-Time Donation

1. Open http://localhost:3000/frontend/pages/donation-form.html
2. Select amount ($100 recommended)
3. Fill in donor details:
   - Name: Test Donor
   - Email: test@example.com
4. Click "Continue to Payment"
5. Use test card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., 12/25)
   - CVC: Any 3 digits (e.g., 123)
6. Click "Complete Donation"
7. ✅ Success! You should see confirmation page

### Test PayPal

1. Select PayPal payment method
2. Click the PayPal button
3. Log in with sandbox buyer account
4. Complete payment
5. ✅ Success!

---

## 🎯 Quick Reference

### Test Credit Cards

```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0027 6000 3184
```

### API Endpoints

```
POST /api/payments/stripe/create-payment-intent
POST /api/payments/paypal/create-order
POST /api/payments/webhooks/stripe
POST /api/payments/webhooks/paypal
```

### Key Files

```
Backend:
├── config/payment.js           # Payment configuration
├── services/stripeService.js   # Stripe logic
├── services/paypalService.js   # PayPal logic
└── routes/payments.js          # API routes

Frontend:
├── pages/donation-form.html    # Donation form
├── js/payment-processor.js     # Payment logic
└── js/donation-form.js         # Form handler
```

---

## 🐛 Common Issues & Fixes

### Issue: "Stripe is not defined"
**Fix:** Check that Stripe.js is loaded in HTML:
```html
<script src="https://js.stripe.com/v3/"></script>
```

### Issue: "Invalid API key"
**Fix:** 
1. Check `.env` file exists in `backend/` directory
2. Verify keys are correct (no extra spaces)
3. Restart server after updating `.env`

### Issue: "CORS error"
**Fix:** Add CORS middleware in `server.js`:
```javascript
const cors = require('cors');
app.use(cors());
```

### Issue: PayPal buttons not showing
**Fix:**
1. Check PayPal SDK script is loaded
2. Verify client ID is correct
3. Ensure element `#paypal-button-container` exists

---

## 🎉 You're Ready!

Your payment system is now configured! Donors can:

✅ Make one-time donations  
✅ Set up recurring donations  
✅ Use credit cards (Stripe)  
✅ Use PayPal  
✅ See donation impact  
✅ Receive receipts  

---

## 📝 Next Steps

1. **Test Webhooks**: Set up ngrok for local webhook testing
2. **Customize Amounts**: Edit giving levels in donation-form.html
3. **Add Email Receipts**: Configure SMTP settings in .env
4. **Production Deploy**: Switch to live API keys

---

## 💡 Need Help?

- Check [PAYMENT_GATEWAY_INTEGRATION.md](c:\Users\ayaan shaikh\Documents\EWOC\ENVIRONMENTAL\PAYMENT_GATEWAY_INTEGRATION.md) for detailed documentation
- Review Stripe docs: https://stripe.com/docs
- Review PayPal docs: https://developer.paypal.com/docs

---

**Happy fundraising! 💚**
