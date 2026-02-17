/**
 * Payment Gateway Configuration
 * Handles Stripe and PayPal setup
 */

require('dotenv').config();

// Graceful Stripe Initialization
let stripe;
try {
    const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key_for_development_only';
    stripe = require('stripe')(stripeKey);
} catch (error) {
    console.warn('Stripe initialization failed (likely missing API key). Payment features will be disabled.');
    stripe = {
        paymentIntents: {
            create: async () => { throw new Error('Stripe not configured'); }
        }
    };
}

const paypal = require('@paypal/checkout-server-sdk');

// Stripe Configuration
const stripeConfig = {
    secretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_dummy',
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_dummy',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_dummy',
    currency: 'usd',
    stripe: stripe
};

// PayPal Configuration
function paypalEnvironment() {
    const clientId = process.env.PAYPAL_CLIENT_ID || 'dummy_client_id';
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET || 'dummy_client_secret';

    // Use sandbox for testing, live for production
    return process.env.NODE_ENV === 'production'
        ? new paypal.core.LiveEnvironment(clientId, clientSecret)
        : new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

const paypalClient = new paypal.core.PayPalHttpClient(paypalEnvironment());

const paypalConfig = {
    clientId: process.env.PAYPAL_CLIENT_ID || 'dummy_client_id',
    clientSecret: process.env.PAYPAL_CLIENT_SECRET || 'dummy_client_secret',
    webhookId: process.env.PAYPAL_WEBHOOK_ID || 'dummy_webhook_id',
    client: paypalClient
};

module.exports = {
    stripeConfig,
    paypalConfig
};
