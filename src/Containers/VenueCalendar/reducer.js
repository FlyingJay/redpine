import { fromJS } from 'immutable'

import constants from './constants'


export const initialState = fromJS({
  campaigns: [],
  openings: [],
  events: [],
  venue: null,
  dates_loading: false,
  error: null
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.DATES_LOADING:
      return state
        .set('dates_loading', true)

    case constants.CAMPAIGNS_LOADED:
      const campaigns = (action.campaigns || []).filter(campaign => campaign.is_venue_approved !== false)
      return state
        .set('campaigns', campaigns)
        .set('dates_loading', false)

    case constants.OPENINGS_LOADED:
      return state
        .set('openings', action.openings)

    case constants.VENUE_LOADED:
      const events = action.venue && action.venue.events || []
      return state
        .set('venue', action.venue)
        .set('events', events)

    default:
      return state
  }
}

export default reducer