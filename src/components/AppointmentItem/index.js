import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onToggled} = props
  const {id, title, date, isFavorite} = appointmentDetails

  const imageurl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickToggle = () => {
    onToggled(id)
  }

  return (
    <li className="list-items">
      <div>
        <h1 className="list-title">{title}</h1>
        <p className="list-name">Date: {date}</p>
      </div>
      <button
        type="button"
        data-testid="star"
        onClick={onClickToggle}
        className="star-btn"
      >
        <img src={imageurl} alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
