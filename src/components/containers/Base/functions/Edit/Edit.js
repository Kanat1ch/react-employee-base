import React, { Component } from 'react'
import axios from 'axios'
import InputMask from 'react-input-mask'
import Loader from '../../../../UI/Loader/Loader'
import Modal from '../../../../UI/Modal/Modal'
import is from 'is_js'
import {withRouter} from 'react-router-dom'
import '../form.scss'

class Edit extends Component {

  state = {
    isValid: true,
    load: true,
    modal: {
      show: false,
      status: '',
      message: ''
    },
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
    try {
      const response = await axios.get(`https://sharonov-base-default-rtdb.firebaseio.com/persons/${this.props.match.params.id}.json`)
      const data = response.data
      this.setState({
        data,
        load: false,
      })

    } catch(e) {
      console.log(e)
    }
  }

  onSubmit = async e => {
    e.preventDefault()

    if (this.state.isValid) {
      try {
        await axios.put(`https://sharonov-base-default-rtdb.firebaseio.com/persons/${this.props.match.params.id}.json`, {
            num: this.state.data.num,
            name: this.state.data.name,
            surname: this.state.data.surname,
            patronymic: this.state.data.patronymic,
            born: this.state.data.born,
            phone: this.state.data.phone,
            email: this.state.data.email,
            departament: this.state.data.departament
        })
        this.setState({
            modal: {
                show: true,
                status: 'success',
                message: 'Person was successfully changed'
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
    }
  }

  deletePerson = async () => {
    try {
        await axios.delete(`https://sharonov-base-default-rtdb.firebaseio.com/persons/${this.props.match.params.id}.json`);
        this.props.history.push('/')
    } catch (e) {
        console.log(e)
    }
};

  isFormValid = () => {
    if (
      this.state.data.name !== '' &&
      this.state.data.surname !== '' &&
      this.state.data.patronymic !== '' &&
      this.state.data.phone.indexOf('_') === -1 &&
      is.email(this.state.data.email) &&
      this.state.data.born !== ''
    ) { this.setState({ isValid: true }) }
    else { this.setState({ isValid: false }) }
  }

  render() {
    return(
      <div className="Add">
        <div className="title">
          <h1>Edit a person</h1>
        </div>

        {
            this.state.load
            ? <Loader />
            : <form>
            <p>* The field is required</p>
            <div className="form-group">
              <div className="form-group__item">
                <label htmlFor="name">Name *</label>
                <input type="text" id="name" defaultValue={this.state.data.name} placeholder="Type your name" onChange={this.changeName} />
              </div>
              <div className="form-group__item">
                <label htmlFor="surname">Surname *</label>
                <input type="text" id="surname" defaultValue={this.state.data.surname} placeholder="Type your surname" onChange={this.changeSurname} />
              </div>
              <div className="form-group__item">
                <label htmlFor="patronymic">Patronymic *</label>
                <input type="text" id="patronymic" defaultValue={this.state.data.patronymic} placeholder="Type your patronymic" onChange={this.changePatronymic} />
              </div>
            </div>
    
            <div className="form-group">
              <div className="form-group__item">
                <label htmlFor="phone">Phone *</label>
                <InputMask mask="+7 (999) 999-99-99" type="phone" value={this.state.data.phone} id="phone" placeholder="+7 (___) ___-__-__" onChange={this.changePhone}/>
              </div>
              <div className="form-group__item">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" defaultValue={this.state.data.email} placeholder="Type your email" onChange={this.changeEmail} />
              </div>
              <div className="form-group__item">
                <label htmlFor="born">Born *</label>
                <input type="date" id="born" defaultValue={this.state.data.born} onChange={this.changeBorn} />
              </div>
              <div className="form-group__item">
                <label htmlFor="departament">Departament *</label>
                <select id="departament" value={this.state.data.departament} onChange={this.changeDepartament}>
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
            <button type="button" className="delete" onClick={this.deletePerson}>Delete</button>
            
          </form>
        }
        <Modal
          show={this.state.modal.show}
          status={this.state.modal.status}
          message={this.state.modal.message}
        />
      </div>
    )
  }
}

export default withRouter(Edit)