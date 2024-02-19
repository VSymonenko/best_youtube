import type { Locator, Page } from '@playwright/test'

export const URL = 'https://youtube.com';

export class ListPage {
  readonly list: Locator;
  readonly items: Locator;
  readonly listbox: Locator;

  constructor(public readonly page: Page) {
    this.items = page.locator('ytd-rich-item-renderer');
    this.listbox = page.locator('tp-yt-paper-listbox');
    this.list = page.locator('ytd-rich-grid-renderer');
  }

  async openIndex() {
    await this.page.goto(URL);
  }

  async addItem() {
    // prevent ads, often the first element shown is an advertisement
    const count = await this.list.count() + 1;
    await this.items.nth(count).locator('button').click();
    await this.listbox.getByText(/queue/i).click();
  }

  async addItems(count: number) {
    for (let i = 0; i < count; i++) {
      await this.addItem();
    }
  }

  async openList() {
    await this.page.getByRole('button').and(this.page.getByTitle(/expand/i)).click();
  }
}

