import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Input from './Input'

class Home extends Component{
    state = {
        champions: []
    }
    componentWillMount(){
        axios.get('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json')
            .then(res => {
                this.setState({
                    champions: res.data.data
                })
            })
    }
    render(){
        const {champions} = this.state;
        const championPool = champions.length ? (
            champions.map(champ => {
                return (
                    <div className="post card" key={champ.key}>
                        <div className="card-content">
                            <Link to={'/' + champ.id} >
                            <span className="card-title red-text">{champ.id}</span>
                            </Link>
                            <p>{champ.title}</p>
                        </div>  
                    </div>
                )
            })
        ) : (
            <div className="center">No results were found</div>
        )
        console.log(champions)
        return(
            <div className="container home">
                <h6 className="center">Type below to search</h6>
                <Input />
                <div className="results">
                    {championPool}
                </div>
            </div>
        );
    }
}

export default Home;