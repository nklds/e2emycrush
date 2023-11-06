// @ts-check
const { test, expect } = require('@playwright/test');
const {chromium} = require("playwright")

const fTestOne = async ()=>{
  const browser = await chromium.launchPersistentContext("/Users\\nikit\\AppData\\Local\\Google\\Chrome\\User Data\\", {
    headless: false, slowMo: 1000, chromiumSandbox: false, channel: 'chrome', args: [
        "--profile-directory=Profile 2"
    ]

  })
  const page = await browser.newPage();
  await page.goto('https://app.mycrush.ru');
  await new Promise((resolve)=> setTimeout(()=>resolve(), 4000))
}


test('get started link', async ({ page }) => {


  await fTestOne();
});
