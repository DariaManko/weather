import { Page, Locator, expect } from '@playwright/test';

export class Header {
    private readonly menuItemsList = [
        'Вчора',
        'Зараз',
        'По годинах',
        'Сьогодні',
        'Завтра',
        '3 дні',
        'Вихідні',
        'Тиждень',
        '10 днів',
        '2 тижні',
        'Місяць'
    ];
    private readonly menu: Locator;
    private readonly menuItemsLocator: Locator;
    private readonly searchInput: Locator;
    private readonly searchItem: Locator;
    private readonly title: Locator;
    private readonly logo: Locator;

    constructor(public page: Page) {
        this.menu = this.page.getByRole('menu');
        this.menuItemsLocator = this.menu.locator('[role="menuitem"]');
        this.searchInput = this.page.getByPlaceholder('Пошук місця розташування');
        this.searchItem = this.page.locator('[class="group-city "]');
        this.title = this.page.locator('.page-title');
        this.logo = this.page.locator('.header-logo');
    }

    async checkSearchVisible() {
        await expect(this.searchInput).toBeVisible();
    }
    
    async search(searchText: string) {
        await this.checkSearchVisible();
        await this.searchInput.click();
        await this.searchInput.fill(searchText);
        await this.searchItem.first().waitFor({ state: 'visible', timeout: 10000 });
    }

    async selectSearchItem(item: number) {
        await this.searchItem.nth(item).click();
    }

    async checkTitle(titleText: string) {
        await expect(this.title).toHaveText(titleText);
    }

    async checkLogo() {
        await expect(this.logo).toBeVisible();
        await expect(this.logo).toHaveScreenshot('logo.png', {maxDiffPixelRatio: 0.1, threshold: 0.1});
    }

    async checkMenuItems() {
        expect(this.menuItemsList, this.menuItemsList.toString()).toBeDefined();
        await expect(this.menu).toBeVisible();
        const items = await this.menuItemsLocator.all();
        const texts: string[] = [];
        for (const item of items) {
            const t = (await item.textContent()) ?? '';
            texts.push(t.trim().replace(/\s+/g, ' '));
        }
        expect(texts, texts.toString() + ' to equal ' + this.menuItemsList.toString()).toEqual(this.menuItemsList);
    }
}