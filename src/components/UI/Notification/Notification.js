import addNotification from 'react-push-notification';

const Notification = (type, message) => {
  if (type === 'success') {
    addNotification({
      title: 'Success',
      message: message,
      theme: 'darkblue',
      duration: 3000,
      backgroundTop: 'rgb(45, 98, 179)',
      backgroundBottom: 'rgb(76, 127, 202)',
      closeButton: 'CLOSE'
    })
  } else if (type === 'error') {
    addNotification({
      title: 'Error',
      message: message,
      theme: 'red',
      duration: 3000,
      backgroundTop: 'rgb(167, 0, 0)',
      backgroundBottom: 'rgb(189, 22, 22)',
      closeButton: 'CLOSE'
    })
  }
}

export default Notification