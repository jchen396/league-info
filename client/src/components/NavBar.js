import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
	const [active, setActive] = useState(false);
	const [classList, setClassList] = useState("responsive");
	useEffect(() => {
		if (active) setClassList("right responsive");
		else setClassList("right");
	}, [active]);
	return (
		<nav className="nav-wrapper">
			<div className="container">
				<div className="brand-logo">
					<NavLink to="/league-info">LeagueInfo</NavLink>
				</div>
				<ul className={classList}>
					<li onClick={() => setActive(false)}>
						<NavLink to="/league-info/champions">Champions</NavLink>
					</li>
					<li onClick={() => setActive(false)}>
						<NavLink to="/league-info/players">Players</NavLink>
					</li>
				</ul>
				<div
					className="hamburger"
					onClick={() =>
						active ? setActive(false) : setActive(true)
					}
				>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		</nav>
	);
}
