const {test, expect} = require("@playwright/test");
const {createBrowser, sleep, createPage} = require("../Helpers/helpers");

test('Кто в ЧС', async () => {
    const page = await createPage("/blackList",);
    await page.getByText('Кто в ЧС', {exact: true}).click();
    await sleep(3);
    await expect(page.locator('.virtualList')).toBeVisible();
});
