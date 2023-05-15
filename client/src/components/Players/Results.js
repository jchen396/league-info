// -> Matches.js -> Search.js -> Player.js -> App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Icon from "./Icon.js";

require("dotenv").config();

export default function Results({ matchIds, champ, api, puuid }) {
	const [matches, setMatches] = useState([]);
	const [name, setName] = useState([]);
	useEffect(() => {
		setMatches([]);
		//API fetching using axios
		let cancel;
		if (matchIds.length) {
			//only get when id is declared with match values
			matchIds.slice(0, 10).forEach((matchId) => {
				//loop through all exisitng ids from matchIds
				axios
					.post(
						`${process.env.REACT_APP_PROXY_SERVER_DOMAIN}results`,
						{
							matchId,
							cancelToken: new axios.CancelToken((c) => {
								cancel = c;
							}),
						}
					)
					.then((res) => {
						setMatches((prev) => [...prev, { ...res.data }]);
					})
					.catch((e) => {
						console.log(e);
					});
			});
			return () => cancel;
		}
	}, [matchIds]);

	useEffect(() => {
		let cancel;
		axios
			.get(
				`${process.env.REACT_APP_DDRAGON_API}data/en_US/champion.json`,
				{
					cancelToken: new axios.CancelToken((c) => {
						cancel = c;
					}),
				}
			) //get data from league api
			.then((res) => {
				setName(res.data.data);
				// console.log(res)
			})
			.catch((e) => {
				console.log(e.response);
			});
		return () => cancel;
	}, []);
	/* MAPPING THROUGH MATCHES */
	const matchList =
		matches.length === 10 ? (
			matches.map((game, id) => {
				const gameInfo = game && game.info;
				const mode = gameInfo && gameInfo.gameMode; // GAME MODE
				const duration = gameInfo && gameInfo.gameDuration; //unformated duration of game
				const minutes = Math.floor(duration / 60);
				const seconds =
					duration % 60 >= 10 ? duration % 60 : `0${duration % 60}`;
				const time = `${minutes} : ${seconds}`;

				const players = gameInfo && gameInfo.participants; //get individual player data

				const playerMatchData = players.find(
					(player) => player.puuid === puuid
				);

				/* Creating match statistics */
				const champId = playerMatchData?.championId; //champion Id
				const deaths = playerMatchData?.deaths;
				const assists = playerMatchData?.assists;
				const kills = playerMatchData?.kills;
				const stats = `${kills}/${deaths}/${assists}`;

				const outcomeColor = playerMatchData?.win
					? "green-text"
					: "red-text";
				const outcome = playerMatchData?.win ? "VICTORY" : "DEFEAT";

				/* Converting champ id to string name */
				const nameArray = Object.values(name);
				const champName = nameArray
					.map((champ) => {
						//CURRENT CHAMPION SELECT
						if (Number(champ.key) === champId) {
							return champ.name;
						} else {
							return null;
						}
					})
					.filter((champ) => {
						return champ !== undefined;
					});

				const re = new RegExp(champ, "i");
				const nameMatch = String(champName).match(re)
					? "true"
					: "false";

				return playerMatchData ? (
					<div className={`match-post ${nameMatch}`} key={id}>
						<Icon champId={champId} api={api} />
						<div>
							<h4 className={outcomeColor}>{outcome}</h4>
							<h4 className={outcomeColor}>{stats}</h4>
						</div>
						<div className="match-body">
							<h4>{mode}</h4>
							<h5>{time}</h5>
						</div>
					</div>
				) : (
					<div>Loading ...</div>
				);
			})
		) : (
			<div className="error">None</div>
		);
	return <div className="match-list">{matchList}</div>;
}
