import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectVenuesLoading: (state, props) => {
    return c(state, props).get('venues_loading')
  },
  selectPendingCampaignsLoading: (state, props) => {
    return c(state, props).get('pendingCampaigns_loading')
  },
  selectActiveCampaignsLoading: (state, props) => {
    return c(state, props).get('activeCampaigns_loading')
  },
  selectVenues: (state, props) => {
    return c(state, props).get('venues')
  },
  selectPendingCampaigns: (state, props) => {
    return c(state, props).get('pendingCampaigns')
  },
  selectActiveCampaigns: (state, props) => {
    return c(state, props).get('activeCampaigns')
  }
}

export default selectors