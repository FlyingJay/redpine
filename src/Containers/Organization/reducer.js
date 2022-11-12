import { fromJS } from 'immutable'
import consts from './constants'

export const initialState = fromJS({
  organization: null,
  acts: null,
  campaigns: null
})

export const reducer = function (state = initialState, action) {
  switch (action.type) {

    case consts.ORGANIZATION_LOADED:
      return state
        .set('organization', action.organization)

    case consts.BANDS_LOADED:
      return state
        .set('acts', action.bands)

    case consts.CAMPAIGNS_LOADED:
      return state
        .set('campaigns', action.campaigns)

    default:
      return state
  }
}

export default reducer