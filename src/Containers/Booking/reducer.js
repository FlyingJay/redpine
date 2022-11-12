import {fromJS} from 'immutable'
import constants from './constants'

export const initialState = fromJS({
  booking_loading: false
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.BOOKING_LOADING:
      return state
        .set('booking_loading', true)

    case constants.BOOKING_LOADED:
      return state
        .set('booking_loading', false)

    default:
      return state
  }
}

export default reducer

