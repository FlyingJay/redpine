import {fromJS} from 'immutable'
import constants from './constants'

export const initialState = fromJS({
  guestlist_loading: false,
  tickets: []
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GUESTLIST_LOADING:
      return state
        .set('guestlist_loading', true)

    case constants.GUESTLIST_LOADED:
      return state
        .set('tickets', action.tickets)
        .set('guestlist_loading', false)

    default:
      return state
  }
}

export default reducer

