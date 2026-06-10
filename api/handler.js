let handler;

export default async (req, res) => {
  if (!handler) {
    const mod = await import('../dist/server/index.mjs');
    handler = mod.default || mod;
  }
  
  return handler.fetch(new Request(req.url, {
    method: req.method,
    headers: req.headers,
    body: ['GET', 'HEAD'].includes(req.method) ? undefined : req.body,
  })).then(response => {
    res.statusCode = response.status;
    response.headers.forEach((value, key) => res.setHeader(key, value));
    return response.body ? response.text() : '';
  }).then(text => {
    res.end(text);
  }).catch(err => {
    console.error('Request handler error:', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  });
};

