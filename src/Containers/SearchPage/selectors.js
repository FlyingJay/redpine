import constants from './constants'


const c = (state) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectCampaignResultsLoading: (state) => {
    return c(state).get('campaignResults_loading')
  },
  selectBandResultsLoading: (state) => {
    return c(state).get('bandResults_loading')
  },
  selectVenueResultsLoading: (state) => {
    return c(state).get('venueResults_loading')
  },
  selectOpportunityResultsLoading: (state) => {
    return c(state).get('opportunityResults_loading')
  },
  selectOpenShowResultsLoading: (state) => {
    return c(state).get('open_showResults_loading')
  },
  selectOpenMicResultsLoading: (state) => {
    return c(state).get('open_micResults_loading')
  },
  selectUserActsLoading: (state) => {
    return c(state).get('user_acts_loading')
  },
  selectBandResults: (state) => {
    return c(state).get('bandResults')
  },
  selectCampaignResults: (state) => {
    return c(state).get('campaignResults')
  },
  selectVenueResults: (state) => {
    return c(state).get('venueResults')
  },
  selectOpportunityResults: (state) => {
    return c(state).get('opportunityResults')
  },
  selectOpenShowResults: (state) => {
    return c(state).get('open_showResults')
  },
  selectOpenMicResults: (state) => {
    return c(state).get('open_micResults')
  },
  selectUserActs: (state) => {
    return c(state).get('user_acts')
  },
  selectPage: (state) => {
    return c(state).get('page')
  },
  selectResultsCount: (state) => {
    return c(state).get('results_count')
  },
  selectError: (state) => {
    return c(state).get('error')
  }
}

export default selectors