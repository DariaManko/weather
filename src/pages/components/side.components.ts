import { Page, Locator, expect } from '@playwright/test';

export class Side{
    private readonly mediaElement: Locator;
    private readonly footer: Locator;
    private readonly adSelector: string = '.adv, .ads, [id*="ads"], [class*="ads"]';

    constructor(public page: Page) {
        this.mediaElement = this.page.locator('[data-stat-type="media"]');
        this.footer = this.page.locator('footer');
    }

    async checkMediaVisible() {
        const visibleMedias = await this.mediaElement.filter({ visible: true }).all();
        expect(visibleMedias.length, 'Media elements should be visible').toBeGreaterThan(0);
    }

    async checkFooterVisible() {
        await expect(this.footer).toBeVisible();
    }

    async checkAdsBlocked() {
        const adElements = await this.page.locator(this.adSelector).all();
        expect(adElements.length, 'Ad elements should be blocked').toBe(0);
    }
}