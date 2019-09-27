// -> Matches.js -> Search.js -> Player.js -> App.js
import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Results({accId, api, champ}) {
    const [match, setMatch] = useState([])

    useEffect(() => {
        const proxy = 'https://cors-anywhere.herokuapp.com/' //proxy incase local server does not work
        axios.get(`${proxy}https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accId}?api_key=${api}`)
        .then((res) => {
            setMatch(res.data)
        })
        .catch((e) =>{
            console.log(e.response)
        })
    }, [])

    const matchArray = Object.values(match) // Object ->  Array
    const matchList = matchArray ? matchArray.map((match) => {
        console.log(match.lane)
        return(
            <div className="match-post" key={match.gameId}>
                <div className="match-lane">
                    {match.lane}
                </div>
            </div>
        )
        }) :
        <div>hi</div>
    return(
        <div>
            {matchList}
        </div>
    )
}