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
    console.log(data)
    return(
        <div className="match-container">
            <form action="" onSubmit={e => {
                    e.preventDefault()
                    setChamp(inputRef.current.value)}} >
                    <input className="center" spellCheck="false" type="text" placeholder="Enter Champion Name" ref={inputRef}/>
                </form>
            <Results accId={accId} api={api} champ={champ}/>
        </div>
    );
}