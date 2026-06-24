import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
    features: 'features/**/*.feature',
    steps: 'features/steps/**/*.ts',
});

export default defineConfig({
    testDir,
    use: {
        baseURL: 'https://jupiter.cloud.planittesting.com',
        trace: 'on-first-retry',
    },
});