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

  const sheets = await page.evaluate(() => {
    return Array.from(document.styleSheets).map(s => {
      let rulesCount = 0;
      let sampleRule = '';
      try {
        rulesCount = s.cssRules.length;
        sampleRule = s.cssRules[rulesCount - 1]?.cssText.substring(0, 100);
      } catch (e) {
        sampleRule = 'Access error: ' + e.message;
      }
      return {
        href: s.href,
        rulesCount,
        sampleRule
      };
    });
  });

  console.log('Stylesheets:', JSON.stringify(sheets, null, 2));
  await browser.close();
}

main().catch(console.error);

