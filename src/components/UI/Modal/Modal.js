import React from 'react'
import './Modal.scss'

const Modal = ({show, status, message}) => {

  const classes = ['Modal']

  if (show) {
    classes.push('active')
  }

  if (status === 'success') {
    classes.push('success')
  } else if (status === 'error') {
    classes.push('error')
  }

  return(
    <div className={classes.join(' ')}>
      <p>{message}</p>
    </div>
  )
}

export default Modal