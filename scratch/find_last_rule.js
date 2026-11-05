const path = require('path');
const { chromium } = require(path.resolve(__dirname, '../frontend/node_modules/playwright-core'));

async function main() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  const lastRule = await page.evaluate(() => {
    for (let s of document.styleSheets) {
      try {
        const rules = s.cssRules;
        if (rules && rules.length > 500) {
          return {
            totalRules: rules.length,
            lastRule: rules[rules.length - 1].cssText.substring(0, 200),
            tenthFromLast: rules[rules.length - 10]?.cssText.substring(0, 200)
          };
        }
      } catch (e) {
        return { error: e.message };
      }
    }
    return 'None found > 500 rules';
  });

  console.log('Last parsed rule:', lastRule);
  await browser.close();
}

main().catch(console.error);

