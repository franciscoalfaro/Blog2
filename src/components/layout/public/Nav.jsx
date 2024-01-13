import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Nav = () => {
    return (
        <header id="header">
            <NavLink to="inicio" className="logo"><strong>Blog</strong></NavLink>
            <ul className="icons">
                <li>
                    <Link to="https://github.com/franciscoalfaro/" className="icon brands fa-github"><span className="label">GitHub</span></Link>
                </li>
                <li>
                    <Link to="https://www.linkedin.com/in/francisco-alfaro-ba8143183" className="icon brands fa-linkedin"><span className="label">Linkedin</span></Link>
                </li>
                <li>
                    <Link to="#" className="icon brands fa-brands fa-internet-explorer"><span className="label"></span></Link>
                </li>
            </ul>
        </header >
    )
}
