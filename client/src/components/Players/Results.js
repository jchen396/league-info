// -> Matches.js -> Search.js -> Player.js -> App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Icon from "./Icon.js";

export default function Results({ matchIds, champ, api, sumName }) {
	const [match, setMatch] = useState([]);
	const [temp, setTemp] = useState([]);
	const [main, setMain] = useState([]);
	const [name, setName] = useState([]);
	useEffect(() => {
		//API fetching using axios
		let cancel;
		const proxy = "http://cors.now.sh/ "; //proxy incase local server does not work
		if (matchIds !== null && matchIds !== undefined) {
			//only get when id is declared with match values
			matchIds.forEach((id) => {
				//loop through all exisitng ids from matchIds
				axios
					.get(
						`${proxy}https://na1.api.riotgames.com/lol/match/v4/matches/${id}?api_key=${api}`,
						{
							cancelToken: new axios.CancelToken((c) => {
								cancel = c;
							}),
						}
					)
					.then((res) => {
						setMatch([res]);
					})
					.catch((e) => {
						console.log(e);
					});
			});
			return () => cancel;
		}
	}, [api, matchIds, sumName]);

	useEffect(() => {
		setTemp([...main, match]);
		return () => setMain([]);
	}, [main, match]);

	useEffect(() => {
		setMain([...temp, match]);
		return () => setTemp([]);
	}, [match, temp]);

	useEffect(() => {
		let cancel;
		//const proxy = "https://cors-anywhere.herokuapp.com/"; //proxy incase local server does not work
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

	const mainArray = Object.values(main);
	/* MAPPING THROUGH MATCHES */
	const matchList =
		(mainArray.length - 1) % 10 === 0 ? (
			mainArray.slice(1, 11).map((game, id) => {
				//loop through each object and output
				const data = game[0] && game[0].data; // access to game[0].data decrease repitiveness in code
				console.log(data);
				const mode = data && game[0].data.gameMode; // GAME MODE
				const duration = data && game[0].data.gameDuration; //unformated duration of game
				const minutes = Math.floor(duration / 60);
				const seconds =
					duration % 60 >= 10 ? duration % 60 : `0${duration % 60}`;
				const time = `${minutes} : ${seconds}`;

				const player = data && game[0].data.participants; //get individual player data
				const matchPlayer = data && game[0].data.participantIdentities;

				const getId = matchPlayer
					.map((summoner) => {
						const matchName =
							summoner.player && summoner.player.summonerName;
						if (matchName === sumName) {
							return summoner.participantId;
						} else {
							return null;
						}
					})
					.filter((player) => {
						return player !== undefined;
					});

				/* Creating match statistics */
				const champId =
					player &&
					game[0].data.participants[getId[0] - 1].championId; //champion Id
				const statsAccess =
					player && game[0].data.participants[getId[0] - 1].stats; //get stats
				const deaths = statsAccess.deaths;
				const assists = statsAccess.assists;
				const kills = statsAccess.kills;
				const stats = `${kills}/${deaths}/${assists}`;

				const outcomeColor = statsAccess.win
					? "green-text"
					: "red-text";
				const outcome = statsAccess.win ? "VICTORY" : "DEFEAT";

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

				return (
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
				);
			})
		) : (
			<div className="error">None</div>
		);
	return <div className="match-list">{matchList}</div>;
}
