import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}
	
const selectors = {
  selectPledges: (state, props) => {
    return c(state, props).get('pledges')
  },
  selectStatsLoading: (state, props) => {
    return c(state, props).get('stats_loading')
  },
  selectError: (state, props) => {
    return c(state, props).get('error')
  },
}
	
export default selectors