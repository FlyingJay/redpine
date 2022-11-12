import { fromJS } from 'immutable'

import constants from './constants'


export const initialState = fromJS({
  show_square: false,
  error: null,
  success: false,
  show_admin: false
})

export function reducer(state = initialState, action) {
  switch (action.type) {
    case constants.SHOW_SQUARE_CHECKOUT:
      return state
        .set('show_square', true)

    case constants.HIDE_SQUARE_CHECKOUT:
      return state
        .set('show_square', false)

    case constants.REGISTRATION_SUCCESS:
      return state
        .set('success', true)
        .set('show_square', false)
        .set('error', null)

    case constants.REGISTRATION_FAILURE:
      return state
        .set('show_square', false)
        .set('error', action.error)

    case constants.VIEW_LISTINGS:
      return state
        .set('success', false)
        .set('show_admin', true)

    default:
      return state
  }
}

export default reducer