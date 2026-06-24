import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactPage extends BasePage {

    //  DECLARE properties for the locators of the contact page elements
    readonly contactLink: Locator;
    readonly forename: Locator;
    readonly email: Locator;
    readonly message: Locator;
    readonly submitButton: Locator;

    //  ASSIGN the locators to the properties in the constructor
    constructor(page: Page) {
        super(page);   // passes page up to BasePage so that the instance of BasePage (page) can be used
        this.contactLink = page.getByRole('link', { name: 'Contact' });
        this.forename = page.getByRole('textbox', { name: 'Forename *' });
        this.email = page.getByRole('textbox', { name: 'Email *' });
        this.message = page.getByRole('textbox', { name: 'Message *' });
        this.submitButton = page.getByRole('link', { name: 'Submit' });
    }

    // Methods to interact with the contact page elements which will be called in the step definitions file (ContactPageSteps.ts)

    //Method to open the contact page
    async open() {
        await this.contactLink.click();
    }

    //Method to fill all the mandatory fields in the contact form
    async fillMandatoryFields(forename: string, email: string, message: string) {
        await this.forename.fill(forename);
        await this.email.fill(email);
        await this.message.fill(message);
    }

    // Click the submit button to submit the contact form
    async clickSubmit() {
        await this.submitButton.click();
    }
}