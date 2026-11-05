const path = require('path');
const { chromium } = require(path.resolve(__dirname, '../frontend/node_modules/playwright-core'));

async function main() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:5173/tentang', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  const history = page.locator('#history');
  if (await history.count() > 0) {
    await history.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'scratch/screenshot_about_timeline.png' });
    console.log('Saved scratch/screenshot_about_timeline.png');
  }

  await browser.close();
}

main().catch(console.error);

