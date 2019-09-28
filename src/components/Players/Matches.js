// -> Search.js -> Player.js -> App.js
import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import Results from './Results.js'

export default function Matches({accId, api}) {
    const inputRef = useRef()
    const [data, setData] = useState([])
    const [champ, setChamp] = useState([])
    useEffect(() => {
        const proxy = 'https://cors-anywhere.herokuapp.com/' //proxy incase local server does not work
        axios.get(`${proxy}https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accId}?api_key=${api}`)
        .then(res => {
            setData(res)
        })
        .catch(e => {
            console.log(e.response)
        })
    }, [accId, api])
    const dataArray = Object.values(data) // Object ->  Array
    const matchArray = dataArray[0] && dataArray[0].matches
    const gameIds = matchArray ? matchArray.slice(0,20).map((match) => {
        return match.gameId
    }, ) : null
    return(
        <div className="match-container">
            <form action="" onSubmit={e => {
                    e.preventDefault()
                    setChamp(inputRef.current.value)}} >
                    <input spellCheck="false" type="text" placeholder="Enter Champion Name" ref={inputRef}/>
                </form>
            <Results gameIds={gameIds} api={api} champ={champ}/>
        </div>
    );
}