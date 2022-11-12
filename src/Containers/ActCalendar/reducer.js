import { fromJS } from 'immutable'

import constants from './constants'


export const initialState = fromJS({
  campaigns: [],
  act: null,
  error: null
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.CAMPAIGNS_LOADED:
      return state
        .set('campaigns', action.campaigns)

    case constants.ACT_LOADED:
      return state
        .set('act', action.act)

    default:
      return state
  }
}

export default reducer