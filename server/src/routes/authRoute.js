const passport = require("passport")

module.exports = (app) => {
	app.get("/user/login", passport.authenticate("google", { scope: ["profile", "email"] }))
	// on singin redirect to main page
	app.get("/user/gcallback", passport.authenticate("google"), (req, res) => res.redirect("/user"))

	app.get("/user/info", (req, res) => res.send(req.user))

	app.get("/user/logout", (req, res) => {
		req.logout()
		res.redirect("/")
	})

	app.get("/user/delete", async (req, res) => {
		let error = await require("../services/passport-config").deleteUser(req.user.id, req.user.email)
		if (error) res.redirect("/user")
		else {
			req.logout()
			res.redirect("/")
		}
	})
}
