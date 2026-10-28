const response = (statusCode, data) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  body: JSON.stringify(data)
});


exports.handler = async (event) => {
  const method = event.requestContext?.http?.method || event.httpMethod;
  const path = event.rawPath || event.path;
  if (method === 'GET' && path === '/api/health')
    return response(200, { message: 'Backend is running!' });
  if (method === 'POST' && path === '/api/login') {
    let body;
    try { body = JSON.parse(event.body || '{}'); }
    catch { return response(400, { message: 'Invalid JSON' }); }
    if (body.email === 'demo@example.com' && body.password === 'demo123')
      return response(200, { message: 'Login successful! Welcome to AWS Serverless.' });
    return response(401, { message: 'Invalid email or password' });
  }
  return response(404, { message: 'Not found' });
};
