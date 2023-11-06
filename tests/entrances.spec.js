const {test, expect} = require("@playwright/test");
const {createBrowser, sleep, createPage} = require("../Helpers/helpers");

test('Вступления/выход', async () => {
    const page = await createPage("/entrances",);
    await page.getByText('Вступления/выход', {exact: true}).click();
    await sleep(3);
    await expect(page.locator('.virtualList')).toBeVisible();
});
