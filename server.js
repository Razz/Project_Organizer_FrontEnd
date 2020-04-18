const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const prometheus = require('express-prom-bundle')
const { createProxyMiddleware } = require('http-proxy-middleware');
const metricsMiddleware = prometheus({
  includeMethod: true,
  includePath: true,
  promClient: { collectDefaultMetrics: {} }
})
const app = express();
const USER_URL = process.env.REACT_APP_USERS_URL
const zipkinBaseUrl = "http://" + process.env.REACT_APP_JAEGER_URL

app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.use(metricsMiddleware);
app.use('/tracing', createProxyMiddleware({
  target: process.env.REACT_APP_JAEGER_URL,
  changeOrigin: true,
  logLevel: 'debug',
  pathRewrite: { '^/tracing': '/api/v2/spans' }
}));

app.use('/users', createProxyMiddleware({
  target: process.env.REACT_APP_USERS_URL,
  changeOrigin: true,
  logLevel: 'debug'
}));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);
