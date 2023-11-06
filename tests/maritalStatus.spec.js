const {test, expect} = require("@playwright/test");
const {createBrowser, sleep, createPage} = require("../Helpers/helpers");

test('Семейное положение', async () => {
    const page = await createPage("/maritalStatus",);
    await page.getByText('Семейное положение', {exact: true}).click();
    await sleep(3);
    await expect(page.locator('.virtualList')).toBeVisible();
});
