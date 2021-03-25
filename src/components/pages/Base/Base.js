import React, { Component } from 'react'
import Persons from './Persons/Persons'
import {NavLink} from 'react-router-dom'
import calcYears from '../../functions/calcYears/calcYears'
import axios from 'axios'
import './Base.scss'
import Notification from '../../UI/Notification/Notification'

class Base extends Component {

  state = {
    persons: [],
    load: true,
    term: ''
  }

  onUpdateSearch = e => {
    this.setState({ term: e.target.value })
  }

  searchingFor = term => {
    return this.state.persons.filter((person) => {
        const fullName = `${person.name} ${person.surname}`.toLowerCase()
        return(
            fullName.indexOf(term.toLowerCase()) !== -1
        )
    })
  }

  onUpdateFilter = e => {
    const sorting = this.state.persons
    const target = e.target.value
    const sortingProp = target.split('_')[0]
    const sortingBy = target.split('_')[1]

    switch (sortingProp) {
      case 'id':
        sorting.sort(function (a,b) {
          return a.num - b.num
        })
        break
      case 'age':
        sorting.sort(function (a,b) {
          return calcYears(a.born) - calcYears(b.born)
        })
        break
      }
    if (sortingBy === 'des') {
      sorting.reverse()
    }
    this.setState({ persons: sorting })
  }

  deletePerson = async id => {
    try {
      await axios.delete(`https://sharonov-base-default-rtdb.firebaseio.com/persons/${id}.json`)
      Notification('success', 'Person was successfuly deleted')

    } catch(e) {
      console.log(e)
      Notification('error', 'Something went wrong...')
    }
  
    const persons = this.state.persons.filter(item => (item.id !== id))
    this.setState({
      persons
    })  
  }

  async componentDidMount() {
    try {
      const response = await axios.get('https://sharonov-base-default-rtdb.firebaseio.com/persons.json')
      const persons = Object.entries(response.data).map(person => {
        return {
          id: person[0],
          num: person[1].num,
          name: person[1].name,
          surname: person[1].surname,
          patronymic: person[1].patronymic,
          born: person[1].born,
          phone: person[1].phone,
          email: person[1].email,
          departament: person[1].departament
        }
      })
      this.setState({
        persons,
        load: false
      })
    } catch(e) {
      console.log(e)
      this.setState({
        load: false
      })
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
          persons={this.searchingFor(this.state.term)}
          load={this.state.load}
          onDelete={this.deletePerson}
        />

      </div>
    )
  }
}

export default Base