import React from 'react'
import { NavLink } from 'react-router-dom'
import calcYears from '../../../functions/calcYears/calcYears'

const Person = ({id, num, name, surname, born, departament, onDelete}) => {
  return(
    <li className="table-row">
      <div className="col col-1" data-label="ID">{num}</div>
      <div className="col col-2" data-label="Name">{`${name} ${surname}`}</div>
      <div className="col col-3" data-label="Age">{calcYears(born)}</div>
      <div className="col col-4" data-label="Departament">{departament}</div>
      <div className="col col-5" data-label="Actions">
        <NavLink
          className="edit"
          to={`/edit/${id}`}
          ><i className="fa fa-pencil"></i>
        </NavLink>
        <button
          className="delete"
          onClick={() => onDelete(id)}
          ><i className="fa fa-trash"></i>
        </button>
      </div>
    </li>
  )
}

export default Person