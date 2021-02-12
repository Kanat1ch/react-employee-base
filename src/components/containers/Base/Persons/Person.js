import React from 'react'
import { NavLink } from 'react-router-dom'
import calcYears from '../functions/calcYears/calcYears'

const Person = ({id, num, name, surname, born, departament, onDelete}) => {

  // const calcYears = () => {
  //   let yearsOld = null

  //   const date = new Date
  //   const currentDate = {
  //     day: date.getDate(),
  //     month: date.getMonth(),
  //     year: date.getFullYear()
  //   }
    
  //   const birthday = new Date(born)
  //   const birthdayDate = {
  //     day: birthday.getDate(),
  //     month: birthday.getMonth(),
  //     year: birthday.getFullYear()
  //   }

  //   const yearsDif = currentDate.year - birthdayDate.year

  //   if (currentDate.month < birthdayDate.month) {
  //     yearsOld = yearsDif - 1
  //   } else if (currentDate.month > birthdayDate.month) {
  //     yearsOld = yearsDif
  //   } else {
  //     if (currentDate.day < birthdayDate.day) {
  //       yearsOld = yearsDif - 1
  //     } else {
  //       yearsOld = yearsDif
  //     }
  //   }

  //   return yearsOld
  // }

  // calcYears()

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