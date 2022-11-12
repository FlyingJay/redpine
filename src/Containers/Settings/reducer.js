import {fromJS} from 'immutable'
import constants from './constants'

export const initialState = fromJS({
  pending_rewards: 0.00,
  earned_rewards: 0.00,
  pending_rewards_loading: false,
  earned_rewards_loading: false
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.REWARDS_LOADING:
      return state
        .set('pending_rewards_loading', true)    
        .set('earned_rewards_loading', true) 

    case constants.PENDING_REWARDS_LOADED:
      let pending_rewards = 0.00
      {(action.rewards || []).forEach((reward) => { pending_rewards += reward.amount; })};
      return state
        .set('pending_rewards_loading', false)
        .set('pending_rewards', pending_rewards)

    case constants.EARNED_REWARDS_LOADED:
      let earned_rewards = 0.00
      {(action.rewards || []).forEach((reward) => { earned_rewards += reward.amount; })};
      return state    
        .set('earned_rewards_loading', false)    
        .set('earned_rewards', earned_rewards)

    default:
      return state
  }
}

export default reducer