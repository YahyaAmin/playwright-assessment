import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { ContactPage } from '../../src/pages/ContactPage';

const { Given, When, Then } = createBdd();

Given('I am on the Contact page', async ({ page }) => {
    const contactPage = new ContactPage(page);
    await contactPage.goto('/#/contact');
});

When('I submit the form without entering any data', async ({ page }) => {
    const contactPage = new ContactPage(page);
    await contactPage.clickSubmit();
});

Then('I should see validation errors for the mandatory fields', async ({ page }) => {
    const contactPage = new ContactPage(page);
    await expect(contactPage.forenameError).toBeVisible();
    await expect(contactPage.emailError).toBeVisible();
    await expect(contactPage.messageError).toBeVisible();
    await expect(contactPage.errorBanner).toBeVisible();
});

When('I fill in the mandatory fields with valid data', async ({ page }) => {
    const contactPage = new ContactPage(page);
    await contactPage.fillMandatoryFields('Yahya', 'yahya@example.com', 'This is a test message.');
});

Then('the validation errors should no longer be displayed', async ({ page }) => {
    const contactPage = new ContactPage(page);
    await expect(contactPage.forenameError).toBeHidden();
    await expect(contactPage.emailError).toBeHidden();
    await expect(contactPage.messageError).toBeHidden();
    await expect(contactPage.errorBanner).toBeHidden();
});