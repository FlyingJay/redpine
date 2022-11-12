import { fromJS } from 'immutable'
import { helpers } from 'globals'
import constants from './constants'

export const initialState = fromJS({
  campaignResults_loading: false,
  bandResults_loading: false,
  venueResults_loading: false,
  opportunityResults_loading: false,
  open_showResults_loading: false,
  open_micResults_loading: false,
  user_acts_loading: false,
  
  bandResults: [],
  campaignResults: [],
  venueResults: [],
  opportunityResults: [],
  open_showResults: [],
  open_micResults: [],

  user_acts: [],
  page: 1,
  error: null
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.CONCERT_RESULTS_LOADING:
      return state
        .set('campaignResults_loading', true)

    case constants.ARTIST_RESULTS_LOADING:
      return state
        .set('bandResults_loading', true)

    case constants.VENUE_RESULTS_LOADING:
      return state
        .set('venueResults_loading', true)

    case constants.OPPORTUNITY_RESULTS_LOADING:
      return state
        .set('opportunityResults_loading', true)
        
    case constants.OPEN_SHOW_RESULTS_LOADING:
      return state
        .set('open_showResults_loading', true)
        
    case constants.OPEN_MIC_RESULTS_LOADING:
      return state
        .set('open_micResults_loading', true)
        
    case constants.USER_ACTS_LOADING:
      return state
        .set('user_acts_loading', true)

    case constants.BAND_RESULTS_LOADED:
      const bandResults = action.page > 1 ? state.get('bandResults').concat(action.bands) : action.bands
      return state
        .set('bandResults', bandResults)
        .set('bandResults_loading', false)
        .set('page', action.page)
        .set('results_count', action.results_count)

    case constants.CAMPAIGN_RESULTS_LOADED:
      const campaignResults = action.page > 1 ? state.get('campaignResults').concat(action.campaigns) : action.campaigns
      return state
        .set('campaignResults', campaignResults)
        .set('campaignResults_loading', false)
        .set('page', action.page)
        .set('results_count', action.results_count)

    case constants.VENUE_RESULTS_LOADED:
      const venueResults = action.page > 1 ? state.get('venueResults').concat(action.venues) : action.venues
      return state
        .set('venueResults', venueResults)
        .set('venueResults_loading', false)
        .set('page', action.page)
        .set('results_count', action.results_count)

    case constants.OPPORTUNITY_RESULTS_LOADED:
      const opportunityResults = action.page > 1 ? state.get('opportunityResults').concat(action.opportunities) : action.opportunities
      return state
        .set('opportunityResults', opportunityResults)
        .set('opportunityResults_loading', false)
        .set('page', action.page)
        .set('results_count', action.results_count)

    case constants.OPEN_SHOW_RESULTS_LOADED:
      const open_showResults = action.page > 1 ? state.get('open_showResults').concat(action.campaigns) : action.campaigns
      return state
        .set('open_showResults', open_showResults)
        .set('open_showResults_loading', false)
        .set('page', action.page)
        .set('results_count', action.results_count)

    case constants.OPEN_MIC_RESULTS_LOADED:
      const open_micResults = action.page > 1 ? state.get('open_micResults').concat(action.campaigns) : action.campaigns
      return state
        .set('open_micResults', open_micResults)
        .set('open_micResults_loading', false)
        .set('page', action.page)
        .set('results_count', action.results_count)

    case constants.USER_ACTS_LOADED:
      return state
        .set('user_acts', action.acts)
        .set('user_acts_loading', false)

    case constants.SEARCH_ERROR:
      return state
        .set('error', action.error)
        
    default:
      return state
  }
}

export default reducer