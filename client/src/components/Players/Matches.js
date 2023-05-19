// -> Search.js -> Player.js -> App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Results from "./Results.js";

export default function Matches({ puuid, api, sumName }) {
	const [matchIds, setMatchIds] = useState([]);
	const [champ, setChamp] = useState("");
	useEffect(() => {
		axios
			.post(`${process.env.REACT_APP_PROXY_SERVER_DOMAIN}matches`, {
				puuid,
			})
			.then((res) => {
				setMatchIds(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}, [puuid]);
	return (
		<div className="match-container">
			<form
				action=""
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<input
					spellCheck="false"
					type="text"
					placeholder="Enter Champion Name"
					onChange={(e) => setChamp(e.target.value)}
				/>
			</form>
			<Results
				matchIds={matchIds}
				api={api}
				champ={champ}
				puuid={puuid}
			/>
		</div>
	);
}
