import {fromJS} from 'immutable'
import constants from './constants'

export const initialState = fromJS({
  pledges: null,
  error: null,
  stats_loading: false
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case constants.LOAD_STATS_START:
      return state
        .set('stats_loading', true)

    case constants.PLEDGES_LOADED:
      return state
        .set('pledges', action.pledges)
        .set('stats_loading', false)

    case constants.STATS_ERROR:
      return state
        .set('error', action.error) 

    default:
      return state
  }
}

export default reducer