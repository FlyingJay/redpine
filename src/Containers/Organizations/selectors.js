import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectOrganizations: (state, props) => {
    return c(state, props).get('organizations')
  },
  selectOrganizationsLoading: (state, props) => {
    return c(state, props).get('organizations_loading')
  },
  selectActiveCampaigns: (state, props) => {
    return c(state, props).get('activeCampaigns')
  },
  selectActiveCampaignsLoading: (state, props) => {
    return c(state, props).get('activeCampaigns_loading')
  },
  selectSearchActs: (state, props) => {
    return c(state, props).get('search_acts')
  },
  selectSearchActsLoading: (state, props) => {
    return c(state, props).get('search_acts_loading')
  },
  selectUserActs: (state, props) => {
    return c(state, props).get('user_acts')
  },
  selectUserActsLoading: (state, props) => {
    return c(state, props).get('user_acts_loading')
  },
  selectVerifyActs: (state, props) => {
    return c(state, props).get('verify_acts')
  },
  selectVerifyActsLoading: (state, props) => {
    return c(state, props).get('verify_acts_loading')
  },
  selectError: (state, props) => {
    return c(state, props).get('error')
  }
}

export default selectors