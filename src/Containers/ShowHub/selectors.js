import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}
	
const selectors = {
  selectCampaign: (state, props) => {
    return c(state, props).get('campaign')
  },
  selectCampaignLoading: (state, props) => {
    return c(state, props).get('campaign_loading')
  },
  selectSearchActs: (state, props) => {
    return c(state, props).get('search_acts')
  },
  selectSearchActsLoading: (state, props) => {
    return c(state, props).get('search_acts_loading')
  },
  selectHints: (state, props) => {
    return c(state, props).get('hints')
  },
  selectPledges: (state, props) => {
    return c(state, props).get('pledges')
  },
  selectPledgesLoading: (state, props) => {
    return c(state, props).get('pledges_loading')
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
  }
}
	
export default selectors