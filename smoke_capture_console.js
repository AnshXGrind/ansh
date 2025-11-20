// smoke_capture_console.js
// Headless Chromium run to capture console logs, errors and failed requests
// Usage: node smoke_capture_console.js http://localhost:8080/

const puppeteer = require('puppeteer');
(async () => {
  const url = process.argv[2] || 'http://127.0.0.1:8080/';
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log('PAGE LOG:', msg.type(), msg.text());
  });
  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.toString());
  });
  page.on('requestfailed', req => {
    const f = req.failure() || {};
    console.log('REQUEST FAILED:', req.url(), f.errorText || 'unknown');
  });
  page.on('response', res => {
    if (res.status() >= 400) console.log('BAD RESPONSE:', res.status(), res.url());
  });

  console.log('Opening', url);

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 }).catch(e => console.log('goto error', e.toString()));

  // capture for 20s (adjust if you need longer)
  await new Promise(resolve => setTimeout(resolve, 20000));

  await browser.close();
  console.log('Done capturing.');
})();
