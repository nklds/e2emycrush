const {test, expect} = require("@playwright/test");
const {createBrowser, sleep, createPage} = require("../Helpers/helpers");

test('Скрытые пользователи', async () => {
    const page = await createPage("/hiddenUsers",);
    await page.getByText('Скрытые пользователи', {exact: true}).click();

    await page.getByText("Кто скрыл меня").click();
    await expect(page.locator('.vkuiList')).toBeVisible();
    await page.getByRole("Назад").click();

    await page.getByText("Кто скрыл другого пользователя").click();
    await expect(page.locator('.vkuiList')).toBeVisible();
    await page.getByRole("Назад").click();

    await page.getByText("Кого скрыл я").click();
    await expect(page.locator('.vkuiList')).toBeVisible();
    await page.getByRole("Назад").click();

    await page.getByText("Кого скрыл другой пользователь").click();
    await expect(page.locator('.vkuiList')).toBeVisible();
    await page.getByRole("Назад").click();

});
