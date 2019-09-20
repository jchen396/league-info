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
    const [skin, setSkin] = useState(0)
    const [select, setSelect] = useState(false)
    const [classList, setClassList] = useState("skin-screen")
    useEffect(() => { // selecting champion skins
        console.log(select)
        console.log(classList)
        if(select)
            setClassList("skin-screen open")
        else
            setClassList("skin-screen")
    }, [select])
    const infoArray = Object.values(info)
    const infoList = infoArray ? (infoArray.map((champ) => {
        return(
            <div className="main-display" key={champ.key}>
                <div className={classList}>
                    <div className="skin-select">
                        {champ.skins.map((skin, key) => {
                            return(
                                <img key={key} onClick={() => {setSkin(skin.num); setSelect(false)}} src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_${skin.num}.jpg`} alt="splash-art" />
                            )
                        })}
                    </div>
                </div>
                <div className="main-image">
                    <h2 className="champ-name">{champ.name}</h2>
                    <div className="change-skin"><button onClick={() => setSelect(true)} >Change Skin</button></div> {/*BUTTON TO SWITCH SKINS*/}
                    <img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_${skin}.jpg`} alt="splash-art" />
                </div>
                <div className="main-info">
                    <div className="skill-set">
                        {champ.spells.map((spell) => {
                            return(
                                <div className="spell-info" key={champ.key}>
                                    <img src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${spell.id}.png`} alt={spell.id}/>
                                    <div className="spell-text">
                                        <h5>{spell.name}</h5>
                                        <div className="spell-body">
                                            <div className="cd-text">
                                                <span>Cooldown:</span>
                                                <p>{spell.cooldown.map((cd) => { //map through spell cooldowns
                                                    return(
                                                        ` [${cd}]`
                                                    )
                                                    })}</p>
                                            </div>
                                            <div className="cost-text">
                                                <span>{spell.costType}:</span>
                                                <p>{spell.cost.map((cost) => { //map through spell cast costs
                                                    return(
                                                        ` [${cost}]`
                                                    )
                                                    })}</p>         
                                            </div>
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