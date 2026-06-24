import { test, expect } from '@playwright/test';
import { ContactPage } from '../src/pages/ContactPage';

//TC1 - Contact form validation: Verify that validation errors are displayed when submitting the contact form with empty mandatory fields and that the errors are cleared when valid data is entered.

test.describe('Contact form validation', () => {
    test('shows then clears validation errors', async ({ page }) => {
        const contactPage = new ContactPage(page);

        // navigate to contact page
        await contactPage.goto('/#/contact');

        // submit empty form
        await contactPage.clickSubmit();

        // assert errors visible (+ banner error visible)
        await expect(contactPage.forenameError).toBeVisible();
        await expect(contactPage.emailError).toBeVisible();
        await expect(contactPage.messageError).toBeVisible();
        await expect(contactPage.errorBanner).toBeVisible();

        // fill valid data
        await contactPage.fillMandatoryFields('Yahya', 'yahya@test.com', 'This is a test message.');   

        // assert errors hidden (+ banner hidden)
        await expect(contactPage.forenameError).toBeHidden();
        await expect(contactPage.emailError).toBeHidden();
        await expect(contactPage.messageError).toBeHidden();
        await expect(contactPage.errorBanner).toBeHidden();
    });
});