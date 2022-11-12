import { fromJS } from 'immutable'
import consts from './constants'

export const initialState = fromJS({
  organization: null,
  campaigns: null
})

export const reducer = function (state = initialState, action) {
  switch (action.type) {
    case consts.ORGANIZATION_LOADED:
      return state
        .set('organization', action.organization)

    case consts.CAMPAIGNS_LOADED:
      return state
        .set('campaigns', action.campaigns)

    default:
      return state
  }
}

export default reducer