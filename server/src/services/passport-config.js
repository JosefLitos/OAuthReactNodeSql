const query = require("./sql")(process.env.MYSQL_DB_AUTH)

function setup() {
	const passport = require("passport")
	const GooleStrategy = require("passport-google-oauth20").Strategy

	passport.serializeUser((user, done) => done(null, user.id))
	passport.deserializeUser((id, done) => {
		query("SELECT * FROM user WHERE id=?;", [id], true).then((users) => {
			if (!users[1] && users[0]) return done(null, users[0])
			console.log("SQL - UserID mismatch: provided id:", id, "- also got:", users[1])
			done(null, null)
		})
	})
	passport.use(
		new GooleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: "/user/gcallback",
				proxy: true,
			},
			(accessToken, refreshToken, profile, done) => {
				console.log("User Login: ", profile.displayName, "-", profile.name)
				query("SELECT * FROM user WHERE id=?;", [profile.id], true).then((users) => {
					if (users.length > 0) done(null, users[0])
					else
						query("INSERT INTO user (id, name, email, icon) VALUES (?, ?, ?, ?);", [
							profile.id,
							profile.displayName,
							profile.emails[0].value,
							profile.photos[0].value,
						]).then((res) => {
							if (res.affectedRows != 1) done(null, null)
							else
								done(null, {
									id: profile.id,
									name: profile.displayName,
									email: profile.emails[0].value,
									icon: profile.photos[0].value,
								})
						})
				})
			}
		)
	)
}

async function deleteUser(id, email) {
	let res = query("DELETE FROM user WHERE id=? AND email=?;", [id, email])
	if (res.affectedRows != 1) return new Error(`SQL couldn't delete user, response: ${res}`)
	return null
}

module.exports = { setup, deleteUser }
