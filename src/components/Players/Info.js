// -> Search.js -> Player.js -> App.js
import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Info({sumId, api}) {
    const [info, setInfo] = useState([])
    
    useEffect(() => {
        const proxy = 'https://cors-anywhere.herokuapp.com/'; //proxy incase local server does not work
        axios.get(`${proxy}https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${sumId}?api_key=${api}`)
        .then((res) => {
            setInfo(res.data)
        })
        .catch(e => {
            console.log(e.response)
        })
    }, [sumId, api])

    // LEAGUE RANKING INFORMATION
    const leagueInfo = info[1]
    const leagueTier = info[1] && info[1].tier
    const leagueRank = leagueTier ? leagueTier.toString().charAt(0) + leagueTier.toString().toLowerCase().slice(1) : null
    const leagueDiv = info[1] && info[1].rank
    const leagueLP = info[1] && info[1].leaguePoints
    const leagueWins = info[1] && info[1].wins
    const leagueLosses = info[1] && info[1].losses
    // TFT RANKING INFORMATION
    const tftRank = info[0]


    const iconDir = require.context('../../css/rank_icons/')
    const icon = leagueTier ? (iconDir(`./Emblem_${leagueRank}.png`)) : null
    
    console.log(leagueInfo)
    return(
        <div>
            <div className="ranking">
                <img src={icon} alt="rank-icon" height="300" width="300"/>
                <h3>{`${leagueRank} ${leagueDiv}`}</h3>
                <h4>{leagueLP} LP</h4>
            </div>
            <div className="rank-stats">
                <h5>Wins: {leagueWins} Losses : {leagueLosses}</h5>
            </div>
        </div>
    );
}