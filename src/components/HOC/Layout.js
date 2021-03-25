import React from 'react'
import {NavLink} from 'react-router-dom'

const MAIN_PAGE = '/'
const INFO_PAGE = '/info'

const Layout = ({ children }) => {
    return(
        <div className="App">
            <div className="header">
                <div className="container">
                    <div className="header__logo">
                        <h1>SharonovBase</h1>
                    </div>
                    <div className="header__navlink">
                        <NavLink to={MAIN_PAGE} exact>
                            Database
                        </NavLink>
                        <NavLink to={INFO_PAGE}>
                            Information
                        </NavLink>

                        <NavLink to={MAIN_PAGE} exact className="mobile">
                            <i className="fa fa-database"></i>
                        </NavLink>
                        <NavLink to={INFO_PAGE} className="mobile">
                            <i className="fa fa-info"></i>
                        </NavLink>
                    </div>
                </div>
            </div>
        
            <div className="main">
                <div className="container">
                    {children}
                </div>         
            </div>
        </div>
    )
        
}

export default Layout