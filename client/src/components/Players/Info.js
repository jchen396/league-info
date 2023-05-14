// -> Search.js -> Player.js -> App.js
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Info({ sumId }) {
	const [info, setInfo] = useState([]);

	useEffect(() => {
		axios
			.post(`${process.env.REACT_APP_PROXY_SERVER_DOMAIN}info`, { sumId })
			.then((res) => {
				setInfo(res.data[0]);
			})
			.catch((e) => {
				console.log(e.response);
			});
	}, [sumId]);

	// LEAGUE RANKING INFORMATION
	const leagueTier = info && info.tier;
	const leagueRank = leagueTier
		? leagueTier.toString().charAt(0) +
		  leagueTier.toString().toLowerCase().slice(1)
		: null;
	const leagueDiv = info && info.rank;
	const leagueLP = info && info.leaguePoints;
	const leagueWins = info && info.wins;
	const leagueLosses = info && info.losses;

	const iconDir = require.context("../../css/rank_icons/");
	const icon = leagueTier
		? iconDir(`./Emblem_${leagueRank}.png`)
		: iconDir(`./Emblem_null.png`);

	const dataDisplay =
		leagueRank !== null ? (
			<div>
				<div className="ranking">
					<img src={icon} alt="rank-icon" height="270" width="270" />
					<h3>{`${leagueRank} ${leagueDiv}`}</h3>
					<h4>{leagueLP} LP</h4>
				</div>
				<div className="rank-stats">
					<h5>Wins: {leagueWins}</h5>
					<h5>Losses : {leagueLosses}</h5>
				</div>
			</div>
		) : (
			<div>
				<div className="ranking">
					<img src={icon} alt="rank-icon" height="270" width="270" />
					<h3>Unranked</h3>
					<h4>0 LP</h4>
				</div>
				<div className="rank-stats">
					<h5>Wins: 0</h5>
					<h5>Losses: 0{leagueLosses}</h5>
				</div>
			</div>
		);
	return <div>{dataDisplay}</div>;
}
