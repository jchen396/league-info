// -> Matches.js -> Search.js -> Player.js -> App.js
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Icon from './Icon.js'

export default function Results({search, matchIds, api, champ, sumName}) {
    const [match, setMatch] = useState([])
    const [temp, setTemp] = useState([])
    const [main, setMain] = useState([])
    useEffect(() => { //API fetching using axios
        let cancel
        const proxy = 'https://cors-anywhere.herokuapp.com/' //proxy incase local server does not work
        if(matchIds !== null && matchIds !== undefined){ //only get when id is declared with match values
            matchIds.forEach((id) => { //loop through all exisitng ids from matchIds
                axios.get(`${proxy}https://na1.api.riotgames.com/lol/match/v4/matches/${id}?api_key=${api}`,
                    {cancelToken: new axios.CancelToken( c => {
                        cancel = c     
                    })
                })
                .then((res) => {
                    setMatch([res])
                })
                .catch((e) =>{
                    console.log(e)
                })  
            })
            return () => cancel
        }
    }, [matchIds])

    useEffect(() => {
        setTemp([...main, match])
        return() => setMain([])
    }, [match])

    useEffect(() => {
        setMain([...temp, match])
        return() => setTemp([])
    },[match])

    const mainArray = Object.values(main)
    const matchList = mainArray.length === 11 ? mainArray.slice(1, 11).map((game, id) => { //loop through each object and output
        const data = game[0] && game[0].data // access to game[0].data decrease repitiveness in code
        const mode = data && game[0].data.gameMode // GAME MODE
        const duration = data && game[0].data.gameDuration //unformated duration of game
        const minutes = Math.floor(duration/60)
        const seconds = duration % 60 >= 10 ?  duration%60 : `0${duration%60}`
        const time = `${minutes} : ${seconds}`

        const player = data && game[0].data.participants //get individual player data
        const matchPlayer = data && game[0].data.participantIdentities

        const getId = matchPlayer.map((summoner) => {
            const matchName = summoner.player && summoner.player.summonerName
            if(matchName === sumName){
                console.log(matchName, sumName, summoner.participantId)
                return summoner.participantId
            }
        }).filter((player) => {
            return player !== undefined
        })
        const champId = player && game[0].data.participants[getId[0]-1].championId //champion Id

        console.log(data)
        return(
            <div className="match-post" key={id}>
                <Icon champId={champId} api={api} />
                <div className="match-body">
                    <h4>{mode}</h4>
                    <p>{time}</p>
                </div>
            </div>
        )
    }) : 
    <div className="error">
        None
    </div>
    return(
        <div className="match-list">
            {matchList}
        </div>
    )
}
