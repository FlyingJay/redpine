import { fromJS } from 'immutable'
import consts from './constants'

export const initialState = fromJS({
  venue: null,
  campaigns: null
})

export const reducer = function (state = initialState, action) {
  switch (action.type) {
    case consts.VENUE_LOADED:
      return state
        .set('venue', action.venue)

    case consts.CAMPAIGNS_LOADED:
      return state
        .set('campaigns', action.campaigns)

    default:
      return state
  }
}

export default reducer