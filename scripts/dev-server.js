const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
http.createServer((req, res) => {
  if (req.url.startsWith('/api/')) {
    const proxy = http.request({hostname:'127.0.0.1',port:3000,path:req.url,method:req.method,headers:req.headers}, p => {
      res.writeHead(p.statusCode, p.headers);p.pipe(res);
    });
    proxy.on('error', () => {res.writeHead(502);res.end('Start sam local start-api first');});
    req.pipe(proxy);
    return;
  }
  if (req.url !== '/' && req.url !== '/index.html') {res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type','text/html; charset=utf-8');
  fs.createReadStream(path.join(__dirname,'../frontend/index.html')).pipe(res);
}).listen(8000,()=>console.log('Open http://localhost:8000'));
