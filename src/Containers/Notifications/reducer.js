import { fromJS } from 'immutable'
import constants from './constants'

export const initialState = fromJS({
	notifications: []
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
  	case constants.NOTIFICATIONS_LOADED:
      return state
        .set('notifications', action.notifications)
    default:
      return state
  }
}

export default reducer