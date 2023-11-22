import { expect, test } from '@playwright/test';

test.describe('Wikipedia Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://en.wikipedia.org/wiki/Main_Page');
  });

  let testDataValid = [
    { searchQuery: 'Playwright', expectedResults: 'Playwright' },
    { searchQuery: 'Automation', expectedResults: 'Automation' },
    {
      searchQuery: 'Integration Testing',
      expectedResults: 'Integration testing',
    },
    { searchQuery: 'JavaScripts', expectedResults: 'JavaScript' },
  ];

  testDataValid.forEach((data) => {
    test(`Search test for query: ${data.searchQuery}`, async ({ page }) => {
      await page.getByPlaceholder('Search Wikipedia').fill(data.searchQuery);
      await page.getByPlaceholder('Search Wikipedia').press('Enter');
      await expect(
        page.locator(`//span[text()='${data.expectedResults}']`)
      ).toBeVisible();
    });
  });

  let testDataInvalid = [{ searchQuery: '!@#$%^&*(' }, { searchQuery: '^&$' }];

  testDataInvalid.forEach((data) => {
    test(`Search with the invalid name ${data.searchQuery}`, async ({
      page,
    }) => {
      await page.locator('input[accesskey="f"]').fill(data.searchQuery);
      await page.locator('button:has-text("Search")').press('Enter');
      await expect(
        page.locator('text=There were no results matching the query.')
      ).toBeVisible();
    });
  });
});
