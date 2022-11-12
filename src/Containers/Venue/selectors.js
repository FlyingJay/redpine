import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectVenue: (state, props) => {
    return c(state, props).get('venue')
  },
  selectBands: (state, props) => {
    return c(state, props).get('bands')
  },
  selectCampaigns: (state, props) => {
    return c(state, props).get('campaigns')
  },
  selectOpenings: (state, props) => {
    return c(state, props).get('openings')
  },
  selectEvents: (state, props) => {
    return c(state, props).get('events')
  },
  selectBookedShows: (state, props) => {
    return c(state, props).get('bookedShows')
  },
  selectDatesLoading: (state, props) => {
    return c(state, props).get('dates_loading')
  }
}

export default selectors
