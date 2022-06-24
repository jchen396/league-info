// -> Matches.js -> Search.js -> Player.js -> App.js
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Icon from './Icon.js'

export default function Results({matchId, champ, api, sumName}) {
    const [match, setMatch] = useState([])
    const [name, setName] = useState([])
    useEffect(() => { //API fetching using axios
        let cancel
        const proxy = 'https://cors-anywhere.herokuapp.com/' //proxy incase local server does not work
        if(matchId !== null && matchId !== undefined){ //only get when id is declared with match values
                axios.get(`${proxy}https://americas.api.riotgames.com/lol/match/v5/matches/${matchId[1]}?api_key=${api}`,
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
            
            return () => cancel
        }
    }, [])


    // useEffect(() => {
    //     let cancel
    //     const proxy = 'https://cors-anywhere.herokuapp.com/'; //proxy incase local server does not work
    //     axios.get(`${proxy}http://ddragon.leagueoflegends.com/cdn/9.19.1/data/en_US/champion.json`, 
    //     {cancelToken: new axios.CancelToken(c =>{
    //         cancel = c
    //     })}) //get data from league api
    //     .then((res) => {
    //         setName(res.data.data)
    //         // console.log(res)
    //     })
    //     .catch((e) =>{
    //         console.log(e.response)
    //     })
    //     return () => cancel
    // }, [])
    /* MAPPING THROUGH MATCHES */
    const matchDetail = match && match[0] // access to game[0].data decrease repitiveness in code
    const matchData = matchDetail && matchDetail.data // match data
    const matchInfo = matchData && matchData.info
    const mode = matchInfo && matchInfo.gameMode // GAME MODE
    const duration = matchInfo && matchInfo.gameDuration //unformated duration of game
    const minutes = Math.floor(duration/60)
    const seconds = duration % 60 >= 10 ?  duration%60 : `0${duration%60}`
    const time = `${minutes} : ${seconds}`

    const matchParticipants = matchInfo && matchInfo.participants //get individual player data
    const matchParticipantsArray = matchParticipants && Object.values(matchParticipants); //convert obj -> arr
    const player = matchParticipantsArray && matchParticipantsArray.filter(participant => {
        return participant.summonerName == sumName
    }) || []

    /* Creating match statistics */
    const playerInfo = player && player[0]
    const champId = playerInfo && playerInfo.championId //champion Id
    const deaths = playerInfo && playerInfo.deaths
    const assists = playerInfo && playerInfo.assists
    const kills = playerInfo && playerInfo.kills
    const stats = playerInfo && `${kills}/${deaths}/${assists}`

    const outcomeColor = playerInfo && playerInfo.win ? "green-text" : "red-text"
    const outcome = playerInfo && playerInfo.win ? "VICTORY" : "DEFEAT"
    const champName = playerInfo && playerInfo.championName

    // const re = new RegExp(champ, "i")
    // const nameMatch = String(champName).match(re) ? "true" : "false"


    return(
            <div className={`match-post`}>
                <Icon champId={champId} api={api}/>
                <div>
                    <h4 className={outcomeColor}>{outcome}</h4>
                    <h4 className={outcomeColor}>{stats}</h4>
                </div>
                <div className="match-body">
                    <h4>{mode}</h4>
                    <h5>{time}</h5>
                </div>
            </div>
    )
}