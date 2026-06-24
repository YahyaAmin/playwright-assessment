import { test, expect } from '@playwright/test';
import { ContactPage } from '../src/pages/ContactPage';

test.describe('Contact form submission', () => {
    test('displays success message after valid submission', async ({ page }) => {
        const contactPage = new ContactPage(page);

        // navigate to contact page
        await contactPage.goto('/#/contact');

        // fill mandatory fields with valid data
        await contactPage.fillMandatoryFields('Yahya', 'yahya@test.com', 'This is a test message.');

        // click submit
        await contactPage.clickSubmit();

        // wait for the "Sending Feedback" intermediate state to finish
        await expect(contactPage.sendingFeedback).toBeHidden({ timeout: 20000 });

        // then assert the success message text
        await expect(contactPage.successMessage).toContainText('we appreciate your feedback');
    });
});