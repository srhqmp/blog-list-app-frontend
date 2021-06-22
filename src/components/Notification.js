/* eslint-disable react/react-in-jsx-scope */
import PropType from 'prop-types'

const Notification = ({ message, classification }) => {
  return <div className={classification}>{message}</div>
}

Notification.propType = {
  message: PropType.string.isRequired,
  classification: PropType.string.isRequired,
}

export default Notification
