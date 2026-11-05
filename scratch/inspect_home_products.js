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

  // Evaluate bounding box of all elements in #products
  const elements = await page.evaluate(() => {
    const section = document.querySelector('#products');
    if (!section) return 'No #products';
    const all = section.querySelectorAll('*');
    const res = [];
    for (const el of all) {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      if (rect.width > 500 || rect.height > 200) {
        res.push({
          tag: el.tagName,
          class: el.className,
          id: el.id,
          width: rect.width,
          height: rect.height,
          bg: style.backgroundColor,
          color: style.color,
          fill: style.fill
        });
      }
    }
    return res;
  });

  console.log('Large elements in #products:', JSON.stringify(elements, null, 2));

  await browser.close();
}

main().catch(console.error);

