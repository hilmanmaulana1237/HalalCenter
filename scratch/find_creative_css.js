const path = require('path');
const { chromium } = require(path.resolve(__dirname, '../frontend/node_modules/playwright-core'));

async function main() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  const result = await page.evaluate(() => {
    let matches = [];
    for (let s of document.styleSheets) {
      try {
        for (let r of s.cssRules) {
          if (r.selectorText && r.selectorText.includes('creative-button')) {
            matches.push(r.cssText);
          }
        }
      } catch (e) {}
    }
    return matches;
  });

  console.log('Matches found for creative-button in CSS:', result);
  await browser.close();
}

main().catch(console.error);

