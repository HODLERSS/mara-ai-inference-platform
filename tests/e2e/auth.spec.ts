import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('should display login form on sign in page', async ({ page }) => {
    await page.goto('/auth/signin')

    await expect(page.locator('h1')).toContainText('Sign In')
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('should show validation errors for invalid input', async ({ page }) => {
    await page.goto('/auth/signin')

    await page.fill('input[type="email"]', 'invalid-email')
    await page.fill('input[type="password"]', 'short')
    await page.click('button[type="submit"]')

    await expect(page.locator('text=Invalid email address')).toBeVisible()
    await expect(page.locator('text=Password must be at least 8 characters')).toBeVisible()
  })

  test('should navigate to home page from root', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('h1')).toContainText('MARA AI Inference Platform')
    await expect(page.locator('h2')).toContainText('Project Sapien')
  })
})