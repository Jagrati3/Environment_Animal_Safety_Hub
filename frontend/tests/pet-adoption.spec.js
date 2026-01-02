import { test, expect } from '@playwright/test';

test('pet adoption modal keyboard accessibility', async ({ page }) => {
  // Visit the static page served by the webServer defined in playwright.config.js
  await page.goto('/pages/pet-adoption.html');

  const firstCard = page.getByRole('button', { name: 'Luna' });
  await expect(firstCard).toBeVisible();

  // Focus like a keyboard user
  await firstCard.focus();
  await expect(firstCard).toBeFocused();

  // Open modal with Enter
  await page.keyboard.press('Enter');

  const modal = page.locator('#pet-modal');
  await expect(modal).toHaveAttribute('aria-hidden', 'false');

  // Close button should be focused first
  const closeBtn = page.getByRole('button', { name: 'Close details' });
  await expect(closeBtn).toBeFocused();

  // Tab moves to adopt button
  await page.keyboard.press('Tab');
  const adoptBtn = page.getByRole('button', { name: 'Adopt this pet' });
  await expect(adoptBtn).toBeFocused();

  // Shift+Tab should go back to close button
  await page.keyboard.down('Shift');
  await page.keyboard.press('Tab');
  await page.keyboard.up('Shift');
  await expect(closeBtn).toBeFocused();

  // Escape closes modal and restores focus to the card
  await page.keyboard.press('Escape');
  await expect(modal).toHaveAttribute('aria-hidden', 'true');
  await expect(firstCard).toBeFocused();
});