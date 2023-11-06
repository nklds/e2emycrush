const {test, expect} = require("@playwright/test");
const {createBrowser, sleep, createPage} = require("../Helpers/helpers");

test('Время онлайн', async () => {
    await (async () => {

        const page = await createPage("/timeOnline",);
        await page.getByText('Время онлайн', {exact: true}).click();

        await page.getByText('Добавить на отслеживание', {exact: true}).click();
        const friend = await page.locator('.vkuiSimpleCell__content').first();
        const friendsName = await friend.textContent();
        await friend.click();
        await page.getByText('Сохранить').click();
        await expect(page.getByText(friendsName)).toBeVisible();

        await page.getByText(friendsName).click();
        await expect(page.getByText("Не отслеживать")).toBeVisible();
        await page.getByText('Не отслеживать').click();


        const modal = await page.locator(".vkuiAlert");
        await modal.getByText('Не отслеживать').click();

        // checks that friend was removed from time online list .vkuiList .vkuiSimpleCell vkuiSimpleCell__content
        const friendList = await page.locator(".vkuiList").first();
        const friendItems = await friendList.locator(".vkuiSimpleCell").all();
        for (const friendItem of friendItems) {
            console.log(friendItem)
        }

        await page.getByLabel('Назад').click();
        await expect(page.getByText("Упоминания")).toBeVisible();
    })();
})

