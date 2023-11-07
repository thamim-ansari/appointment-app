import {Component} from 'react'
import {format} from 'date-fns'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    titleInput: '',
    dateInput: '',
    isStarred: false,
  }

  addAppointmentList = event => {
    const {titleInput, dateInput} = this.state

    event.preventDefault()
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: format(new Date(dateInput), 'dd MMMM yyyy, EEEE'),
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onToggled = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {
            ...eachAppointment,
            isFavorite: !eachAppointment.isFavorite,
          }
        }
        return eachAppointment
      }),
    }))
  }

  onRenderAppointmentList = () => {
    const {appointmentList, isStarred} = this.state
    const filteredList = appointmentList.filter(
      each => each.isFavorite === true,
    )
    const realList = isStarred ? filteredList : appointmentList
    return realList.map(eachAppointment => (
      <AppointmentItem
        key={eachAppointment.id}
        appointmentDetails={eachAppointment}
        onToggled={this.onToggled}
      />
    ))
  }

  onClickStarredList = () => {
    this.setState(prevState => ({
      isStarred: !prevState.isStarred,
    }))
  }

  render() {
    const {titleInput, dateInput, isStarred} = this.state
    const starredbtnCls = isStarred ? 'starred-btn active' : 'starred-btn'
    return (
      <div className="app-container">
        <div className="appointment-bg-container">
          <div className="input-container">
            <form className="form-container" onSubmit={this.addAppointmentList}>
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="title" className="title">
                TITLE
              </label>
              <input
                id="title"
                onChange={this.onTitle}
                placeholder="Title"
                value={titleInput}
                className="title-input"
              />
              <label htmlFor="date">DATE</label>
              <input
                type="date"
                id="date"
                onChange={this.onDate}
                value={dateInput}
                className="date-input"
              />
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-image"
            />
          </div>
          <hr className="line-break" />
          <div className="starred-container">
            <h1 className="sub-heading">Appointments</h1>
            <button
              type="button"
              onClick={this.onClickStarredList}
              className={starredbtnCls}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list">{this.onRenderAppointmentList()}</ul>
        </div>
      </div>
    )
  }
}

export default Appointments
