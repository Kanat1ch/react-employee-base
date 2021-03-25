import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Base from '../pages/Base/Base'
import Info from '../pages/Info/Info'
import Editor from '../pages/Editor/Editor'

const Router = () => {
    return(
        <Switch>
            <Route path='/' exact>
                <Base />
            </Route>
            <Route path='/info'>
                <Info />
            </Route>
            <Route path='/add'>
                <Editor type="add"/>
            </Route>
            <Route path='/edit/:id'>
                <Editor type="edit"/>
            </Route>
        </Switch>
    )
}

export default Router
