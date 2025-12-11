import { test, expect } from '../../fixtures';

test.beforeEach(async ({ page }) => {
    await page.goto('');
});

test('check main page content', { tag: '@smoke' }, async ({ header, side, mainPage }) => {
    await header.checkLogo();
    await header.checkSearchVisible();
    await header.checkMenuItems();
    await mainPage.checkCurrentWeatherNowItems();
    await mainPage.checkForecastWrapSection();
    await side.checkMediaVisible();
    await side.checkFooterVisible();
});

test('Check search', async ({ page, header, envConfig }) => {
    await header.search(envConfig.searchCity);
    await header.selectSearchItem(0);
    await expect(page).toHaveURL(new RegExp(envConfig.urlCity, 'i'));
    await header.checkTitle('Погода у Львові сьогодні');
});

test('Block ads requests', async ({ page, side }) => {
    await page.evaluate(() => {
        const el = document.querySelector('#takeover') as HTMLElement | null;
        if (el) el.hidden = true;
    });

    await page.route('**/*', route => {
        const blockedDomains = ['admixer', 'ads', 'criteo', 'bidder', 'pagead', 'adx'];
        const requestUrl = route.request().url();
        
        if (blockedDomains.some(domain => requestUrl.includes(domain))) {
            route.abort();
        } else {
            route.continue();
        }
    });
    await page.reload();
    await side.checkAdsBlocked();
});