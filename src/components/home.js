import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Input from './Input'

export default function Home () {
    const [champions, setChampions] = useState([]);
    useEffect(() => {
        let cancel
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        axios.get(`${proxy}http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json `, {
            cancelToken: new axios.CancelToken( c => {
                cancel = c
            })
        })
            .then(res => {
                setChampions(res.data.data)
            })
        return () => cancel();
    }, []);

    const champArray = Object.values(champions)
    const champPool = champArray ? champArray.map((champ) => {
        console.log(champ)
        return(
            <div className="post card" key={champ.key}>
                <Link to={'/' + champ.id} >
                    <img src={champ.image} alt="splash-art"/>
                    <div className="card-content">
                        <span className="card-title red-text">{champ.id}</span>
                        <p>{champ.title}</p>
                    </div>  
                </Link>
            </div>
        );
    }) : (
        <div className="center no-results">No results were found</div>
        )
    return (
        <div className="container home">
            <h6 className="center">Type below to search</h6>
            <Input />
            <div className="results">
                {champPool}
            </div>
        </div>
    );
}