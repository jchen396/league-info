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
                axios.get(`${proxy}https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${api}`,
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
    }, [matchId, sumName])


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
    const matchParticipantsArray = matchParticipants && Object.entries(matchParticipants); //convert obj -> arr
    const player = matchParticipantsArray && matchParticipantsArray.filter(participant => {
        return participant.summonerName == sumName
    }) || []
    /* Creating match statistics */
    const champId = player && player.championId //champion Id
    const deaths = player && player.deaths
    const assists = player && player.assists
    const kills = player && player.kills
    const stats = player && `${kills}/${deaths}/${assists}`

    const outcomeColor = player && player.win ? "green-text" : "red-text"
    const outcome = player && player.win ? "VICTORY" : "DEFEAT"
    console.log(player)
    const champName = player.championName

    // const re = new RegExp(champ, "i")
    // const nameMatch = String(champName).match(re) ? "true" : "false"


    return(
        <div className="match-list">
            <div className={`match-post`}>
                <Icon champId={champId} api={api}/>
                {champName}
                <div>
                    <h4 className={outcomeColor}>{outcome}</h4>
                    <h4 className={outcomeColor}>{stats}</h4>
                </div>
                <div className="match-body">
                    <h4>{mode}</h4>
                    <h5>{time}</h5>
                </div>
            </div>
        </div> 
    )
}