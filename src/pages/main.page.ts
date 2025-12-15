import { Page, Locator, expect } from '@playwright/test';

export class MainPage {
    private readonly weatherNowItemsList = [
        'Відчувається як',
        'Вітер',
        'Тиск',
        'Вологість',
        'Вода',
        'Геомагнітна активність'
    ];
    private readonly forecastWrapItems = [
        'Температура повітря',
        'Пориви вітру'
    ];
    private readonly currentWeatherNow: Locator;
    private readonly forecastWrap: Locator;

    constructor(private page: Page) {
        this.currentWeatherNow = page.locator('.current-weather-now');
        this.forecastWrap = page.locator('.current-weather-forecast-wrap');
    }
    
    async checkCurrentWeatherNowItems() {
        await expect(this.currentWeatherNow).toBeVisible();
        for (const item of this.weatherNowItemsList) {
            await expect(this.currentWeatherNow, item).toContainText(item);
        }
    }

    async checkForecastWrapSection() {
        await expect(this.forecastWrap).toBeVisible();

        expect((await this.forecastWrap.locator('.current-weather-caption').textContent())?.trim().replaceAll(/\s+/g,' ')).toBe('Погода на найближчий час');
        
        for (const item of this.forecastWrapItems) {
            await expect(this.forecastWrap, item).toContainText(item);
        }
    }
}