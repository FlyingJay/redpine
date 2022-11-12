import { fromJS } from 'immutable'

import constants from './constants'

export const initialState = fromJS({
  submitted: false,
  error: null,
  facebookError: null,
  success: false,
  alphaUser: false
})

export function reducer(state = initialState, action) {

  switch (action.type) {

    case constants.SUBMIT:
      return state
        .set('submitted', true)
        .set('error', null)

    case constants.LOGIN_ERROR:
      return state
        .set('error', action.error)

    case constants.LOGIN_SUCCESS:
      return state
        .set('success', true)

    case constants.VALIDATE_FACEBOOK_LOGIN_ERROR:
      return state
        .set('error', action.error)

    case constants.LOGIN_SUCCESS:
      return state
        .set('success', true)

    case constants.ALPHA_USER:
      return state
        .set('alphaUser', action.show)

    default:
      return state

  }
}

export default reducer