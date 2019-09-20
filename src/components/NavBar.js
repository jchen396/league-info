import React, {useEffect, useState} from 'react';
import {NavLink,} from 'react-router-dom'

export default function NavBar() {
    const [active, setActive] = useState(false)
    const [classList, setClassList] = useState("responsive")
    useEffect(() => {
        if(active)
            setClassList("right responsive")
        else
            setClassList("right")
    }, [active])
    return (
        <nav className="nav-wrapper">
            <div className="container">
                <div className="brand-logo">LeagueInfo</div>
                <ul className={classList}>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>
                <div className="hamburger" 
                onClick={() => active ?  setActive(false) : setActive(true)}>
                        <span></span>
                        <span></span>
                        <span></span>
                </div>
            </div>
        </nav>
    );
}