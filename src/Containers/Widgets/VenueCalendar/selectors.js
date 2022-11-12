import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectVenue: (state, props) => {
    return c(state, props).get('venue')
  },
  selectOpenings: (state, props) => {
    return c(state, props).get('openings')
  },
  selectEvents: (state, props) => {
    return c(state, props).get('events')
  },
  selectBookedShows: (state, props) => {
    return c(state, props).get('shows')
  },
  selectDatesLoading: (state, props) => {
    return c(state, props).get('dates_loading')
  }
}

export default selectors
