import { fromJS } from 'immutable'
import { helpers } from 'globals'
import constants from './constants'

export const initialState = fromJS({
  campaignResults_loading: false,
  open_showResults_loading: false,
  campaignResults: [],
  open_showResults: [],
  page: 1,
  error: null
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.CONCERT_RESULTS_LOADING:
      return state
        .set('campaignResults_loading', true)
        
    case constants.OPEN_SHOW_RESULTS_LOADING:
      return state
        .set('open_showResults_loading', true)

    case constants.CAMPAIGN_RESULTS_LOADED:
      return state
        .set('campaignResults', action.campaigns)
        .set('campaignResults_loading', false)
        .set('page', action.page)
        .set('results_count', action.results_count)

    case constants.OPEN_SHOW_RESULTS_LOADED:
      return state
        .set('open_showResults', action.campaigns)
        .set('open_showResults_loading', false)
        .set('page', action.page)
        .set('results_count', action.results_count)

    case constants.SEARCH_ERROR:
      return state
        .set('error', action.error)
        
    default:
      return state
  }
}

export default reducer