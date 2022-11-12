import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}
	
const selectors = {
  selectCampaignsLoading: (state, props) => {
    return c(state, props).get('campaigns_loading')
  },
  selectCampaigns: (state, props) => {
    return c(state, props).get('campaigns')
  },
  selectError: (state, props) => {
    return c(state, props).get('error')
  }
}
	
export default selectors