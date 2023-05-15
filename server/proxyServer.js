var express = require("express");
var cors = require("cors");
var axios = require("axios");
var bodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

var app = express();

const API_KEY = process.env.RIOT_API_KEY;

app.use(bodyParser.json());
app.use(
	cors({
		credentials: true,
		origin:
			process.env.NODE_ENV === "development"
				? "http://localhost:3000"
				: process.env.CLIENT_DOMAIN,
	})
);
app.post("/summoner", async (req, res) => {
	try {
		let result;
		await axios
			.get(
				`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.body.search}?api_key=${API_KEY}`
			)
			.then((res) => {
				//get results from RIOT API according to the summoner name submitted
				result = res.data;
			})
			.catch((e) => {
				console.log(e);
			});
		res.json(result).status(200);
	} catch (e) {
		console.log(e);
	}
});

app.post("/info", async (req, res) => {
	try {
		let result;
		await axios
			.get(
				`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${req.body.sumId}?api_key=${API_KEY}`
			)
			.then((res) => {
				result = res.data;
			})
			.catch((e) => {
				console.log(e);
			});
		res.json(result).status(200);
	} catch (e) {}
});

app.post("/matches", async (req, res) => {
	try {
		let result;
		await axios
			.get(
				`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${req.body.puuid}/ids?start=0&count=20&api_key=${API_KEY}`
			)
			.then((res) => {
				result = res.data;
			})
			.catch((e) => {
				console.log(e);
			});
		res.json(result).status(200);
	} catch (e) {}
});

app.post("/results", async (req, res) => {
	try {
		let result;
		await axios
			.get(
				`https://americas.api.riotgames.com/lol/match/v5/matches/${req.body.matchId}?api_key=${API_KEY}`
			)
			.then((res) => {
				result = res.data;
			})
			.catch((e) => {
				console.log(e);
			});
		res.json(result).status(200);
	} catch (e) {}
});

app.listen(PORT, () => {
	console.log("Server started on port 5000");
});
