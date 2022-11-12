import { fromJS } from 'immutable'

import constants from './constants'


export const initialState = fromJS({
  error: null
})

export function reducer(state = initialState, action) {
  switch (action.type) {
    case constants.REGISTRATION_FAILURE:
      return state.set('error', action.error)
    
    default:
      return state
  }
}

export default reducer