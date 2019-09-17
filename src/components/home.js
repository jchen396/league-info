// -> App.js
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function Home ({search}) {
    const [champions, setChampions] = useState([]);
    useEffect(() => {
        let cancel
        const proxy = 'https://cors-anywhere.herokuapp.com/'; //proxy incase local server does not work
        axios.get(`${proxy}http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json `, { //get data from league api
            cancelToken: new axios.CancelToken( c => {
                cancel = c
            })
        })
            .then(res => {
                setChampions(res.data.data) //retrieve data from api
            })
        return () => cancel();
    }, []);

    const champSearch = search // get the input value from props
    const champArray = Object.values(champions) // Object ->  Array
    const champPool = champSearch ? champArray.map((champ) => { // map through array
        let re = new RegExp(champSearch, "i") // assign regex values from to reg
        if(champ.id.match(re))
            return(
                <div className="post card" key={champ.key}>
                    <Link to={'/' + champ.id} >
                        <div className="card-content">
                            <img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`} alt="splash-art" height="200" width="120" />
                            <span className="card-title">{champ.id}</span>
                            <p>{champ.title}</p>
                        </div>  
                    </Link>
                </div>
            );
    }) : (
        <div className="center no-results">No results were found</div>
        )
    return (
        <div className="results">
            {champPool}
        </div>
    );
}