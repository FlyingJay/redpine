import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectOrganization: (state, props) => {
    return c(state, props).get('organization')
  },
  selectCampaigns: (state, props) => {
    return c(state, props).get('campaigns')
  },
  selectStatsLoading: (state, props) => {
    return c(state, props).get('stats_loading')
  }
}

export default selectors