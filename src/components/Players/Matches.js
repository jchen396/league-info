// -> Search.js -> Player.js -> App.js
import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Matches({appId, api}) {
    const [data, setData] = useState([])
    useEffect(() => {
        const proxy = 'https://cors-anywhere.herokuapp.com/'; //proxy incase local server does not work
        axios.get(`${proxy}https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${appId}?api_key=${api}`)
        .then(res => {
            setData(res)
        })
        .catch(e => {
            console.log(e.response)
        })
    }, [appId, api])
    console.log(data)
    return(
        <div>
            {appId}
        </div>
    );
}