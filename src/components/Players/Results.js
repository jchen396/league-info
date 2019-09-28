// -> Matches.js -> Search.js -> Player.js -> App.js
import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Results({gameIds, api, champ}) {
    const [match, setMatch] = useState([])
    const matchIds = gameIds
    useEffect(() => {
        const proxy = 'https://cors-anywhere.herokuapp.com/' //proxy incase local server does not work
        axios.get(`${proxy}https://na1.api.riotgames.com/lol/match/v4/matches/${gameIds}?api_key=${api}`)
        .then((res) => {
            setMatch(res)
        })
        .catch((e) =>{
            console.log(e.response)
        })
    }, [])
    console.log(matchIds)
    return(
        <div className="match-list">
            
        </div>
    )
}
