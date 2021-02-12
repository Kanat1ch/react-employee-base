import React from 'react'
import {NavLink} from 'react-router-dom'
import Hamburger from '../UI/Hamburger/Hamburger'

const Layout = props => {
    return(
        <div className="App">
            <div className="header">
                <div className="container">
                    <div className="header__logo">
                        <h1>SharonovBase</h1>
                    </div>
                    <div className="header__navlink">
                        <NavLink to="/" exact>
                            Database
                        </NavLink>
                        <NavLink to="/info">
                            Information
                        </NavLink>

                        <NavLink to="/" exact className="mobile">
                            <i className="fa fa-database"></i>
                        </NavLink>
                        <NavLink to="/info" className="mobile">
                            <i className="fa fa-info"></i>
                        </NavLink>
                    </div>
                </div>
            </div>
        
            <div className="main">
                <div className="container">
                    {props.children}
                </div>         
            </div>
        </div>
    )
        
}

export default Layout