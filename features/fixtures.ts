import { test as base } from 'playwright-bdd';
import { createBdd } from 'playwright-bdd';
import { ContactPage } from '../src/pages/ContactPage';
import { ShopPage } from '../src/pages/ShopPage';
import { CartPage } from '../src/pages/CartPage';

// Extend the base test with our page objects as fixtures
// Instead of creating new instances of page objects in each test, we can define them as fixtures here and they will be automatically instantiated and passed to our step definitions. This keeps our step definitions clean and focused on the test logic rather than setup.
export const test = base.extend<{
    contactPage: ContactPage;
    shopPage: ShopPage;
    cartPage: CartPage;
}>({
    contactPage: async ({ page }, use) => {
        await use(new ContactPage(page));
    },
    shopPage: async ({ page }, use) => {
        await use(new ShopPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
});

export const { Given, When, Then } = createBdd(test);