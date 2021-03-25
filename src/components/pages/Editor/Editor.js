import React, { Component } from 'react'
import axios from 'axios'
import InputMask from 'react-input-mask'
import Loader from '../../UI/Loader/Loader'
import is from 'is_js'
import {withRouter} from 'react-router-dom'
import Notification from '../../UI/Notification/Notification'
import './Editor.scss'

class Form extends Component {

  state = {
    isValid: false,
    load: true,
    data: {
      num: 1,
      name: '',
      surname: '',
      patronymic: '',
      phone: '',
      email: '',
      born: '',
      departament: 'IT'
    }
  }
  
  changeName = e => {
    const name = e.target.value
    const data = {...this.state.data, name}
    this.setState({data})

    this.isFormValid()
  }

  changeSurname = e => {
    const surname = e.target.value
    const data = {...this.state.data, surname}
    this.setState({data})

    this.isFormValid()
  }

  changePatronymic = e => {
    const patronymic = e.target.value
    const data = {...this.state.data, patronymic}
    this.setState({data})

    this.isFormValid()
  }

  changePhone = e => {
    const phone = e.target.value
    const data = {...this.state.data, phone}
    this.setState({data})

    this.isFormValid()
  }

  changeEmail = e => {
    const email = e.target.value
    const data = {...this.state.data, email}
    this.setState({data})

    this.isFormValid()
  }

  changeBorn = e => {
    const born = e.target.value
    const data = {...this.state.data, born}
    this.setState({data})

    this.isFormValid()
  }

  changeDepartament = e => {
    const departament = e.target.value
    const data = {...this.state.data, departament}
    this.setState({data})

    this.isFormValid()
  }

  async componentDidMount() {
    const {type} = this.props
    if (type === 'edit') {
      const {id} = this.props.match.params
      try {
        const response = await axios.get(`https://sharonov-base-default-rtdb.firebaseio.com/persons/${id}.json`)
        const data = response.data
        this.setState({
          data,
          load: false,
          isValid: true
        })
  
      } catch(e) {
        console.log(e)
      }
    } else {
      try {
        const response = await axios.get('https://sharonov-base-default-rtdb.firebaseio.com/persons.json')
        const lastIndex = Object.keys(response.data).length - 1
        const lastNum = Object.entries(response.data)[lastIndex][1].num
  
        const data = {...this.state.data, num: lastNum + 1}
        this.setState({
          data,
          load: false
        })
  
      } catch(e) {
        console.log(e)
      }
    }
  }

  onSubmit = async e => {
    e.preventDefault()
    const {num, name, surname, patronymic, born, phone, email, departament} = this.state.data
    const {type} = this.props

    if (type === 'edit') {
      const {id} = this.props.match.params
      if (this.state.isValid) {
        try {
          await axios.put(`https://sharonov-base-default-rtdb.firebaseio.com/persons/${id}.json`, {
            num, name, surname, patronymic, born, phone, email, departament
          })
          Notification('success', 'Person was successfully edited')
        } catch(e) {
          console.log(e)
          Notification('error', 'Something went wrong...')
        }
      }
    } else {
      if (this.state.isValid) {
        try {
          await axios.post('https://sharonov-base-default-rtdb.firebaseio.com/persons.json', this.state.data)
          this.setState(prevState => ({
            data: {
              num: prevState.data.num + 1,
              name: '',
              surname: '',
              patronymic: '',
              phone: '',
              email: '',
              born: '',
              departament: 'IT'
            }
          }))
          Notification('success', 'Person was successfully added')
        } catch(e) {
          console.log(e)
          Notification('error', 'Something went wrong...')
        }
      }
    }
  }

  deletePerson = async () => {
    try {
      await axios.delete(`https://sharonov-base-default-rtdb.firebaseio.com/persons/${this.props.match.params.id}.json`);
      this.props.history.push('/')
    } catch (e) {
      console.log(e)
    }
  }

  isFormValid = () => {
    const {name, surname, patronymic, phone, email, born} = this.state.data
    if (
      name !== '' &&
      surname !== '' &&
      patronymic !== '' &&
      phone.indexOf('_') === -1 &&
      is.email(email) &&
      born !== ''
    ) { this.setState({ isValid: true }) }
    else { this.setState({ isValid: false }) }
  }

  render() {
    const {type} = this.props
    const {name, surname, patronymic, phone, email, born, departament} = this.state.data
    return(
      <div className="Add">
        <div className="title">
          {type === 'edit' ? <h1>Edit a person</h1> : <h1>Add a person</h1>}
        </div>

        {
        this.state.load && type === 'edit'
        ? <Loader />
        : <form>
            <p>* The field is required</p>
            <div className="form-group">
              <div className="form-group__item">
                <label htmlFor="name">Name *</label>
                <input type="text" id="name" value={name} placeholder="Type your name" onChange={this.changeName} />
              </div>
              <div className="form-group__item">
                <label htmlFor="surname">Surname *</label>
                <input type="text" id="surname" value={surname} placeholder="Type your surname" onChange={this.changeSurname} />
              </div>
              <div className="form-group__item">
                <label htmlFor="patronymic">Patronymic *</label>
                <input type="text" id="patronymic" value={patronymic} placeholder="Type your patronymic" onChange={this.changePatronymic} />
              </div>
            </div>
    
            <div className="form-group">
              <div className="form-group__item">
                <label htmlFor="phone">Phone *</label>
                <InputMask mask="+7 (999) 999-99-99" type="phone" value={phone} id="phone" placeholder="+7 (___) ___-__-__" onChange={this.changePhone}/>
              </div>
              <div className="form-group__item">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" value={email} placeholder="Type your email" onChange={this.changeEmail} />
              </div>
              <div className="form-group__item">
                <label htmlFor="born">Born *</label>
                <input type="date" id="born" value={born} min="1900-01-01" max="2010-12-31" onChange={this.changeBorn} />
              </div>
              <div className="form-group__item">
                <label htmlFor="departament">Departament *</label>
                <select id="departament" value={departament} onChange={this.changeDepartament}>
                  <option value="IT">IT</option>
                  <option value="Sales">Sales</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Legal">Legal</option>
                </select>
              </div>
            </div>
  
            {
              this.state.isValid
              ? <button type="submit" onClick={this.onSubmit}>Submit</button>
              : <button type="submit" disabled>Submit</button>
            }
            {type === 'edit' ? <button type="button" className="delete" onClick={this.deletePerson}>Delete</button> : null}   
          </form>
        }
      </div>
    )
  }
}

export default withRouter(Form)