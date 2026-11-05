const path = require('path');
const { chromium } = require(path.resolve(__dirname, '../frontend/node_modules/playwright-core'));

async function main() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  const result = await page.evaluate(() => {
    const list = [];
    for (let i = 0; i < document.styleSheets.length; i++) {
      const s = document.styleSheets[i];
      try {
        const rules = s.cssRules;
        list.push({
          index: i,
          href: s.href,
          count: rules.length,
          lastRule: rules[rules.length - 1]?.cssText?.substring(0, 150)
        });
      } catch (e) {
        list.push({
          index: i,
          href: s.href,
          error: e.message
        });
      }
    }
    return list;
  });

  console.log('Sheets:', JSON.stringify(result, null, 2));
  await browser.close();
}

main().catch(console.error);

