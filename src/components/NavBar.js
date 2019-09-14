import React from 'react';
import {NavLink,} from 'react-router-dom'

export default function NavBar() {
    return (
        <nav className="nav-wrapper blue darken-4">
            <div className="container">
                <div className="brand-logo">InfoWatch</div>
                <ul className="right">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>
            </div>
        </nav>
    );
}