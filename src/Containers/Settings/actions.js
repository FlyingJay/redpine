import constants from './constants'
import appActions from 'Containers/App/actions'

import { errorMessage } from 'Components/errors'

const actions = {
  updateUser: (user) => {
    return (dispatch, getState, api) => {
      api.me.create(user).then((user) => {
        dispatch(appActions.setUser(user))
        dispatch(appActions.success_message(constants.UPDATE_USER_SUCCESS))
      }).catch((err) => {
        dispatch(errorMessage(err))
        dispatch(appActions.error_message(constants.UPDATE_USER_ERROR))
      })
    }
  },

  requestPayment: () => {
    return (dispatch, getState, api) => {
      api.paymentRequests.create().then((user) => {
        dispatch(appActions.setUser(user))
        dispatch(appActions.success_message(constants.PAYMENT_REQUEST_SUCCESS))
      }).catch((err) => {
        dispatch(errorMessage(err))
        dispatch(appActions.error_message(constants.PAYMENT_REQUEST_ERROR))
      })
    }
  },

  getRewards: () => {
    return (dispatch, getState, api) => {
      dispatch(actions.rewardsLoading())
      if(api.user){
        api.rewards.query({
          recipient: api.user,
          is_completed: false
        }).then((res) => {
          dispatch(actions.pendingRewardsLoaded(res.results))
        })
        api.rewards.query({
          recipient: api.user,
          is_completed: true
        }).then((res) => {
          dispatch(actions.earnedRewardsLoaded(res.results))
        })
      }
    }
  },

  rewardsLoading: () => {
    return {
      type: constants.REWARDS_LOADING
    }
  },

  pendingRewardsLoaded: (rewards) => {
    return {
      type: constants.PENDING_REWARDS_LOADED,
      rewards
    }
  },

  earnedRewardsLoaded: (rewards) => {
    return {
      type: constants.EARNED_REWARDS_LOADED,
      rewards
    }
  }
}

export default actions