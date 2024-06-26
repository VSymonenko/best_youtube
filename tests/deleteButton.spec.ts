import * as c from '../src/core'

import { test as base, expect } from '@playwright/test'

import { ListPage } from './listPage';

const COUNT_ITEMS = 3;

// prepare list
const test = base.extend<{ listPage: ListPage }>({
  listPage: async ({ page }, use) => {
    const listPage = new ListPage(page);
    await listPage.openIndex();
    await listPage.addItems(COUNT_ITEMS);
    await listPage.openList();
    await use(listPage);
  },
});

test.describe('core.getList', () => {
  let list!: Element;

  test.beforeEach(async ({ page, listPage }) => {
    // flush preparation list
    await listPage;
    list = await page.evaluate(c.getList) as Element;
  })

  test('should be find prepared flexy list', () => {
    expect(list).not.toBeNull();
  });
});

test.describe('delete button', () => {
  test.skip('should be rendered for each item', async ({ listPage }) => {
    const items = await listPage.page.locator('button', { hasText: /delete/i}).count();
    expect(items).toBe(COUNT_ITEMS);
  });
});
