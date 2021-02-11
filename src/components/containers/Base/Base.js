import React, { Component } from 'react'
import Persons from './Persons/Persons'
import {NavLink} from 'react-router-dom'
import './Base.scss'

class Base extends Component {

    state = {
        filter: 'id_as',
        term: ''
    }

    onUpdateSearch = e => {
        const term = e.target.value
        this.setState({ term })
    }

    onUpdateFilter = e => {
        switch(e.target.value) {
            case 'id_as':
                this.setState({filter: 'id_as'})
                break
            case 'id_des':
                this.setState({filter: 'id_des'})
                break
            case 'age_as':
                this.setState({filter: 'age_as'})
                break
            case 'age_des':
                this.setState({filter: 'age_des'})
                break
        }
    }

    render() {
        return(
            <div className="Base">
                <div className="title">
                    <h1>Database</h1>
                    <NavLink to="/add">
                        New Person
                    </NavLink>
                </div>
    
                <form>
                    <div className="form-input-container">
                        <i className="fa fa-search"></i>
                        <input type="text" placeholder="Search by name" onChange={this.onUpdateSearch} />
                    </div>
                    <div className="form-select-container">
                        <i className="fa fa-sort-amount-desc"></i>
                        <select name="sorting" onChange={this.onUpdateFilter}>
                            <option value="id_as">Sort ascending by ID</option>
                            <option value="id_des">Sort descending by ID</option>
                            <option value="age_as">Sort ascending by age</option>
                            <option value="age_des">Sort descending by age</option>
                        </select>
                    </div>
                </form>
                
                <Persons
                    filter={this.state.filter}
                    term={this.state.term}
                />
            </div>
        )
    }
}

export default Base