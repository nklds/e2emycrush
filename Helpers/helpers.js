import {chromium} from "@playwright/test";

export const sleep = async (seconds) => new Promise((resolve) => setTimeout(() => resolve(), seconds * 1000));

/**
 *
 * @returns {Promise<BrowserContext>}
 * @param userDataDir
 */
export const createBrowser = async (userDataDir) => {

    return await chromium
        .launchPersistentContext(__dirname + userDataDir, {
            headless: false, slowMo: 1000, chromiumSandbox: false, channel: 'chrome', args: [
                "--profile-directory=Profile 2",
                // "--start-maximized=true",
                "--sandbox=false"
            ]
        });
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
export const createPage = async (userDataDir, url="https://app.mycrush.ru")=>{
    // await sleep(getRandomInt(10))
    const browser = await createBrowser(userDataDir);
    const page = await browser.newPage();
    await page.setViewportSize({ width: 390, height: 844 });

    await page.goto(url);
    return page;
}