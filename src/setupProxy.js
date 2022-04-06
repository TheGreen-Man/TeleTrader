const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		"/tickers",
		createProxyMiddleware({
			target: "https://api-pub.bitfinex.com/v2/",
			changeOrigin: true,
		})
	);
	app.use(
		"/v1/symbols",
		createProxyMiddleware({
			target: "https://api.bitfinex.com/",
			changeOrigin: true,
		})
	);
};

// module.exports = function (app) {
// };
