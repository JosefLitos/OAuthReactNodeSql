import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

function Header(props) {
	const createLinks = () => {
		// test for user information
		switch (props.user) {
			case null:
				return (
					<li>
						<a href="/">Server loading...</a>
					</li>
				)
			case false:
				return (
					<li>
						<a href="/api/user/login">Sign up/in</a>
					</li>
				)
			default:
				return (
					<React.Fragment>
						<li>
							<a href="/api/user/logout">Log out</a>
						</li>
						<li>
							<Link to="/user">Profile</Link>
						</li>
					</React.Fragment>
				)
		}
	}

	return (
		<nav>
			<div className="nav-wrapper green darken-2">
				<Link to={props.user ? "/user" : "/"} className="brand-logo">
					OAuthReactNodeSql
				</Link>
				<ul id="nav-mobile" className="right">
					{createLinks()}
				</ul>
			</div>
		</nav>
	)
}

export default connect((state) => ({ user: state.user }))(Header)
