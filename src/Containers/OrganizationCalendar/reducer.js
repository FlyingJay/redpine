import { fromJS } from 'immutable'
import constants from './constants'

export const initialState = fromJS({
  campaigns: [],
  organization: null,
  venues: [],
  openings: [],
  venues_loading: false,
  search_venues: [],
  search_venues_loading: false,
  error: null
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.CAMPAIGNS_LOADED:
      const campaigns = (action.campaigns || []).filter(campaign => campaign.is_venue_approved !== false)
      return state
        .set('campaigns', campaigns)

    case constants.ORGANIZATION_LOADED:
      return state
        .set('organization', action.organization)

    case constants.OPENINGS_LOADED:
      return state
        .set('openings', action.openings)

    case constants.VENUES_LOADING:
      return state
        .set('venues_loading', true)

    case constants.VENUES_LOADED:
      return state
        .set('venues', action.venues)
        .set('venues_loading', false)

    case constants.SEARCH_VENUES_LOADING:
      return state
        .set('search_venues_loading', true)

    case constants.SEARCH_VENUES_LOADED:
      return state
        .set('search_venues', action.venues)
        .set('search_venues_loading', false)

    default:
      return state
  }
}

export default reducer