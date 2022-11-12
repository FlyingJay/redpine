import constants from './constants'


const c = (state) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectCampaignResultsLoading: (state) => {
    return c(state).get('campaignResults_loading')
  },
  selectOpenShowResultsLoading: (state) => {
    return c(state).get('open_showResults_loading')
  },
  selectCampaignResults: (state) => {
    return c(state).get('campaignResults')
  },
  selectOpenShowResults: (state) => {
    return c(state).get('open_showResults')
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