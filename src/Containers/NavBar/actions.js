import { errorMessage } from 'Components/errors'
import constants from './constants'

const actions = {
	getNotificationsCount: () => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.user
        ? api.notifications.unread_count(0).then((res) => {
            dispatch(actions.notificationsCountLoaded(res.unread_count))
          }).catch(err => {
            //Don't show popup because if something goes 
            //wrong they're going to see it on every page.
            console.log('Something happened to notifications.')
          })
        : null
      })
    }
	},

  notificationsCountLoaded: (unread_count) => {
    return {
      type: constants.NOTIFICATIONS_COUNT_LOADED,
      unread_count
    }
  },

  getMessagesCount: () => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.user
        ? api.messages.unread(0).then((res) => {
            const unread_count = (res.results || []).length
            dispatch(actions.messagesCountLoaded(unread_count))
          }).catch(err => {
            //Don't show popup because if something goes 
            //wrong they're going to see it on every page.
            console.log('Something happened to messages.')
          })
        : null
      })
    }
  },

  messagesCountLoaded: (unread_count) => {
    return {
      type: constants.MESSAGES_COUNT_LOADED,
      unread_count
    }
  }
}


export default actions