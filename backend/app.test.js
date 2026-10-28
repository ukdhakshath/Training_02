const test = require('node:test');
const assert = require('node:assert/strict');
const { handler } = require('./app');
const event = (method, path, body) => ({ requestContext: { http: { method } }, rawPath: path, body: body && JSON.stringify(body) });
test('health', async () => { const r = await handler(event('GET','/api/health')); assert.equal(r.statusCode,200); });
test('valid credentials', async () => { const r = await handler(event('POST','/api/login',{email:'demo@example.com',password:'demo123'})); assert.equal(r.statusCode,200); });
test('invalid credentials', async () => { const r = await handler(event('POST','/api/login',{email:'no',password:'no'})); assert.equal(r.statusCode,401); });
