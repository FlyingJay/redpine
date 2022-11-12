import { fromJS } from 'immutable'
import consts from './constants'

export const initialState = fromJS({
  venue: null,
  campaigns: null,
  stats_loading: false
})

export const reducer = function (state = initialState, action) {
  switch (action.type) {

    case consts.LOAD_STATS_START:
      return state
        .set('stats_loading', true)

    case consts.VENUE_LOADED:
      return state
        .set('venue', action.venue)

    case consts.CAMPAIGNS_LOADED:
      return state
        .set('campaigns', action.campaigns)
        .set('stats_loading', false)

    default:
      return state
  }
}

export default reducer