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
    const leagueDiv = info[1] && info[1].rank
    const leagueLP = info[1] && info[1].leaguePoints
    const leagueWins = info[1] && info[1].wins
    const leagueLosses = info[1] && info[1].losses

    // TFT RANKING INFORMATION
    const tftRank = info[0]


    console.log(leagueInfo)
    return(
        <div>
            <div className="ranking">
                <img src="" alt="rank-icon"/>
                <h3>{`${leagueTier} ${leagueDiv}`}</h3>
                <h4>{leagueLP} LP</h4>
            </div>
            <div className="rank-stats">
                <h5>Wins: {leagueWins} Losses : {leagueLosses}</h5>
            </div>
        </div>
    );
}