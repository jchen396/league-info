var express = require("express");
var cors = require("cors");
var axios = require("axios");

var app = express();

app.use(cors());

const API_KEY = process.env.RIOT_API_KEY;

app.get("/summoner", async (req, res) => {
	axios
		.get(
			`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${search}?api_key=${API_KEY}`
		)
		.then((res) => {
			//get results from RIOT API according to the summoner name submitted
			return res.data;
		})
		.catch((e) => {
			console.log(e.err);
		});
});

app.listen(4000, () => {
	console.log("Server started on port 4000");
});
