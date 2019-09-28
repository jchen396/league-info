// -> Matches.js -> Search.js -> Player.js -> App.js
import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Results({matchIds, api, champ}) {
    const [match, setMatch] = useState([])
    const [temp, setTemp] = useState([])
    const [main, setMain] = useState([])
    useEffect(() => { //API fetching using axios
        const proxy = 'https://cors-anywhere.herokuapp.com/' //proxy incase local server does not work
        if(matchIds !== null && matchIds !== undefined){ //only get when id is declared with match values
            matchIds.forEach((id) => { //loop through all exisitng ids from matchIds
                axios.get(`${proxy}https://na1.api.riotgames.com/lol/match/v4/matches/${id}?api_key=${api}`)
                .then((res) => {
                    setMatch([res])
                })
                .catch((e) =>{
                    console.log(e)
                })
            })
        }
    }, [matchIds])

    useEffect(() => {
        setTemp([...main, match])
    }, [match])

    useEffect(() => {
        setMain([...temp, match])
    },[match])
    console.log(main)
    const matchList = main.map((game, id) => { //loop through each object and output
        const gameIds = game[0] && game[0].data && game[0].data.gameId
        console.log(gameIds)
        return(
            <div className="" key={id}>
                {gameIds}
            </div>
        )
    })
    return(
        <div className="match-list">
            {matchList}
        </div>
    )
}
