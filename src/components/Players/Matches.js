// -> Search.js -> Player.js -> App.js
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Results from './Results.js'

export default function Matches({accId, api, sumName}) {
    const [data, setData] = useState([])
    const [champ, setChamp] = useState([])
    useEffect(() => {
        const proxy = 'https://cors-anywhere.herokuapp.com/' //proxy incase local server does not work
        axios.get(`${proxy}https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${accId}/ids?api_key=${api}`)
        .then(res => {
            setData(res)
        })
        .catch(e => {
            console.log(e.response)
        })
    }, [accId, sumName, api])
    const dataArray = Object.values(data) // Object ->  Array
    const matchArray = dataArray[0]

    const matchIds = matchArray ? matchArray.slice(0,10).map((match) => {
        return match
    }) : null
    console.log(typeof matchIds)
    return(
        <div className="match-container">
            <form action="" onSubmit={e => {
                e.preventDefault()
                }} >
                <input spellCheck="false" type="text" placeholder="Enter Champion Name" onChange={e => setChamp(e.target.value)}/>
            </form>
            {matchIds.map(matchId => 
                <Results matchIds={matchId} api={api} champ={champ} sumName={sumName} key={matchId}/>
            )}
            </div>
    );
}