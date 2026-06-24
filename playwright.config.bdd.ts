import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
    features: 'features/**/*.feature',
    steps: 'features/**/*.ts',
});

export default defineConfig({
    testDir,
    reporter: [['html', { outputFolder: 'playwright-report-bdd' }]],
    use: {
        baseURL: 'https://jupiter.cloud.planittesting.com',
        trace: 'on-first-retry',
    },
});