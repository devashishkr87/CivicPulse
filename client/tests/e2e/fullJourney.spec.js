import { test, expect } from '@playwright/test';
test.describe('CivicPulse Full Journey AC15', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.removeItem('civicpulse-journey'));
        await page.reload();
    });
    test('AC15: Full journey from Stage 1 to Dashboard, finding 71% match', async ({ page }) => {
        // 1. Stage 1 Eligibility
        await page.fill('input[aria-label="Your age"]', '25');
        await page.click('text="Yes, I have one"');
        await page.click('button:has-text("Check My Eligibility")');
        // Assert eligibility message
        const statusMsg = page.locator('div[role="status"]');
        await expect(statusMsg).toBeVisible();
        await expect(statusMsg).toContainText('registered');
        // 2. Stage 2 Education
        // AC4: Learn more modal
        const learnMoreBtns = page.locator('button:has-text("Learn More →")');
        await learnMoreBtns.first().click();
        const modal = page.locator('dialog[open]');
        await expect(modal).toBeVisible();
        // Check for explanation and example
        await expect(page.getByTestId('explanation')).not.toBeEmpty();
        // Wait a bit for the example to show if any
        await page.waitForTimeout(500);
        // Close modal
        await page.click('button[aria-label="Close modal"]');
        await expect(modal).not.toBeVisible();
        // Proceed to voting booth
        const continueBtn = page.locator('button:has-text("Continue to Voting Booth ↓")');
        await continueBtn.click();
        // 3. Stage 3 Voting Booth
        // Vote for Rajesh Kumar (he is hardcoded to give 71% with 5/3/2/1 priorities)
        // Wait for candidates to load
        await page.waitForSelector('text="Vote"');
        // We'll click the first vote button
        const voteBtns = page.locator('button:has-text("Vote")');
        await voteBtns.first().click();
        // Confirm Vote
        const confirmBtn = page.getByTestId('confirm-btn');
        await confirmBtn.click();
        // Verify VVPAT
        const vvpat = page.getByTestId('vvpat-receipt');
        await expect(vvpat).toBeVisible();
        // Proceed to Match
        const proceedBtn = page.getByTestId('proceed-btn');
        await proceedBtn.click();
        // 4. Stage 4 Match Dashboard
        // URL should be /dashboard
        await expect(page).toHaveURL(/.*\/dashboard/);
        // Set state and constituency
        await page.selectOption('select[data-testid="state-select"]', 'Maharashtra');
        await page.selectOption('select[data-testid="constituency-select"]', 'Mumbai North');
        // Set priorities (Economy: 5, Education: 3, Healthcare: 2, Environment: 1)
        await page.fill('input[data-testid="slider-economy"]', '5');
        await page.fill('input[data-testid="slider-education"]', '3');
        await page.fill('input[data-testid="slider-healthcare"]', '2');
        await page.fill('input[data-testid="slider-environment"]', '1');
        // Wait for debounced API call
        await page.waitForTimeout(1000);
        // Assert 71% score
        const score = page.locator('span[data-testid="match-score"]:has-text("71%")').first();
        await expect(score).toBeVisible({ timeout: 10000 });
        // Assert exact footer text
        const footerText = page.locator('p[data-testid="footer-text"]').first();
        await expect(footerText).toHaveText("This score is calculated based on your stated priorities and the candidate's declared policy positions.");
    });
});
