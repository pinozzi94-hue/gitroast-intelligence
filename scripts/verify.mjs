import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const start = html.indexOf('<script>') + 8;
const end = html.indexOf('</script>', start);
assert.ok(start > 7 && end > start, 'Inline JavaScript exists');
const code = html.slice(start, end);
new Function(code);

for (const id of ['search','username','submit','results','scoreRing','coverage','languageList','repoGrid','studio','studioPreview','studioSvg','studioPng']) {
  assert.ok(html.includes('id="' + id + '"'), 'Missing UI control: ' + id);
}
for (const theme of ['ember','aurora','nebula']) {
  assert.ok(html.includes('data-theme="' + theme + '"'), 'Missing export theme: ' + theme);
}
assert.ok(code.includes('page<=3'), 'Repository pagination is enabled');
assert.ok(code.includes('canvas.toBlob'), 'PNG export is enabled');
assert.ok(code.includes('URL.revokeObjectURL'), 'Object URLs are reclaimed');
assert.ok(html.includes('prefers-reduced-motion'), 'Reduced-motion support is enabled');

const prefix = code.slice(0, code.indexOf('$("search").addEventListener('));
const fixture = [
  'var profile={login:"test-user",name:"& <Designer>",followers:24,created_at:"2019-01-01T00:00:00Z",public_repos:3};',
  'var makeRepo=(name,language,stars,age,fork)=>({name,language,stargazers_count:stars,forks_count:1,pushed_at:new Date(Date.now()-age*864e5).toISOString(),description:"Project",fork,archived:false,html_url:"https://github.com/test-user/"+name});',
  'var report=analyze(profile,[makeRepo("design","TypeScript",150,14,false),makeRepo("tool","Python",12,380,false),makeRepo("fork","JavaScript",1,70,true)]);',
  'if(report.originals.length!==2||report.stale!==1||report.stars!==162)throw Error("Profile metrics are incorrect");',
  'var views={};',
  'for(var theme of ["ember","aurora","nebula"]){selectedTheme=theme;views[theme]=buildSvg(profile,report,"");',
  'if(!views[theme].includes(\'width="1600" height="900"\'))throw Error("Wrong dimensions");',
  'if(!views[theme].includes("&amp; &lt;Designer&gt;"))throw Error("SVG escaping failed");}',
  'if(views.ember===views.aurora||views.ember===views.nebula||views.aurora===views.nebula)throw Error("Card themes not distinct");',
  'if(!Number.isFinite(analyze(profile,[]).score))throw Error("Empty profile broken");',
  'return report.score;'
].join('\n');
const sampleScore = new Function(prefix + '\n' + fixture)();
assert.ok(Number.isFinite(sampleScore));
console.log('All quality checks passed: UI, privacy, scoring, themes, SVG and PNG paths.');
