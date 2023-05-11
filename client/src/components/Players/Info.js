// -> Search.js -> Player.js -> App.js
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Info({ sumId, api }) {
	const [info, setInfo] = useState([]);

	useEffect(() => {
		const proxy = "http://cors.now.sh/ "; //proxy incase local server does not work
		axios
			.get(
				`${proxy}https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${sumId}?api_key=${api}`
			)
			.then((res) => {
				setInfo(res.data);
			})
			.catch((e) => {
				console.log(e.response);
			});
	}, [sumId, api]);

	// LEAGUE RANKING INFORMATION
	const leagueTier = info[1] && info[1].tier;
	const leagueRank = leagueTier
		? leagueTier.toString().charAt(0) +
		  leagueTier.toString().toLowerCase().slice(1)
		: null;
	const leagueDiv = info[1] && info[1].rank;
	const leagueLP = info[1] && info[1].leaguePoints;
	const leagueWins = info[1] && info[1].wins;
	const leagueLosses = info[1] && info[1].losses;

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
