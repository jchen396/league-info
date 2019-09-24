// -> Player.js -> App.js
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import '../../css/search.scss'
import Info from './Info'
import Matches from './Matches'

export default function Search({search}) { //get search ID from prop
    const [summoner, setSummoner] = useState([]); // get player database
    const proxy = 'https://cors-anywhere.herokuapp.com/'; //proxy incase local server does not work
    const apiKey = "RGAPI-2ef47847-0c8e-433e-a70a-319cc1a1fedf" // API key acquired from riot games dev site
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
    const sumName = sumArray[0] && sumArray[0].name // returns name property from API
    const sumLevel = sumArray[0] && sumArray[0].summonerLevel
    const sumIcon = sumArray[0] && sumArray[0].profileIconId

    const sumId = sumArray[0] && sumArray[0].id // encrypted summoner id
    const accId = sumArray[0] && sumArray[0].accountId //encrypted account id 
    return(
        <div>
            <div className="profile-head">
                <img src={`http://ddragon.leagueoflegends.com/cdn/6.3.1/img/profileicon/${sumIcon}.png`} alt="player-icon"/>
                <div className="player-name">
                    <h1>{sumName}</h1>
                    <h4>Level: {sumLevel}</h4>
            </div>
            <div className="profile-body">
                <Info sumId={sumId} api={apiKey} />
                <Matches accId={accId} api={apiKey} />
            </div>
            </div>
        </div>
    );
}

