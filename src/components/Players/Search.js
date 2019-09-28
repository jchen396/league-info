// -> Player.js -> App.js
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import '../../css/search.scss'
import Info from './Info'
import Matches from './Matches'

export default function Search({search}) { //get search ID from prop
    const [summoner, setSummoner] = useState([]); // get player database
    const proxy = 'https://cors-anywhere.herokuapp.com/'; //proxy incase local server does not work
    const apiKey = "RGAPI-d444b80a-01ac-452d-9d8d-056295b23d82" // API key acquired from riot games dev site
    useEffect(() => {
        axios.get(`${proxy}https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${search}?api_key=${apiKey}`)
        .then((res) => { //get results from RIOT API according to the summoner name submitted
            setSummoner(res)
        })
        .catch(e => {
            console.log(e.response)
        })
    }, [search])
    const sumArray = Object.values(summoner) //turn summoner into an array
    const sumName = sumArray[0] && sumArray[0].name // returns NAME property from API
    const sumLevel = sumArray[0] && sumArray[0].summonerLevel // LEVEL
    const sumIcon = sumArray[0] && sumArray[0].profileIconId // ICON

    const sumId = sumArray[0] && sumArray[0].id // encrypted summoner id
    const accId = sumArray[0] && sumArray[0].accountId //encrypted account id 
    
    const profileDisplay = sumName ? 
        <div className="result-container">
            <div className="profile-head">
                <img src={`http://ddragon.leagueoflegends.com/cdn/9.19.1/img/profileicon/${sumIcon}.png?api_key=${apiKey}`} height="150" width="150" alt="player-icon"/>
                <div className="player-name">
                    <h1>{sumName}</h1>
                    <h4>Level {sumLevel}</h4>
                </div>
            </div>
            <Matches accId={accId} api={apiKey} />
            <div className="profile-body">
                <Info sumId={sumId} api={apiKey} />
            </div>
        </div> 
        : 
        <div className="error">
            <h5>No results</h5>
        </div>
    return(
        <div>
            {profileDisplay}
        </div>
    );
}

