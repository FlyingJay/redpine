import constants from './constants'

// context for the reducer
const c = (state) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectPledgesLoading: (state) => {
    return c(state).get('pledges_loading')
  },
  selectCampaignsLoading: (state) => {
    return c(state).get('campaigns_loading')
  },
  selectPledges: (state) => {
    return c(state).get('pledges')
  },
  selectCampaigns: (state) => {
    return c(state).get('campaigns')
  },
}

export default selectors