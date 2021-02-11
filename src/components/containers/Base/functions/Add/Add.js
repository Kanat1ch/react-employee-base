import React, { Component } from 'react'
import axios from 'axios'
import InputMask from 'react-input-mask'
import is from 'is_js'
import Modal from '../../../../UI/Modal/Modal'
import '../form.scss'

class Add extends Component {

  state = {
    isValid: false,
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
      const response = await axios.get('https://sharonov-base-default-rtdb.firebaseio.com/persons.json')
      const lastIndex = Object.keys(response.data).length - 1
      const lastNum = Object.entries(response.data)[lastIndex][1].num


      const data = {...this.state.data, num: lastNum + 1}
      this.setState({data})

    } catch(e) {
      console.log(e)
    }
  }

  onSubmit = async e => {
    e.preventDefault()

    if (this.state.isValid) {
      try {
        await axios.post('https://sharonov-base-default-rtdb.firebaseio.com/persons.json', this.state.data)
        this.setState({
          data: {
            num: 1,
            name: '',
            surname: '',
            patronymic: '',
            phone: '',
            email: '',
            born: '',
            departament: 'IT'
          },
          modal: {
            show: true,
            status: 'success',
            message: 'Person was successfully added'
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
          <h1>Add a person</h1>
        </div>
  
        <form>
          <p>* The field is required</p>
          <div className="form-group">
            <div className="form-group__item">
              <label htmlFor="name">Name *</label>
              <input type="text" id="name" value={this.state.data.name} placeholder="Type your name" onChange={this.changeName} />
            </div>
            <div className="form-group__item">
              <label htmlFor="surname">Surname *</label>
              <input type="text" id="surname" value={this.state.data.surname} placeholder="Type your surname" onChange={this.changeSurname} />
            </div>
            <div className="form-group__item">
              <label htmlFor="patronymic">Patronymic *</label>
              <input type="text" id="patronymic" value={this.state.data.patronymic} placeholder="Type your patronymic" onChange={this.changePatronymic} />
            </div>
          </div>
  
          <div className="form-group">
            <div className="form-group__item">
              <label htmlFor="phone">Phone *</label>
              <InputMask mask="+7 (999) 999-99-99" type="phone" value={this.state.data.phone} id="phone" placeholder="+7 (___) ___-__-__" onChange={this.changePhone}/>
            </div>
            <div className="form-group__item">
              <label htmlFor="email">Email *</label>
              <input type="email" id="email" value={this.state.data.email} placeholder="Type your email" onChange={this.changeEmail} />
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
          
        </form>

        <Modal
          show={this.state.modal.show}
          status={this.state.modal.status}
          message={this.state.modal.message}
        />
      </div>
    )
  }
}

export default Add