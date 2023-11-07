const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const proxy = createProxyMiddleware('/', {
  target: 'https://www.omdbapi.com',
  changeOrigin: true,
  pathRewrite: { '^/': '/' },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy Error');
  },
});

app.use(proxy);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
