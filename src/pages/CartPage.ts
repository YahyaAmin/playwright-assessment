import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    // helper method: locate a product's row by name
    private getRow(productName: string): Locator {
        return this.page.locator('tr.cart-item').filter({ hasText: productName });
    }

    // helper method: parse a price string like "$10.99" into 10.99
    private parsePrice(text: string | null): number {
        return parseFloat((text ?? '').replace(/[^0-9.]/g, ''));
    }

    // get unit price for a product
    async getUnitPrice(productName: string): Promise<number> {
        const row = this.getRow(productName);
        const text = await row.locator('td').nth(1).textContent();
        return this.parsePrice(text);
    }

    // get quantity for a product
    async getQuantity(productName: string): Promise<number> {
        const row = this.getRow(productName);
        const value = await row.getByRole('spinbutton').inputValue();
        return parseInt(value, 10);
    }

    // get subtotal for a product
    async getSubtotal(productName: string): Promise<number> {
        const row = this.getRow(productName);
        const text = await row.locator('td').nth(3).textContent();
        return this.parsePrice(text);
    }

    // get cart total
    async getTotal(): Promise<number> {
        const text = await this.page.locator('.total').textContent();
        return this.parsePrice(text);
    }
}