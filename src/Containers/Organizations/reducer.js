import {fromJS} from 'immutable'
import constants from './constants'

export const initialState = fromJS({
  organizations_loading: false,
  activeCampaigns_loading: false,
  organizations: [],
  campaigns: [],
  search_acts: [],
  search_acts_loading: false,
  user_acts: [],
  user_acts_loading: false,
  verify_acts: [],
  verify_acts_loading: false,
  error: null
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOAD_DATA_START:
      return state
        .set('organizations_loading', true)
        .set('activeCampaigns_loading', true)

    case constants.ORGANIZATIONS_LOADED:
      return state
        .set('organizations', action.organizations)
        .set('organizations_loading', false)

    case constants.ACTIVE_CAMPAIGNS_LOADED:
      return state
        .set('activeCampaigns', action.campaigns)
        .set('activeCampaigns_loading', false)

    case constants.USER_ACTS_LOADING:
      return state
        .set('user_acts_loading', true)

    case constants.USER_ACTS_LOADED:
      return state
        .set('user_acts', action.acts)
        .set('user_acts_loading', false)

    case constants.SEARCH_ACTS_START:
      return state
        .set('search_acts', [])
        .set('search_acts_loading', true)

    case constants.SEARCH_ACTS_LOADED:
      return state
        .set('search_acts', action.acts)
        .set('search_acts_loading', false)

    case constants.VERIFY_ACTS_LOADING:
      return state
        .set('verify_acts', [])
        .set('verify_acts_loading', true)

    case constants.VERIFY_ACTS_LOADED:
      return state
        .set('verify_acts', action.acts)
        .set('verify_acts_loading', false)

    case constants.CAMPAIGN_BANDS_ADDED:
      return state
        .set('verify_acts', [])

    case constants.ORGANIZATION_ERROR:
    	return state
    		.set('error', action.error)
        
    default:
      return state
  }
}

export default reducer