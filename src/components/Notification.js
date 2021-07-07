/* eslint-disable react/react-in-jsx-scope */
import PropType from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const user = useSelector((state) => state.loggedinUser)

  console.log('user from notif:', user)
  return (
    <div className={notification.classification}>{notification.message}</div>
  )
}

Notification.propType = {
  message: PropType.string.isRequired,
  classification: PropType.string.isRequired,
}

export default Notification
