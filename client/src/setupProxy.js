module.exports = (app) =>
	app.use(
		"/api/user/*",
		require("http-proxy-middleware").createProxyMiddleware({ target: "http://localhost:5000/" })
	)
