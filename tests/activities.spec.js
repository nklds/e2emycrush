const {test, expect} = require("@playwright/test");
const {createBrowser, sleep, createPage} = require("../Helpers/helpers");

test('Активности', async () => {
    const page = await createPage("/activities",);
    await page.getByText('Активности', {exact: true}).click();

    await page.getByText('Активности  пользователя').click();
    await expect(page.locator('.virtualList')).toBeVisible();

    await page.getByLabel('Назад').click();
    await page.getByText('Активности у пользователя').click();
    await expect(page.locator('.virtualList')).toBeVisible();
});
