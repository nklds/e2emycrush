const {test, expect} = require("@playwright/test");
const {createBrowser, sleep, createPage} = require("../Helpers/helpers");


/**
 * back - trackactive.get_users
 */
test('Наблюдение', async () => {
    await (async () => {

        /**
         *
         * @param friends
         * @returns {Promise<number>}
         * We can't return button itself because of mystery forces or, perhaps, React Virtual List
         * So return index instead
         */
        const findIndexOfFirstNotObservedFriend = async (friends) => {
            let i = 0;
            for (const friend of friends) {
                let buttonText = await friend.locator('.vkuiSimpleCell__after').first().textContent();
                if (buttonText === "Отслеживать") {
                    break;
                }
                i++;
            }
            return i
        }

        const page = await createPage("/observe",);

        await page.getByText('Наблюдение', {exact: true}).click();
        await page.getByText('Начать отслеживать', {exact: true}).click();


        await sleep(3);
        const friendsList = await page.locator('.virtualList').first();
        const friends = await friendsList.locator('.vkuiSimpleCell').all();
        const friendIndex = await findIndexOfFirstNotObservedFriend(friends);


        /**
         * For reason of button disabled attribute, which is ancestor of needed button,
         * click() without force:true  doesn't work.
         * So, before click({force: true}) we need sleep(3s) and some hope :)
         */
        await sleep(3);

        /**
         * ATTENTION! This test works only if we have not friends with same name and surname
         * TODO: ask Vanya to implement smth like data-vkid
         */
        await friends[friendIndex].locator(".vkuiButton").click({force: true})

        const modalWindow = await page.locator('.vkuiModalPage__in').first();
        await expect(modalWindow.getByText("Опции отслеживания")).toBeVisible();
        await modalWindow.getByText("Начать отслеживать").click();


        /**
         * VirtualList updated, so we have no older values except name and surname and have to find them again
         */
        await sleep(3);
        const friendsList2 = await page.locator('.virtualList');
        const friend = await friendsList2.locator('.vkuiSimpleCell').first();


        /**
         * Needed friend becomes first friend
         */
        await sleep(3);
        await expect(friend.locator(".vkuiButton").first()).toContainText("Не отслеживать");
        await friend.locator(".vkuiButton").click({force: true})

        /**
         * Needed friend goes at his place again
         */
        const friendsList3 = await page.locator('.virtualList').first();
        const friends2 = await friendsList3.locator('.vkuiSimpleCell').all();
        const friendIndex1 = await findIndexOfFirstNotObservedFriend(friends);
        await sleep(3);
        await expect(friends2[friendIndex1].locator(".vkuiButton").first()).toContainText("Отслеживать");
    })();
})


