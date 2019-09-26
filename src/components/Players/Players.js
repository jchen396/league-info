// -> App.js    
import React, {useState, useRef} from 'react'
import Search from './Search'

export default function Players() {
    const inputRef = useRef()
    const [search, setSearch] = useState("");
    return(
        <div className="container home">
            <h6 className="center">Enter Summoner ID to search</h6>
            <div className="form-search">
                <form action="" onSubmit={e => {
                    e.preventDefault()
                    setSearch(inputRef.current.value)}} >
                    <input className="center" spellCheck="false" type="text" ref={inputRef}/>
                </form>
            </div>
            <Search search={search}/>
        </div>
    )
}