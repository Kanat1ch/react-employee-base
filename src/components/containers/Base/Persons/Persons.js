import React, {Component} from 'react'
import Person from './Person'
import Loader from '../../../UI/Loader/Loader'
import Modal from '../../../UI/Modal/Modal'
import axios from 'axios'
import './Persons.scss'

class Persons extends Component {

  state = {
    persons: [],
    filter: '',
    load: true,
    empty: false,
    modal: {
      show: false,
      status: '',
      message: ''
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

  // filterHandler = (filter) => {
  //   const sorting = this.state.persons

  //   switch(filter) {
  //     case 'id_as':
  //       console.log(`Filter: ${filter}`)
  //       sorting.sort(function (a,b) {
  //         return a.num - b.num
  //       });
  //       this.setState({persons: sorting})
  //       break

  //     case 'id_des':
  //       console.log(`Filter: ${filter}`)
  //       sorting.sort(function (a,b) {
  //         return a.num - b.num
  //       });
  //       sorting.reverse()
  //       this.setState({persons: sorting})
  //       break
  //   }
  // }

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
      // this.filterHandler(this.props.filter)
    } catch(e) {
      console.log(e)
      this.setState({
        load: false,
        empty: true
      })
    }
  }

  render() {
    return(
      <ul className="responsive-table">        
        <li className="table-header">
            <div className="col col-1">ID</div>
            <div className="col col-2">Name</div>
            <div className="col col-3">Age</div>
            <div className="col col-4">Departament</div>
            <div className="col col-5">Actions</div>
        </li>
        {this.state.load ? <Loader /> : null}
        
        { this.state.persons.length > 0 ?
          this.state.persons.map(person => {
            return(
              <Person
                key={person.id}
                id={person.id}
                num={person.num}
                name={person.name}
                surname={person.surname}
                born={person.born}
                departament={person.departament}
                onDelete={this.deletePerson}
              />
            )
          })
          : null
        }

        {this.state.empty ? <div className="table-row" style={{padding: '25px', textAlign: 'center'}}><p style={{fontWeight: '500'}}>NO DATA</p></div> : null}
        <Modal
          show={this.state.modal.show}
          status={this.state.modal.status}
          message={this.state.modal.message}
        />
      </ul>
    )
  }
}

export default Persons