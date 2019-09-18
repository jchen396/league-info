import React, {useState, useEffect} from 'react';
import axios from 'axios'

export default function Post({match}) {
    const [info, setInfo] = useState([])
    useEffect(() => {
        const proxy = 'https://cors-anywhere.herokuapp.com/'; //proxy incase local server does not work
        axios.get(`${proxy}http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json `) //get data from league api
            .then(res => {
                setInfo(res.data.data) //retrieve data from api
            })
    },[])
    const infoArray = Object.values(info)
    const infoList = infoArray ? (infoArray.map((champ) => {
        if(match.params.post_id === champ.id)
            return(
                <div className="champ-container" key={champ.key}>
                    <img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`} alt="splash-art" height="500" width="300" />
                </div>
            )
    })) : (
        <div className="center no-result">Loading...</div>
    )
    return(
        <div>
            {infoList}
        </div>
    )
}