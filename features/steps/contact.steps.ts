import { expect } from '@playwright/test';
import { Given, When, Then } from '../fixtures';

Given('I am on the Contact page', async ({ contactPage }) => {
    await contactPage.goto('/#/contact');
});

When('I submit the form without entering any data', async ({ contactPage }) => {
    await contactPage.clickSubmit();
});

Then('I should see validation errors for the mandatory fields', async ({ contactPage }) => {
    await expect(contactPage.forenameError).toBeVisible();
    await expect(contactPage.emailError).toBeVisible();
    await expect(contactPage.messageError).toBeVisible();
    await expect(contactPage.errorBanner).toBeVisible();
});

When('I fill in the mandatory fields with valid data', async ({ contactPage }) => {
    await contactPage.fillMandatoryFields('Yahya', 'yahya@example.com', 'This is a test message.');
});

Then('the validation errors should no longer be displayed', async ({ contactPage }) => {
    await expect(contactPage.forenameError).toBeHidden();
    await expect(contactPage.emailError).toBeHidden();
    await expect(contactPage.messageError).toBeHidden();
    await expect(contactPage.errorBanner).toBeHidden();
});