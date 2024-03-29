// -> Results -> Matches.js -> Search.js -> Player.js -> App.js
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Icon({ champId, api }) {
	const [data, setData] = useState([]);
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
				setData(res.data.data);
				// console.log(res)
			})
			.catch((e) => {
				console.log(e.response);
			});
		return () => cancel;
	}, []);
	const dataArray = Object.values(data);
	const champImage = dataArray.map((champ, id) => {
		if (Number(champ.key) === champId) {
			return (
				<div className="champ-icon" key={id}>
					<img
						src={`${process.env.REACT_APP_DDRAGON_API}img/champion/${champ.id}.png?api_key=${api}`}
						alt={`${champ.name}-icon`}
						width="80"
						height="80"
					/>
					<h6>{champ.name}</h6>
				</div>
			);
		} else {
			return null;
		}
	});
	return <div>{champImage}</div>;
}
