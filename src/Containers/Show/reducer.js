import { fromJS } from 'immutable'

import consts from './constants'

export const initialState = fromJS({
  campaign: null,
  purchase_options: null,
  pledges: null,
  pledgeError: null,
  pledgeLock: false,
  user_acts: [],
  user_acts_loading: false,
  promoter: null
})

export const reducer = function (state = initialState, action) {
  switch (action.type) {

    case consts.CAMPAIGN_LOADING:
      return state
        .set('campaign_loading', true)

    case consts.CAMPAIGN_LOADED:
      var purchaseOptions = action.campaign.purchase_options.sort(function(a,b) {return (parseFloat(a.price) > parseFloat(b.price)) ? 1 : ((parseFloat(b.price) > parseFloat(a.price)) ? -1 : 0);} )
      return state
        .set('campaign', action.campaign)
        .set('purchase_options', purchaseOptions)
        .set('campaign_loading', false)

    case consts.PLEDGES_LOADED:
      return state
        .set('pledges', action.pledges)

    case consts.PLEDGE_LOCK:
      return state
        .set('pledgeLock', action.lock)

    case consts.PLEDGE_TOKEN_ERROR:
      return state
        .set('pledgeError', action.error.message)
        
    case consts.USER_ACTS_LOADING:
      return state
        .set('user_acts_loading', true)
        
    case consts.USER_ACTS_LOADED:
      return state
        .set('user_acts', action.acts)
        .set('user_acts_loading', false)

    case consts.SET_PROMOTER:
      return state
        .set('promoter', action.user)

    default:
      return state
  }
}

export default reducer