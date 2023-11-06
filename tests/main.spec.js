const {test, expect} = require("@playwright/test");
const {createBrowser, sleep, createPage} = require("../Helpers/helpers");

test('Показывает главную', async () => {
    const page = await createPage("/showMain",);
    await expect(page.getByText("Упоминания")).toBeVisible();
});
