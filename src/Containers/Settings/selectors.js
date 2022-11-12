import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}
	
const selectors = {
  selectPendingRewardsLoading: (state, props) => {
    return c(state, props).get('pending_rewards_loading')
  },
  selectPendingRewards: (state, props) => {
    return c(state, props).get('pending_rewards')
  },
  selectEarnedRewardsLoading: (state, props) => {
    return c(state, props).get('earned_rewards')
  },
  selectEarnedRewards: (state, props) => {
    return c(state, props).get('earned_rewards_loading')
  }
}
	
export default selectors