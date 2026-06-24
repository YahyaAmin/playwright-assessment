import { test, expect } from '@playwright/test';
import { ShopPage } from '../src/pages/ShopPage';
import { CartPage } from '../src/pages/CartPage';

test.describe('Cart totals', () => {
    test('subtotals and total are calculated correctly', async ({ page }) => {
        const shopPage = new ShopPage(page);
        const cartPage = new CartPage(page);

        // products to add, with their quantities (single source of truth)
        const products = [
            { name: 'Stuffed Frog', quantity: 2 },
            { name: 'Fluffy Bunny', quantity: 5 },
            { name: 'Valentine Bear', quantity: 3 }
        ];

        // navigate to shop
        await shopPage.goto('/#/shop');

        // add each product with its quantity
        for (const product of products) {
            await shopPage.addToCart(product.name, product.quantity);
        }

        // go to cart
        await shopPage.goToCart();

        // for each product: assert subtotal = unit price * quantity, and accumulate the total
        let total = 0;
        for (const product of products) {
            const unitPrice = await cartPage.getUnitPrice(product.name);
            const quantity = await cartPage.getQuantity(product.name);
            const subtotal = await cartPage.getSubtotal(product.name);

            // subtotal must equal price * quantity (toBeCloseTo to avoid float precision issues)
            expect(subtotal).toBeCloseTo(unitPrice * quantity, 2);

            total += subtotal;
        }

        // total must equal the sum of all subtotals
        expect(await cartPage.getTotal()).toBeCloseTo(total, 2);
    });
});