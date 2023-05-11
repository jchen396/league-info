// -> App.js
import React, {useState} from 'react';
import Cards from './Cards';

export default function Champions() {
    const [search, setSearch] = useState([]);
    return(
        <div className="container home">
            <h6 className="center">Type below to search</h6>
            <div className="form-search">
                <form action="" onSubmit={e => e.preventDefault()}>
                    <input className="center" spellCheck="false" value={search} type="text" onChange={e => setSearch(e.target.value)}/>
                </form>
            </div>
            <Cards search={search}/>
        </div>          
    );
}