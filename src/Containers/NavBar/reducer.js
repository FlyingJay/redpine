import { fromJS } from 'immutable'
import constants from './constants'

export const initialState = fromJS({
	unread_notifications_count: 0,
	unread_messages_count: 0
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
  	case constants.NOTIFICATIONS_COUNT_LOADED:
      return state
        .set('unread_notifications_count', action.unread_count)
  	case constants.MESSAGES_COUNT_LOADED:
      return state
        .set('unread_messages_count', action.unread_count)
    default:
      return state
  }
}

export default reducer