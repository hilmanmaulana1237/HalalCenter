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

  const info = await page.evaluate(() => {
    const btn = document.querySelector('.eael-creative-button');
    const svg = document.querySelector('.eael-creative-button-icon-left svg');
    return {
      btnStyles: btn ? {
        display: window.getComputedStyle(btn).display,
        backgroundColor: window.getComputedStyle(btn).backgroundColor,
        width: window.getComputedStyle(btn).width
      } : null,
      svgStyles: svg ? {
        width: window.getComputedStyle(svg).width,
        height: window.getComputedStyle(svg).height,
        fill: window.getComputedStyle(svg).fill
      } : null,
      styleSheetsCount: document.styleSheets.length
    };
  });

  console.log('Computed info:', JSON.stringify(info, null, 2));
  await browser.close();
}

main().catch(console.error);

