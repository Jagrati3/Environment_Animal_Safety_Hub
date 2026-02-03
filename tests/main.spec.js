// @ts-check
import { test, expect } from '@playwright/test';

/**
 * Basic Tests for Environment & Animal Safety Hub
 * These tests verify core functionality of the frontend
 */

test.describe('Homepage Tests', () => {
    test('should load index.html with status 200', async ({ page }) => {
        const response = await page.goto('/');

        // Verify the page loads successfully
        expect(response?.status()).toBe(200);

        // Verify the page has a title
        await expect(page).toHaveTitle(/EcoLife|Protect.*Planet/i);
    });

    test('should have main content visible', async ({ page }) => {
        await page.goto('/');

        // Wait for the main content to be visible
        const mainContent = page.locator('#main-content');
        await expect(mainContent).toBeVisible();
    });

    test('should have hero section with title', async ({ page }) => {
        await page.goto('/');

        // Check for hero title
        const heroTitle = page.locator('.hero-title, #hero-title, h1').first();
        await expect(heroTitle).toBeVisible();
    });
});

test.describe('Navigation Tests', () => {
    test('should have navbar visible', async ({ page }) => {
        await page.goto('/');

        // Wait for navbar to be loaded (it might be dynamically loaded)
        await page.waitForTimeout(1000);

        // Check if navbar exists
        const navbar = page.locator('.navbar, #navbar, nav');
        await expect(navbar).toBeVisible();
    });

    test('navbar links should not be broken', async ({ page }) => {
        await page.goto('/');

        // Wait for navbar to be loaded
        await page.waitForTimeout(1500);

        // Get all navigation links
        const navLinks = page.locator('.nav-links a, .nav-link, nav a');
        const count = await navLinks.count();

        // Verify there are navigation links
        expect(count).toBeGreaterThan(0);

        // Check that each visible link has an href attribute
        for (let i = 0; i < Math.min(count, 10); i++) {
            const link = navLinks.nth(i);
            const isVisible = await link.isVisible();

            if (isVisible) {
                const href = await link.getAttribute('href');
                // Links should have href (even if it's # or javascript:void(0))
                expect(href).not.toBeNull();
            }
        }
    });

    test('Home link should be accessible', async ({ page }) => {
        await page.goto('/');

        // Wait for page to load
        await page.waitForTimeout(1000);

        // Find home link
        const homeLink = page.locator('a:has-text("Home"), a[href*="index"], .logo');
        await expect(homeLink.first()).toBeVisible();
    });
});

test.describe('Kids Quiz Navigation', () => {
    test('Kids Quiz button should be visible and navigable', async ({ page }) => {
        await page.goto('/');

        // Wait for navbar to load
        await page.waitForTimeout(1500);

        // Find Kids Quiz link
        const kidsQuizLink = page.locator('a:has-text("Kids Quiz"), .btn-quiz-highlight');

        // Check if the link exists
        const count = await kidsQuizLink.count();

        if (count > 0) {
            // Verify the link is visible
            await expect(kidsQuizLink.first()).toBeVisible();

            // Get the href
            const href = await kidsQuizLink.first().getAttribute('href');
            expect(href).toContain('kids');
        }
    });

    test('Kids Quiz page should load correctly', async ({ page }) => {
        // Try to navigate to the kids quiz page
        const response = await page.goto('/pages/games/kids-zone.html');

        // The page should load (200) or redirect to another page
        expect([200, 304]).toContain(response?.status() || 0);
    });
});

test.describe('Accessibility Tests', () => {
    test('page should have proper document structure', async ({ page }) => {
        await page.goto('/');

        // Check for proper HTML structure
        const html = page.locator('html');
        await expect(html).toHaveAttribute('lang');

        // Check for title
        const title = await page.title();
        expect(title.length).toBeGreaterThan(0);
    });

    test('images should have alt attributes', async ({ page }) => {
        await page.goto('/');

        // Get all images
        const images = page.locator('img');
        const count = await images.count();

        // Check first 10 images for alt attributes
        for (let i = 0; i < Math.min(count, 10); i++) {
            const img = images.nth(i);
            const alt = await img.getAttribute('alt');
            // Images should have alt attribute (can be empty for decorative images)
            expect(alt).not.toBeNull();
        }
    });
});

test.describe('Performance Tests', () => {
    test('page should load within reasonable time', async ({ page }) => {
        const startTime = Date.now();

        await page.goto('/', { waitUntil: 'domcontentloaded' });

        const loadTime = Date.now() - startTime;

        // Page should load within 10 seconds
        expect(loadTime).toBeLessThan(10000);
    });
});
