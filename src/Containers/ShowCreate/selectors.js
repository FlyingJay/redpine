import constants from './constants'

const c = (state) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectVenue: (state, props) => {
    return c(state, props).get('venue')
  },
  selectOpening: (state, props) => {
    return c(state, props).get('opening')
  },
  selectActsLoading: (state, props) => {
    return c(state, props).get('acts_loading')
  },
  selectActs: (state, props) => {
    return c(state, props).get('acts')
  },
  selectVenueEvents: (state, props) => {
    return c(state, props).get('venue_events')
  },
  selectVenueShows: (state, props) => {
    return c(state, props).get('venue_shows')
  },
  selectAvailableActs: (state, props) => {
    return c(state, props).get('available_acts')
  },
  selectSearchActs: (state, props) => {
    return c(state, props).get('search_acts')
  },
  selectSearchActsLoading: (state, props) => {
    return c(state, props).get('search_acts_loading')
  },
  selectSearchVenues: (state, props) => {
    return c(state, props).get('search_venues')
  },
  selectSearchVenuesLoading: (state, props) => {
    return c(state, props).get('search_venues_loading')
  }
}

export default selectors