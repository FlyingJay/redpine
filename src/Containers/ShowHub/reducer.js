import {fromJS} from 'immutable'
import constants from './constants'
import moment from 'moment'

export const initialState = fromJS({
  campaign: null,
  campaign_loading: false,
  search_acts: null,
  search_acts_loading: false,
  hints: [],
  pledges: [],
  pledges_loading: true,
  user_acts: [],
  user_acts_loading: false,
  verify_acts: [],
  verify_acts_loading: false
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {

    case constants.CAMPAIGN_LOADING:
      return state
        .set('campaign', null)
        .set('campaign_loading', true)

    case constants.CAMPAIGN_LOADED:
      return state
        .set('campaign', action.campaign)
        .set('campaign_loading', false)

    case constants.PLEDGES_LOADING:
      return state
        .set('pledges', [])
        .set('pledges_loading', true)

    case constants.PLEDGES_LOADED:
      return state
        .set('pledges', action.pledges)
        .set('pledges_loading', false)

    case constants.SEARCH_ACTS_START:
      return state
        .set('search_acts', [])
        .set('search_acts_loading', true)

    case constants.SEARCH_ACTS_LOADED:
      return state
        .set('search_acts', action.acts)
        .set('search_acts_loading', false)

    case constants.HINTS_LOADED:
      return state
        .set('hints', action.hints)

    case constants.USER_ACTS_LOADING:
      return state
        .set('user_acts_loading', true)

    case constants.USER_ACTS_LOADED:
      return state
        .set('user_acts', action.acts)
        .set('user_acts_loading', false)

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

    default:
      return state
  }
}

export default reducer