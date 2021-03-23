import React, { Component } from 'react'
import Persons from './Persons/Persons'
import {NavLink} from 'react-router-dom'
import calcYears from './functions/calcYears/calcYears'
import axios from 'axios'
import './Base.scss'

class Base extends Component {

    state = {
      persons: [],
      load: true,
      modal: {
          show: false,
          status: '',
          message: ''
      },
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
      const sorting = this.state.persons;

      switch(e.target.value) {
        case 'id_as':
          sorting.sort(function (a,b) {
            return a.num - b.num
          });
          this.setState({persons: sorting})
          break
        case 'id_des':
          sorting.sort(function (a,b) {
            return a.num - b.num
          });
          sorting.reverse()
          this.setState({persons: sorting})
          break
        case 'age_as':
          sorting.sort(function (a,b) {
            return calcYears(a.born) - calcYears(b.born)
          });
          this.setState({persons: sorting})
          break
        case 'age_des':
          sorting.sort(function (a,b) {
            return calcYears(a.born) - calcYears(b.born)
          });
          sorting.reverse()
          this.setState({persons: sorting})
          break
      }
    }

    deletePerson = async id => {
      try {
        await axios.delete(`https://sharonov-base-default-rtdb.firebaseio.com/persons/${id}.json`)
  
        this.setState({
          modal: {
            show: true,
            status: 'success',
            message: 'Person was successfully deleted'
            }
          })
          setTimeout(() => {
            this.setState(prevState => ({
              modal: {...prevState.modal, show: false}
            }))
          }, 3000)
      } catch(e) {
        console.log(e)
        this.setState({
          modal: {
            show: true,
            status: 'error',
            message: 'Something went wrong'
            }
          })
          setTimeout(() => {
            this.setState(prevState => ({
              modal: {...prevState.modal, show: false}
            }))
          }, 3000)
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
            modal={this.state.modal}
            onDelete={this.deletePerson}
          />
        </div>
      )
    }
}

export default Base