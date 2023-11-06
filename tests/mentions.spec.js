const {test, expect} = require("@playwright/test");
const {createBrowser, sleep, createPage} = require("../Helpers/helpers");

test('Упоминания', async () => {
    const page = await createPage("/mentions",);
    await page.getByText('Упоминания', {exact: true}).click();
    await sleep(3);
    await expect(page.locator('.virtualList')).toBeVisible();
});
