// -> Player 
import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Search({search}) { //get search ID from prop
    const [summoner, setSummoner] = useState([]);
    const proxy = 'https://cors-anywhere.herokuapp.com/'; //proxy incase local server does not work
    const apiKey = "RGAPI-81c450e3-d214-4b51-89b7-1dae8d0992c8" // API key acquired from riot games dev site
    useEffect(() => {
        axios.get(`${proxy}https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${search}?api_key=${apiKey}`)
        .then((res) => { //get results from RIOT API according to the summoner name submitted
            setSummoner(res)
        })
    }, [search])
    const sumArray = Object.values(summoner) //turn summoner into an array
    const sumInfo = sumArray.shift()
    console.log(sumInfo)
    return(
        <div>
            {search}
        </div>
    );
}