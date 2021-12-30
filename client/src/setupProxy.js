module.exports = (app) =>
	app.use(
		"/user/*",
		require("http-proxy-middleware").createProxyMiddleware({ target: "http://localhost:5000/" })
	)
