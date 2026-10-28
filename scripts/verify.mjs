import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const dashboard = read('../index.html');
const studio = read('../studio.html');
function jsFrom(html) {
  const match = html.match(/<script>([\s\S]*?)<\/script>/);
  assert.ok(match, 'Inline JavaScript must exist');
  new Function(match[1]);
  return match[1];
}
const dashboardJs = jsFrom(dashboard), studioJs = jsFrom(studio);
for (const id of ['overview','userForm','userInput','goBtn','kpis','activity','activityChart','languages','languageDonut','repositories','repoRows','repoSort','repoSearch','csvButton','insights','insightGrid','roastText']) {
  assert.ok(dashboard.includes(`id="${id}"`), `Missing dashboard control: ${id}`);
}
assert.ok(dashboardJs.includes('events/public'), 'Public event API used');
assert.ok(dashboardJs.includes('maxPages=5'), 'Repository pagination supported');
assert.ok(dashboardJs.includes('new Blob'), 'CSV export supported');
assert.ok(dashboard.includes('prefers-reduced-motion'), 'Reduced-motion styling supported');
assert.ok(dashboard.includes('studio.html?u=' ) === false || dashboardJs.includes('studio.html?u='));
assert.ok(dashboard.includes('activity'), 'Activity chart available');
assert.ok(!dashboard.includes('https://cdn.'), 'No dependency on CDN');
const tests = dashboardJs.slice(0,dashboardJs.indexOf("$('userForm').addEventListener"));
const result = new Function(tests + `
  if(validUsername('test-user')!=='test-user')throw Error('valid username');
  if(validUsername('bad--')!==null)throw Error('invalid username');
  if(escapeHtml('<script>')!=='&lt;script&gt;')throw Error('HTML escaping');
  let sample = {login:'test-user',followers:12,following:8};
  let mk=(name,language,stars,fork)=>({name,language,stargazers_count:stars,forks_count:3,description:'Project',pushed_at:new Date().toISOString(),archived:false,fork});
  cache.user=sample;cache.repos=[mk('alpha','TypeScript',30,false),mk('beta','Python',7,false),mk('forked','JavaScript',100,true)];cache.events=[];
  let summary=stats();
  if(summary.repos!==2||summary.stars!==37||summary.forks!==6||summary.languages.length!==2)throw Error('stats wrong');
  if(!Number.isFinite(summary.score))throw Error('score invalid');
  return summary;`)();
assert.equal(result.stars,37);
for (const id of ['studio','studioPreview','studioSvg','studioPng','download']) assert.ok(studio.includes(`id="${id}"`),`Studio missing ${id}`);
for (const theme of ['ember','aurora','nebula']) assert.ok(studio.includes(`data-theme="${theme}"`));
assert.ok(studioJs.includes('canvas.toBlob'),'PNG export preserved');
const sPref = studioJs.slice(0,studioJs.indexOf('$("search").addEventListener'));
const checkThemes = new Function(sPref + `
  let p={login:'dev',name:'A & B',followers:10,created_at:'2018-01-01T00:00:00Z'};
  let data=[{name:'alpha',language:'TypeScript',fork:false,stargazers_count:10,forks_count:2,pushed_at:new Date().toISOString(),archived:false,description:'Sample'}];
  let report=analyze(p,data),out={};
  for(const theme of ['ember','aurora','nebula']){selectedTheme=theme;out[theme]=buildSvg(p,report,'');if(!out[theme].includes('1600')||!out[theme].includes('&amp;'))throw Error('SVG invalid')}
  if(out.ember===out.aurora||out.ember===out.nebula)throw Error('themes identical');
  return true;`)();
assert.ok(checkThemes);
console.log('✓ Dashboard and Studio JavaScript syntax');
console.log('✓ Navigation, data visualization, filters, accessibility and export controls');
console.log('✓ Repository stats, input validation and safe HTML output');
console.log('✓ Preserved Studio SVG/PNG export, XML safety and distinct themes');

for (const [label,html] of [['dashboard',dashboard],['studio',studio]]) {
  for (const breakpoint of ['max-width:760px','max-width:380px','min-width:1900px']) {
    assert.ok(html.includes(breakpoint),label+' must support '+breakpoint);
  }
  assert.ok(html.includes('pointer:coarse'),label+' must have touch-friendly controls');
  assert.ok(html.includes('overflow-x:clip'),label+' must prevent page-wide horizontal scrolling');
}
const readme=read('../README.md');
assert.ok(readme.includes('npm run dev')&&readme.includes('python -m http.server 4173'),'Startup instructions missing');
assert.ok(readme.includes('Repository Settings')&&readme.includes('gitroast-intelligence'),'Rename guidance missing');
console.log('✓ Responsive screen breakpoints, touch accessibility and complete startup guide');

console.log('All quality checks passed.');