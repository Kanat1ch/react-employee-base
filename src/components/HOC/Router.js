import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Base from '../containers/Base/Base'
import Info from '../containers/Info/Info'
import Add from '../containers/Base/functions/Add/Add'
// import Edit from '../containers/Base/functions/Edit/Edit'
import Form from '../containers/Base/functions/Form/Form'


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
                <Form type="add"/>
            </Route>
            <Route path='/edit/:id'>
                <Form type="edit"/>
            </Route>
        </Switch>
    )
}

export default Router
