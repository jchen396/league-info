import React from "react";
import "./css/style.scss";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Champions from "./components/Champions/Champions";
import About from "./components/About/About";
import Players from "./components/Players/Players";
import Post from "./components/Champions/Post";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<NavBar />
				<Switch>
					<Route exact path="/champions" component={Champions} />
					<Route exact path="/players" component={Players} />
					<Route exact path="/" component={About} />
					<Route path="/champions/:post_id" component={Post} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
