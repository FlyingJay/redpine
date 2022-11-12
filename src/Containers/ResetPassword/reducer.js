import { fromJS } from 'immutable'

import constants from './constants'

export const initialState = fromJS({
  success: false,
  error: null
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SUBMIT_SUCCESS:
      return state
        .set('success', true)

    case constants.SUBMIT_ERROR:
      return state
        .set('error', action.error)

    default:
      return state 
  }
}

export default reducer