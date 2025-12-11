import { test as base } from '@playwright/test';
import { Header } from './src/pages/components/header';
import { Side } from './src/pages/components/side.components';
import { MainPage } from './src/pages/main.page';  
import { Pets } from './src/API/pets';

export const test = base.extend<{
  envConfig: any,
  header: Header,
  side: Side,
  mainPage: MainPage,
  petsAPI: Pets
}>({
  envConfig: [async ({}, use: (config: any) => Promise<void>) => {
    const ENV = process.env.ENV || 'dev';
    const envConfig = require(`./src/config/${ENV}.env.ts`).default;
    await use(envConfig);
  }, { scope: 'worker' }],
  header: async ({ page }, use) => {
    await use(new Header(page));
  },
  side: async ({ page }, use) => {
    await use(new Side(page));
  },
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  petsAPI: async ({ request }, use) => {
    await use(new Pets(request));
  }
});

export const expect = test.expect;