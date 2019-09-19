import React, {useState, useEffect} from 'react';
import axios from 'axios'
import '../css/post.scss'

export default function Post({match}) {
    const [info, setInfo] = useState([])
    useEffect(() => {
        const proxy = 'https://cors-anywhere.herokuapp.com/'; //proxy incase local server does not work
        axios.get(`${proxy}http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion/${match.params.post_id}.json `) //get data from league api
            .then(res => {
                setInfo(res.data.data) //retrieve data from api
            })
    },[])
    const infoArray = Object.values(info)
    const infoList = infoArray ? (infoArray.map((champ) => {
        return(
            <div className="main-display container" key={champ.key}>
                <div className="main-image">
                    <h2 classNAme="champ-name">{champ.name}</h2>
                    <img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`} alt="splash-art" />
                </div>
                <div className="main-info">
                    <div className="skill-set">
                        {champ.spells.map((spell) => {
                            return(
                                <div className="spell-info" key={champ.key}>
                                    <img src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${spell.id}.png`} alt={spell.id}/>
                                    <div className="spell-text">
                                        <div className="spell-head">
                                            <h5>{spell.name}</h5>
                                            <div className="cooldown-text">
                                                <p>Cooldown:</p>
                                                <p>{spell.cooldown.map((cd) => { //map through spell cooldowns
                                                return(
                                                    ` [${cd}]`
                                                )
                                                })}</p>
                                            </div>
                                        </div>
                                        <div className="spell-body">
                                            <p>{spell.costType}:</p>
                                            <p>{spell.cost.map((cost) => { //map through spell cast costs
                                                return(
                                                    ` [${cost}]`
                                                )
                                                })}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    })) : (
        <div className="center no-result">API is not found.</div>
    )
    console.log(infoArray)
    const checkEmpty = (value) => {
        return value === undefined
    }
    if(infoList.every(checkEmpty)){
        return(
            <div className="center no-results">Loading . . .</div>
        )
    }
    return(
        <div>
            {infoList}
        </div>
    )
}