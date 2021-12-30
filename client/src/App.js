import axios from "axios"
import React, { useEffect } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { connect } from "react-redux"
import Header from "./components/Header"
import Home from "./components/Home"
import Profile from "./components/Profile"

function App(props) {
	useEffect(() => props.fetch_user(), [])
	return (
		<BrowserRouter>
			<Header />
			<Route exact path="/" component={Home} />
			<Route path="/user" component={Profile} />
		</BrowserRouter>
	)
}

// on user login, get profile data
export default connect(null, (dispatch) => ({
	fetch_user: () =>
		dispatch((dispatch) =>
			axios // connect to backend and get information about current sesssion's user
				.get("/user/info")
				.then((res) => dispatch({ type: "GET_USER", payload: res.data }))
		),
}))(App)
