import { fromJS } from 'immutable'
import consts from './constants'

export const initialState = fromJS({
  band: null,
  campaigns: null
})

export const reducer = function (state = initialState, action) {
  switch (action.type) {
    case consts.ACT_LOADED:
      return state
        .set('band', action.act)

    case consts.CAMPAIGNS_LOADED:
      return state
        .set('campaigns', action.campaigns)

    default:
      return state
  }
}

export default reducer