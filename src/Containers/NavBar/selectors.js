import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectUnreadNotificationsCount: (state, props) => {
    return c(state, props).get('unread_notifications_count')
  },
  selectUnreadMessagesCount: (state, props) => {
    return c(state, props).get('unread_messages_count')
  }
}

export default selectors