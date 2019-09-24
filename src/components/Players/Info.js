// -> Search.js -> Player.js -> App.js
import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Info({sumId, api}) {
    const [info, setInfo] = useState([])
    const proxy = 'https://cors-anywhere.herokuapp.com/'; //proxy incase local server does not work
    useEffect(() => {
        axios.get(`${proxy}https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${sumId}?api_key=${api}`)
        .then((res) => {
            setInfo(res.data)
        })
        .catch(e => {
            console.log(e.response)
        })
    }, [sumId, api])
    console.log(info)
    return(
        <div>
            {sumId}
        </div>
    );
}