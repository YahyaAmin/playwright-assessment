import { Page } from '@playwright/test';

// BasePage for other pages to extend and use the common functions
export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Helper method to navigate to a specific path
    async goto(path: string): Promise<void> {
        await this.page.goto(path);
    }
}


