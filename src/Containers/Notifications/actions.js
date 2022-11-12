import { errorMessage } from 'Components/errors'
import constants from './constants'

const actions = {
	getNotifications: () => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.notifications.query({
          expand: 'band,venue,campaign'
        }).then((res) => {
          dispatch(actions.notificationsLoaded(res.results))
        }).catch(err => {
          dispatch(errorMessage(err))
        })
      })
    }
	},

  readNotification: (id) => {
    return (dispatch, getState, api) => {
      api.notifications.read(id).then((res) => {
      	dispatch(actions.getNotifications())
      })
    }
  },

  readAllNotifications: () => {
    return (dispatch, getState, api) => {
      api.notifications.read_all().then((res) => {
        dispatch(actions.getNotifications())
      })
    }
  },  

  deleteAllNotifications: (id) => {
    return (dispatch, getState, api) => {
      api.notifications.delete_all().then((res) => {
        dispatch(actions.getNotifications())
      })
    }
  },

  notificationsLoaded: (notifications) => {
    return {
      type: constants.NOTIFICATIONS_LOADED,
      notifications
    }
  }
}


export default actions