const {test, expect} = require("@playwright/test");
const {createBrowser, sleep, createPage} = require("../Helpers/helpers");

test('Дата регистрации', async () => {
    const page = await createPage("/registrationDate",);
    await page.getByText('Дата регистрации', {exact: true}).click();
    await sleep(3);
    await expect(page.locator('.virtualList')).toBeVisible();
});
