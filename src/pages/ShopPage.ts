import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ShopPage extends BasePage {

    // locators
    readonly shopLink: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        super(page);
        this.shopLink = page.getByRole('link', { name: 'Shop', exact: true });
        this.cartLink = page.getByRole('link', { name: /Cart/ }); 
    }

    // navigate to the shop page from the homepage by clicking the Shop link in the header
    async open() {
        await this.shopLink.click();
    }

    // add a product to the cart by name, `quantity` times
    async addToCart(productName: string, quantity: number) {
        // locate the tile by its exact product heading
        const productTile = this.page.locator('.product').filter({
            has: this.page.getByRole('heading', { name: productName, exact: true })
        });

        // click the tile's Buy link `quantity` times
        for (let i = 0; i < quantity; i++) {
            await productTile.getByRole('link', { name: 'Buy' }).click();
        }
    }

    // go to the cart page
    async goToCart() {
        await this.cartLink.click();
    }
}