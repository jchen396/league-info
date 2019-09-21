import React, {useState, useEffect, useRef} from 'react'
import Search from 'search'

export default function Players() {
    const inputRef = useRef()
    const [search, setSearch] = useState([]);
    useEffect(() => {
        console.log(search)
    }, [search])



    return(
        <div className="container home">
            <h6 className="center">Type below to search</h6>
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