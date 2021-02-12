import React, {Component} from 'react'
import Person from './Person'
import Loader from '../../../UI/Loader/Loader'
import Modal from '../../../UI/Modal/Modal'
import './Persons.scss'

const Persons = ({persons, load, empty, onDelete, modal}) => {
  return(
    <ul className="responsive-table">        
      <li className="table-header">
          <div className="col col-1">ID</div>
          <div className="col col-2">Name</div>
          <div className="col col-3">Age</div>
          <div className="col col-4">Departament</div>
          <div className="col col-5">Actions</div>
      </li>
      {load ? <Loader /> : null}
      
      { persons.length > 0 ?
        persons.map(person => {
          return(
            <Person
              key={person.id}
              id={person.id}
              num={person.num}
              name={person.name}
              surname={person.surname}
              born={person.born}
              departament={person.departament}
              onDelete={onDelete}
            />
          )
        })
        : null
      }

      {empty ? <div className="table-row" style={{padding: '25px', textAlign: 'center'}}><p style={{fontWeight: '500'}}>NO DATA</p></div> : null}
      <Modal
        show={modal.show}
        status={modal.status}
        message={modal.message}
      />
    </ul>
  )
}

export default Persons