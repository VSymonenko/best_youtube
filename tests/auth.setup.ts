import 'dotenv/config';

import { expect, test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('https://www.youtube.com/');
  await page.getByLabel('Sign in').click();
  await page.getByLabel('Email or phone').fill(process.env.YOUTUBE_LOGIN);
  await page.getByRole('button', { name: 'Next' }).click();
  const frame = page.frameLocator('iframe[title="reCAPTCHA"]');
  const label = frame.locator('#recaptcha-anchor-label');
  if ((await label.isVisible()) && (await label.textContent())?.includes('not a robot')) {
    const captcha = frame.locator('#recaptcha-anchor');
    await captcha.click();
    // Wait until animation is complete.
    await frame.locator('.recaptcha-checkbox-checked').waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Next' }).click();
  }
  await page.getByLabel('Enter your password').fill(process.env.YOUTUBE_PASS);
  await page.getByRole('button', { name: 'Next' }).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL(/youtube/i);
  await page.waitForSelector('#avatar-btn');

  // End of authentication steps.
  await page.context().storageState({ path: authFile });

});