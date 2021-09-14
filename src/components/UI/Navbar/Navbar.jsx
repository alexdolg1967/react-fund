import React from 'react'
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar__links">
                <Link to="/about">О сайте</Link>
                <Link to="/posts">Блог</Link>
            </div>
        </div>
    )
}
