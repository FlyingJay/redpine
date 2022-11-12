import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectCampaigns: (state, props) => {
    return c(state, props).get('campaigns')
  },
  selectOpenings: (state, props) => {
    return c(state, props).get('openings')
  },
  selectEvents: (state, props) => {
    return c(state, props).get('events')
  },
  selectVenue: (state, props) => {
    return c(state, props).get('venue')
  },
  selectDatesLoading: (state, props) => {
    return c(state, props).get('dates_loading')
  },
  selectError: (state, props) => {
    return c(state, props).get('error')
  }
}

export default selectors