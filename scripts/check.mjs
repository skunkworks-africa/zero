import {readFile,stat} from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
const routes=JSON.parse(await readFile('dist/routes.json','utf8'));
let links=0;
for(const route of routes){const html=await readFile(path.join('dist',route,'index.html'),'utf8');const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);assert.equal(ids.length,new Set(ids).size,route+': duplicate IDs');assert.equal((html.match(/<h1[ >]/g)||[]).length,1,route+': one h1');assert(html.includes('noindex, nofollow'));for(const [,href]of html.matchAll(/(?:href|src)="([^"]+)"/g)){if(!href.startsWith('/')&&!href.startsWith('#'))continue;const url=new URL(href.replaceAll('&amp;','&'),'https://zero.skunkworks.africa'+route);let target=path.join('dist',decodeURIComponent(url.pathname));if(url.pathname.endsWith('/'))target=path.join(target,'index.html');await stat(target).catch(()=>{throw Error(route+': missing '+href)});if(url.hash){const doc=await readFile(target,'utf8');assert(doc.includes(`id="${url.hash.slice(1)}"`),route+': missing anchor '+href)}links++;}}
const js=await readFile('public/assets/site.mjs','utf8');assert(!/fetch\s*\(|localStorage\.|sessionStorage\.|document\.cookie/.test(js));
const tokens=await readFile('public/assets/tokens.css','utf8');assert(tokens.includes('--sk-group-ink-navy: #03033A'));
console.log(`${routes.length} routes, ${links} internal links/assets, unique IDs, anchors and privacy guard checks passed.`);
