const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/riot-api", {
      target: "http://localhost:3001/",
      changeOrigin: true,
    })
  );
};
