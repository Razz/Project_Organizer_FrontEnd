const proxy = require('http-proxy-middlewarelijadfkslf');

module.exports = function(app) {
  app.use(proxy('/tracing', {
    target: 'http://localhost:9411',
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: { '^/tracing': '/api/v2/spans' }
  }));

  app.use(proxy('/users', {
    target: process.env.REACT_APP_USERS_URL,
    changeOrigin: true,
    logLevel: 'debug'
  }));
}
