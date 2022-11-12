import {fromJS} from 'immutable'
import constants from './constants'

export const initialState = fromJS({
  venues_loading: false,
  pendingCampaigns_loading: false,
  activeCampaigns_loading: false,
  venues_loading: true, //Starting true prevents redirect to VenueCreate on first render.
  venues: null,
  campaigns: null,
  error: null
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOAD_DATA_START:
      return state
        .set('venues_loading', true)
        .set('pendingCampaigns_loading', true)
        .set('activeCampaigns_loading', true)

    case constants.VENUES_LOADED:
      return state
        .set('venues', action.venues)
        .set('venues_loading', false)

    case constants.PENDING_CAMPAIGNS_LOADED:
      return state
        .set('pendingCampaigns', action.campaigns)
        .set('pendingCampaigns_loading', false)

    case constants.ACTIVE_CAMPAIGNS_LOADED:
      return state
        .set('activeCampaigns', action.campaigns)
        .set('activeCampaigns_loading', false)

    case constants.VENUE_ERROR:
      return state
        .set('error', action.error)
        
    default:
      return state
  }
}

export default reducer