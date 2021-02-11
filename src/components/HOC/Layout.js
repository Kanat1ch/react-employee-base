import React from 'react'
import {NavLink} from 'react-router-dom'

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