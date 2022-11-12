import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectCampaigns: (state, props) => {
    return c(state, props).get('campaigns')
  },
  selectOrganization: (state, props) => {
    return c(state, props).get('organization')
  },
  selectOpenings: (state, props) => {
    return c(state, props).get('openings')
  },
  selectVenues: (state, props) => {
    return c(state, props).get('venues')
  },
  selectVenuesLoading: (state, props) => {
    return c(state, props).get('venues_loading')
  },
  selectSearchVenues: (state, props) => {
    return c(state, props).get('search_venues')
  },
  selectSearchVenuesLoading: (state, props) => {
    return c(state, props).get('search_venues_loading')
  }
}

export default selectors