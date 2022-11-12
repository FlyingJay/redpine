import { fromJS } from 'immutable'

import constants from './constants'


export const initialState = fromJS({
  tickets: null
})

export function reducer(state = initialState, action) {
  switch (action.type) {
    case constants.LOAD_TICKETS_SUCCESS:
      return state
        .set('tickets', action.tickets)
      
    default:
      return state
  }
}

export default reducer