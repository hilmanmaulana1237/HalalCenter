const path = require('path');
const { chromium } = require(path.resolve(__dirname, '../frontend/node_modules/playwright-core'));

async function main() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Check Home Page
  console.log('Navigating to home...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  
  // Screenshot creative buttons
  const productsSection = page.locator('#products');
  if (await productsSection.count() > 0) {
    await productsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'scratch/screenshot_home_products.png' });
    console.log('Saved scratch/screenshot_home_products.png');
  }

  // 2. Check About Page
  console.log('Navigating to about...');
  await page.goto('http://localhost:5173/tentang', { waitUntil: 'networkidle' });
  
  // Screenshot leadership board
  const boardSection = page.locator('#board');
  if (await boardSection.count() > 0) {
    await boardSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'scratch/screenshot_about_board.png' });
    console.log('Saved scratch/screenshot_about_board.png');
  }

  // Click Detail button on Dr. Tri to open modal
  const detailButtons = page.locator('.btn-show-detail');
  const count = await detailButtons.count();
  console.log('Detail buttons found:', count);
  if (count >= 2) {
    // Click second button (Dr. Tri)
    await detailButtons.nth(1).click({ force: true });
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'scratch/screenshot_tri_modal.png' });
    console.log('Saved scratch/screenshot_tri_modal.png');
  }

  await browser.close();
  console.log('All screenshots completed successfully!');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
