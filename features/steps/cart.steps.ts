import { expect } from '@playwright/test';
import { Given, When, Then } from '../fixtures';

// Holds the products from the scenario's data table so the "Given" step can read it
let products: { product: string; quantity: string }[] = [];

// Reads the Gherkin data table, navigates to the shop, and adds each product.
Given('I add the following products to my cart:', async ({ shopPage }, dataTable) => {
    // .hashes() converts the table into an array of objects keyed by the header
    // row, e.g. [{ product: 'Stuffed Frog', quantity: '2' }, ...].
    products = dataTable.hashes();

    // Open the shop page before adding any items.
    await shopPage.goto('/#/shop');

    // Add each product to the cart, clicking "Buy" `quantity` times.
    for (const product of products) {
        await shopPage.addToCart(product.product, parseInt(product.quantity, 10));
    }
});

// Navigates from the shop to the cart page by clicking the cart link.
When('I navigate to the cart', async ({ shopPage }) => {
    await shopPage.goToCart();
});

// For every product, reads the unit price, quantity, and subtotal straight from the cart
Then('each product subtotal should equal unit price times quantity', async ({ cartPage }) => {
    for (const product of products) {
        const unitPrice = await cartPage.getUnitPrice(product.product);
        const quantity = await cartPage.getQuantity(product.product);
        const subtotal = await cartPage.getSubtotal(product.product);

        // toBeCloseTo compares to 2 decimal places, avoiding floating-point
        expect(subtotal).toBeCloseTo(unitPrice * quantity, 2);
    }
});

// Sums every product's subtotal and checks it matches the cart's displayed Total.
Then('the cart total should equal the sum of all subtotals', async ({ cartPage }) => {
    let total = 0;

    // Accumulate each product's subtotal as read from the cart.
    for (const product of products) {
        total += await cartPage.getSubtotal(product.product);
    }

    // The displayed Total should equal the summed subtotals (2 decimal places).
    expect(await cartPage.getTotal()).toBeCloseTo(total, 2);
});