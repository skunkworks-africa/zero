import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {headers} from './security.mjs';
const root=path.resolve('dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8','.xml':'application/xml'};
const server=http.createServer(async(req,res)=>{
  Object.entries(headers).forEach(([k,v])=>res.setHeader(k,v));
  res.setHeader('Cache-Control','no-store');
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end('Method not allowed. This preview does not accept submissions.');return;}
  try{let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);let file=path.resolve(root,'.'+pathname);if(file!==root&&!file.startsWith(root+path.sep))throw new Error('Invalid path');try{if((await stat(file)).isDirectory())file=path.join(file,'index.html');}catch{file=path.join(root,'404.html');res.statusCode=404}const data=await readFile(file);res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(req.method==='HEAD'?undefined:data);}catch{res.statusCode=400;res.end('Invalid request');}
});
server.listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log('ZERO preview: http://127.0.0.1:'+(process.env.PORT||4173)));
