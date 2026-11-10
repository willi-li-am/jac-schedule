const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function configureCatalogProxy(app) {
  if (process.env.REACT_APP_CATALOG_URL) return;

  const proxy = createProxyMiddleware({
    target: "https://jacschedule-api.vercel.app",
    changeOrigin: true,
    proxyTimeout: 10000,
  });

  app.use((request, response, next) => {
    if (request.method !== "GET" || !request.path.startsWith("/course/")) return next();

    delete request.headers.cookie;
    delete request.headers.authorization;
    delete request.headers["proxy-authorization"];
    return proxy(request, response, next);
  });
};
