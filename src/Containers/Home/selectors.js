import constants from './constants'


const c = (state) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectOpeningsLoading: (state) => {
    return c(state).get('openings_loading')
  },
  selectFeaturedBandsLoading: (state) => {
    return c(state).get('featuredBands_loading')
  },
  selectFeaturedVenuesLoading: (state) => {
    return c(state).get('featuredVenues_loading')
  },
  selectFeaturedCampaignsLoading: (state) => {
    return c(state).get('featuredCampaigns_loading')
  },
  selectPreviouslySuccessfulLoading: (state) => {
    return c(state).get('previouslySuccessful_loading')
  },
  selectOpenings: (state) => {
    return c(state).get('openings')
  },
  selectFeaturedBands: (state) => {
    return c(state).get('featuredBands')
  },
  selectVenue: (state) => {
    return c(state).get('venue')
  },
  selectCampaign: (state) => {
    return c(state).get('campaign')
  },
  selectFeaturedVenues: (state) => {
    return c(state).get('featuredVenues')
  },
  selectFeaturedCampaigns: (state) => {
    return c(state).get('featuredCampaigns')
  },
  selectPreviouslySuccessful: (state) => {
    return c(state).get('previouslySuccessful')
  },
  selectPage: (state) => {
    return c(state).get('page')
  },
  selectResultsCount: (state) => {
    return c(state).get('results_count')
  }
}

export default selectors