import { chromium } from 'playwright-core';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';

const username = 'pinozzi94-hue';
const url = 'http://127.0.0.1:4173/?u=' + encodeURIComponent(username);
const apiToken = process.env.GITHUB_TOKEN;
if (!apiToken) throw new Error('GITHUB_TOKEN is required to retrieve real public GitHub data for screenshot capture.');
const chrome = ['/usr/bin/google-chrome','/usr/bin/google-chrome-stable','/usr/bin/chromium','/opt/google/chrome/chrome'].find(existsSync);
if(!chrome)throw Error('No system Chrome browser found: cannot capture verifiable screenshots.');
const browser = await chromium.launch({executablePath:chrome,headless:true,args:['--no-sandbox']});
const responses = [];
try {
  const page = await browser.newPage({viewport:{width:1440,height:960},deviceScaleFactor:1});
  await page.route('https://api.github.com/**',async route=>{
    const response = await fetch(route.request().url(),{
      headers:{Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28',Authorization:'Bearer '+apiToken}
    });
    const body = await response.text();
    responses.push({path:new URL(route.request().url()).pathname,status:response.status});
    await route.fulfill({status:response.status,contentType:'application/json',headers:{'access-control-allow-origin':'*','cache-control':'no-store'},body});
  });
  await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});
  try {
    await page.waitForFunction(()=>document.getElementById('connectionText')?.textContent?.includes('Public GitHub API'),null,{timeout:45000});
  } catch(e){
    const failure=await page.evaluate(()=>({
      heading:document.getElementById('headingUser')?.textContent,
      notice:document.getElementById('noticeText')?.textContent,
      connection:document.getElementById('connectionText')?.textContent
    }));
    console.error('Actual GitHub data did not load; no screenshots will be published',JSON.stringify({failure,responses}));
    throw e;
  }
  await page.waitForFunction(()=>document.querySelectorAll('#kpis .kpi').length===6);
  const details = await page.evaluate(()=>({
    username:document.getElementById('headingUser')?.textContent,
    coverage:document.getElementById('coverage')?.textContent,
    kpis:[...document.querySelectorAll('#kpis .kpi')].map(el=>el.textContent?.trim()),
    notice:document.getElementById('notice')?.classList.contains('hidden')?null:document.getElementById('noticeText')?.textContent
  }));
  if(details.username!==username||!details.coverage.includes('Analyzed'))throw Error('Invalid profile data in screenshot capture');
  await page.evaluate(()=>document.fonts.ready);
  mkdirSync('assets',{recursive:true});
  await page.screenshot({path:'assets/dashboard-desktop.png',fullPage:true,animations:'disabled'});
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:'assets/dashboard-mobile.png',fullPage:true,animations:'disabled'});
  writeFileSync('assets/screenshot-source.json',JSON.stringify({
    description:'Screenshots of the actual GitRoast UI rendered with unmodified, real public GitHub REST API responses.',
    captured_at:new Date().toISOString(),
    github_username:username,
    github_profile:'https://github.com/'+username,
    source_api:'https://api.github.com',
    coverage:details.coverage,
    kpis:details.kpis,
    notice:details.notice,
    api_responses:responses,
    screenshots:['assets/dashboard-desktop.png','assets/dashboard-mobile.png'],
    note:'Point-in-time public data, not a simulated analytics dataset; numbers will change.'
  },null,2)+'\n');
  console.log('Captured real browser UI and public GitHub data:',JSON.stringify({username:details.username,coverage:details.coverage,responses}));
} finally {
  await browser.close();
}
