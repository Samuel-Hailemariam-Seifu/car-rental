import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should display the homepage with all sections', async ({ page }) => {
    await page.goto('/')

    // Check if the main heading is visible
    await expect(page.getByRole('heading', { name: /rent cars from trusted owners/i })).toBeVisible()

    // Check if the search bar is present
    await expect(page.getByPlaceholder('Where are you going?')).toBeVisible()

    // Check if the sign-in and sign-up buttons are present
    await expect(page.getByRole('link', { name: /sign in/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /get started/i })).toBeVisible()

    // Check if the features section is present
    await expect(page.getByText('Why Choose CarRental?')).toBeVisible()

    // Check if the popular cars section is present
    await expect(page.getByText('Popular Cars')).toBeVisible()

    // Check if the footer is present
    await expect(page.getByText('CarRental')).toBeVisible()
  })

  test('should navigate to sign-in page', async ({ page }) => {
    await page.goto('/')
    
    await page.getByRole('link', { name: /sign in/i }).click()
    
    await expect(page).toHaveURL('/sign-in')
    await expect(page.getByText('Sign in to your account')).toBeVisible()
  })

  test('should navigate to sign-up page', async ({ page }) => {
    await page.goto('/')
    
    await page.getByRole('link', { name: /get started/i }).click()
    
    await expect(page).toHaveURL('/sign-up')
    await expect(page.getByText('Create your account')).toBeVisible()
  })
})
