// -> Player.js -> App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/search.scss";
import Info from "./Info";
import Matches from "./Matches";

require("dotenv").config();

export default function Search({ search }) {
	//get search ID from prop
	const [summoner, setSummoner] = useState([]); // get player database
	const apiKey = process.env.REACT_APP_LEAGUE_API; // API key acquired from riot games dev site
	useEffect(() => {
		if (search !== "") {
			axios
				.post(`${process.env.REACT_APP_PROXY_SERVER_DOMAIN}summoner`, {
					search,
				})
				.then((res) => {
					//get results from RIOT API according to the summoner name submitted
					setSummoner(res.data);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}, [apiKey, search]);
	const sumName = summoner && summoner.name; // returns NAME property from API
	const sumLevel = summoner && summoner.summonerLevel; // LEVEL
	const sumIcon = summoner && summoner.profileIconId; // ICON

	const sumId = summoner && summoner.id; // encrypted summoner id
	const puuid = summoner && summoner.puuid; //encrypted puuid
	const profileDisplay = sumName ? (
		<div className="result-container">
			<div className="profile-head">
				<img
					src={`${process.env.REACT_APP_DDRAGON_API}img/profileicon/${sumIcon}.png?api_key=${apiKey}`}
					height="150"
					width="150"
					alt="player-icon"
				/>
				<div className="player-name">
					<h1>{sumName}</h1>
					<h4>Level {sumLevel}</h4>
				</div>
			</div>
			<div className="profile-body">
				<Info sumId={sumId} api={apiKey} />
			</div>
			<Matches puuid={puuid} api={apiKey} sumName={sumName} />
		</div>
	) : (
		<div className="error">
			<h5>No results</h5>
		</div>
	);
	return <div>{profileDisplay}</div>;
}
